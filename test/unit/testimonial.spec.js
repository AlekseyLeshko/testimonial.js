'use strict';

describe('Testimonial', function() {

  beforeEach(function() {
  });

  it('should indexing return 2', function() {
    Testimonial.prototype.$slides = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 1;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(2);
  });

  it('should indexing return 0', function() {
    Testimonial.prototype.$slides = [];

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should indexing zeroed currentSlideIndex', function() {
    Testimonial.prototype.$slides = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 2;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should getDefaultOptions', function() {
    var options = Testimonial.prototype.getDefaultOptions();

    expect(options.timeout).toEqual(7000);
    expect(options.autostart).toBeTruthy();
  });

  it('should resizePluginContainer', function() {
    var indents = 20;
    var height = 100;
    var expected = height + indents;
    var obj = $('<div />', {
      height: height
    });
    Testimonial.prototype.$container = $('<div />');
    Testimonial.prototype.$slides = [obj, $('<div />')];
    Testimonial.prototype.currentSlideIndex = 0;

    Testimonial.prototype.resizePluginContainer();

    expect(Testimonial.prototype.$container.height()).toEqual(expected);
  });

  it('should createButtonNext', function() {
    spyOn(Testimonial.prototype, 'next');
    Testimonial.prototype.$container = $('<div />');

    Testimonial.prototype.createButtonNext();
    var $obj = Testimonial.prototype.$container.find('div').first();

    $obj.click();
    expect($obj.prop('tagName')).toEqual('DIV');
    expect($obj.attr('class')).toEqual('next_slide');
    expect(Testimonial.prototype.next).toHaveBeenCalled();
  });

  it('should createInfrastructure', function() {
    spyOn(Testimonial.prototype, 'createButtonNext');
    Testimonial.prototype.$container = $('<div />');

    Testimonial.prototype.createInfrastructure();
    var $obj = Testimonial.prototype.$container.find('div').first();

    expect($obj.prop('tagName')).toEqual('DIV');
    expect($obj.attr('class')).toEqual('main_container');
    expect(Testimonial.prototype.createButtonNext).toHaveBeenCalled();
  });

  it('should createSlides', function() {
    Testimonial.prototype.$slides.length = 0;
    var arr = [{}, {}, {}];
    Testimonial.prototype.dataArr = arr;

    Testimonial.prototype.createSlides();

    expect(Testimonial.prototype.$slides.length).toEqual(arr.length);
  });

  it('should parseDomTree', function() {
    var arr = [1, 2, 3];
    spyOn(Parser.prototype, 'parse').and.returnValue(arr);
    var fileName = 'main.html';
    jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
    loadFixtures(fileName);

    var $container = $('testimonial_slider');
    var length = $container.children().length;
    Testimonial.prototype.$container = $container;
    Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(Testimonial.prototype.dataArr).toEqual(arr);
    expect(Parser.prototype.parse).toHaveBeenCalled();
  });

  it('should initPlugin', function() {
    spyOn(Testimonial.prototype, 'createOptions');
    spyOn(Testimonial.prototype, 'parseDomTree');
    spyOn(Testimonial.prototype, 'createSlides');
    spyOn(Testimonial.prototype, 'createInfrastructure');
    spyOn(Testimonial.prototype, 'slideRendering');
    spyOn(Testimonial.prototype, 'resizePluginContainer');
    spyOn(Testimonial.prototype, 'start');
    Testimonial.prototype.pluginOptions = {
      autostart: true
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.initPlugin(options);

    expect(Testimonial.prototype.createOptions).toHaveBeenCalledWith(options);
    expect(Testimonial.prototype.parseDomTree).toHaveBeenCalled();
    expect(Testimonial.prototype.createSlides).toHaveBeenCalled();
    expect(Testimonial.prototype.createInfrastructure).toHaveBeenCalled();
    expect(Testimonial.prototype.slideRendering).toHaveBeenCalled();
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
    expect(Testimonial.prototype.start).toHaveBeenCalled();
  });

  it('should initPlugin', function() {
    spyOn(Testimonial.prototype, 'createOptions');
    spyOn(Testimonial.prototype, 'parseDomTree');
    spyOn(Testimonial.prototype, 'createSlides');
    spyOn(Testimonial.prototype, 'createInfrastructure');
    spyOn(Testimonial.prototype, 'slideRendering');
    spyOn(Testimonial.prototype, 'resizePluginContainer');
    Testimonial.prototype.pluginOptions = {
      autostart: false
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.initPlugin(options);

    expect(Testimonial.prototype.createOptions).toHaveBeenCalledWith(options);
    expect(Testimonial.prototype.parseDomTree).toHaveBeenCalled();
    expect(Testimonial.prototype.createSlides).toHaveBeenCalled();
    expect(Testimonial.prototype.createInfrastructure).toHaveBeenCalled();
    expect(Testimonial.prototype.slideRendering).toHaveBeenCalled();
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
  });

  it('should start', function(done) {
    spyOn(Testimonial.prototype, 'next');
    var timeout = 100;
    Testimonial.prototype.pluginOptions = {
      timeout: timeout
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.start();

    var delay = timeout + 10;
    setTimeout(function() {
      expect(Testimonial.prototype.next).toHaveBeenCalled();
      expect(Testimonial.prototype.timerId).toBeDefined();
      done();
    }, delay);
  });

  it('should stop', function() {
    Testimonial.prototype.timerId = 10;

    Testimonial.prototype.stop();

    expect(Testimonial.prototype.timerId).toBeUndefined();
  });
});
