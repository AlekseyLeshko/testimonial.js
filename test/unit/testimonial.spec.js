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
    Testimonial.prototype.dataArr = [];
    var arr = [1, 2, 3];
    spyOn(Parser.prototype, 'parse').and.returnValue(arr);
    var fileName = 'main.html';
    jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
    loadFixtures(fileName);

    var $container = $('.testimonial_slider');
    Testimonial.prototype.$container = $container;
    Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(Testimonial.prototype.dataArr).toEqual(arr);
    expect(Parser.prototype.parse).toHaveBeenCalled();
  });

  it('should parse empty div', function() {
    Testimonial.prototype.dataArr = [];

    var $container = $('<div />');
    Testimonial.prototype.$container = $container;
    Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(Testimonial.prototype.dataArr.length).toEqual(0);
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

  it('should create new Testimonial', function() {
    spyOn(Testimonial.prototype, 'initPlugin');
    var $container = $('<div />');
    var options = {};

    var testimonial = new Testimonial($container, options);

    expect(testimonial.$container).toEqual($container);
    expect(testimonial.initPlugin).toHaveBeenCalled();
    expect(testimonial.pluginOptions).toEqual({});
    expect(testimonial.$slides.length).toEqual(0);
    expect(testimonial.currentSlideIndex).toEqual(0);
  });

  it('should slideRendering', function() {
    var slide1 = new TestimonialSlide();
    var slide2 = new TestimonialSlide();
    Testimonial.prototype.$slides = [
      slide1,
      slide2,
    ];
    var node = $('<div />');
    spyOn(slide2, 'hideSlide');
    spyOn(slide1, 'getDomNode').and.returnValue($('<div />'));
    spyOn(slide2, 'getDomNode').and.returnValue($('<div />'));

    Testimonial.prototype.slideRendering();

    expect(slide2.hideSlide).toHaveBeenCalled();
    expect(slide1.getDomNode).toHaveBeenCalled();
    expect(slide2.getDomNode).toHaveBeenCalled();
    expect(Testimonial.prototype.$slidesWrapper.find('div').length).toEqual(2);
  });

  it('should createOptions', function() {
    spyOn(Testimonial.prototype, 'getDefaultOptions').and.callThrough();
    var timeout = 5;
    var options = {
      timeout: timeout
    };

    Testimonial.prototype.createOptions(options);

    expect(Testimonial.prototype.pluginOptions.timeout).toEqual(timeout);
    expect(Testimonial.prototype.getDefaultOptions).toHaveBeenCalled();
  });

  it('should next', function() {
    Testimonial.prototype.timerId = 100;
    Testimonial.prototype.currentSlideIndex = 0;
    var slide1 = new TestimonialSlide();
    var slide2 = new TestimonialSlide();
    Testimonial.prototype.$slides = [
      slide1,
      slide2
    ];
    spyOn(slide1, 'animateHide');
    spyOn(slide2, 'animateShow');

    spyOn(Testimonial.prototype, 'stop');
    spyOn(Testimonial.prototype, 'indexing').and.callThrough();
    spyOn(Testimonial.prototype, 'resizePluginContainer');
    spyOn(Testimonial.prototype, 'start');

    Testimonial.prototype.next();

    expect(Testimonial.prototype.stop).toHaveBeenCalled();
    expect(Testimonial.prototype.indexing).toHaveBeenCalled();
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
    expect(Testimonial.prototype.start).toHaveBeenCalled();
    expect(slide1.animateHide).toHaveBeenCalled();
    expect(slide2.animateShow).toHaveBeenCalled();
  });

  it('should next without stop', function() {
    Testimonial.prototype.timerId = undefined;
    Testimonial.prototype.currentSlideIndex = 0;
    var slide1 = new TestimonialSlide();
    var slide2 = new TestimonialSlide();
    Testimonial.prototype.$slides = [
      slide1,
      slide2
    ];
    spyOn(slide1, 'animateHide');
    spyOn(slide2, 'animateShow');

    spyOn(Testimonial.prototype, 'indexing').and.callThrough();
    spyOn(Testimonial.prototype, 'resizePluginContainer');
    spyOn(Testimonial.prototype, 'start');

    Testimonial.prototype.next();

    expect(Testimonial.prototype.indexing).toHaveBeenCalled();
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
    expect(Testimonial.prototype.start).toHaveBeenCalled();
    expect(slide1.animateHide).toHaveBeenCalled();
    expect(slide2.animateShow).toHaveBeenCalled();
  });
});
