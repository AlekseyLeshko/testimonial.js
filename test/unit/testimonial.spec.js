'use strict';

describe('Testimonial', function() {
  it('should indexing return 2', function() {
    Testimonial.prototype.$slideList = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 1;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(2);
  });

  it('should indexing return 0', function() {
    Testimonial.prototype.$slideList = [];

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should indexing zeroed currentSlideIndex', function() {
    Testimonial.prototype.$slideList = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 2;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should getDefaultOptions', function() {
    var options = Testimonial.prototype.getDefaultOptions();

    var propertyCount = Object.keys(options).length;
    expect(propertyCount).toEqual(6);
    expect(options.height).toEqual(175);
    expect(options.width).toEqual(700);
    expect(options.timeout).toEqual(7000);
    expect(options.slideCount).toEqual(3);
    expect(options.autostart).toBeTruthy();
    expect(options.indents).toEqual(20);
  });

  it('should resizePluginContainer', function() {
    var indents = 20;
    var height = 100;
    var expected = height + indents;
    var obj = $('<div />', {
      height: height
    });
    Testimonial.prototype.$container = $('<div />');
    Testimonial.prototype.$slideList = [obj, $('<div />')];
    Testimonial.prototype.currentSlideIndex = 0;

    Testimonial.prototype.resizePluginContainer();

    expect(Testimonial.prototype.$container.height()).toEqual(expected);
  });

  it('should resizePluginContainer with empty slide list', function() {
    var expected = 0;
    var height = 100;
    var obj = $('<div />', {
      height: height
    });
    Testimonial.prototype.$container = $('<div />');
    Testimonial.prototype.$slideList = [];
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
    Testimonial.prototype.pluginOptions = {
      width: 700
    };
    var expected = 1900;
    spyOn(Testimonial.prototype, 'createButtonNext');
    Testimonial.prototype.$container = $('<div />');

    Testimonial.prototype.createInfrastructure();
    var $obj = Testimonial.prototype.$slideListWrapper;

    expect($obj.width()).toEqual(expected);
    expect($obj.prop('tagName')).toEqual('DIV');
    expect($obj.attr('class')).toEqual('main_container');
    expect(Testimonial.prototype.createButtonNext).toHaveBeenCalled();
  });

  it('should createSlides', function() {
    var arr = [1, 2, 3];
    Testimonial.prototype.dataList = arr;
    spyOn(Testimonial.prototype, 'createAndAddSlide');

    Testimonial.prototype.createSlides();

    expect(Testimonial.prototype.createAndAddSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.createAndAddSlide.calls.count()).toEqual(arr.length);
  });

  it('should parseDomTree', function() {
    Testimonial.prototype.dataList = [];
    var arr = [1, 2, 3];
    spyOn(Parser.prototype, 'parse').and.returnValue(arr);
    var fileName = 'main.html';
    jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
    loadFixtures(fileName);

    var $container = $('.testimonial_slider');
    Testimonial.prototype.$container = $container;
    Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(Testimonial.prototype.dataList).toEqual(arr);
    expect(Parser.prototype.parse).toHaveBeenCalled();
  });

  it('should parse empty div', function() {
    Testimonial.prototype.dataList = [];

    var $container = $('<div />');
    Testimonial.prototype.$container = $container;
    Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(Testimonial.prototype.dataList.length).toEqual(0);
  });

  it('should initPlugin with autostart', function() {
    spyOn(Testimonial.prototype, 'createOptions');
    spyOn(Testimonial.prototype, 'initSlideList');

    spyOn(Testimonial.prototype, 'start');
    Testimonial.prototype.pluginOptions = {
      autostart: true
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.initPlugin(options);

    expect(Testimonial.prototype.createOptions).toHaveBeenCalledWith(options);
    expect(Testimonial.prototype.initSlideList).toHaveBeenCalled();
    expect(Testimonial.prototype.start).toHaveBeenCalled();
    expect(Testimonial.prototype.$slideList.length).toEqual(0);
    expect(Testimonial.prototype.dataList.length).toEqual(0);
    expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
    expect(Testimonial.prototype.getSlide).toBeDefined();
  });

  it('should initPlugin without autostart', function() {
    spyOn(Testimonial.prototype, 'createOptions');
    spyOn(Testimonial.prototype, 'initSlideList');

    Testimonial.prototype.pluginOptions = {
      autostart: false
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.initPlugin(options);

    expect(Testimonial.prototype.createOptions).toHaveBeenCalledWith(options);
    expect(Testimonial.prototype.initSlideList).toHaveBeenCalled();
    expect(Testimonial.prototype.$slideList.length).toEqual(0);
    expect(Testimonial.prototype.dataList.length).toEqual(0);
    expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
  });

  it('should initSlideList', function() {
    spyOn(Testimonial.prototype, 'configContainer');
    spyOn(Testimonial.prototype, 'parseDomTree');
    spyOn(Testimonial.prototype, 'createSlides');
    spyOn(Testimonial.prototype, 'createInfrastructure');
    spyOn(Testimonial.prototype, 'slideListRendering');
    spyOn(Testimonial.prototype, 'resizePluginContainer');

    Testimonial.prototype.initSlideList();

    expect(Testimonial.prototype.configContainer).toHaveBeenCalled();
    expect(Testimonial.prototype.parseDomTree).toHaveBeenCalled();
    expect(Testimonial.prototype.createSlides).toHaveBeenCalled();
    expect(Testimonial.prototype.createInfrastructure).toHaveBeenCalled();
    expect(Testimonial.prototype.slideListRendering).toHaveBeenCalled();
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
      clearInterval(Testimonial.prototype.timerId);
      Testimonial.prototype.timerId = undefined;
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
    var options = {
      test: 'test'
    };

    var testimonial = new Testimonial($container, options);

    expect(testimonial.$container).toEqual($container);
    expect(testimonial.initPlugin).toHaveBeenCalledWith(options);
  });

  it('should rendering slide list', function() {
    var slide1 = new TestimonialSlide();
    var slide2 = new TestimonialSlide();
    Testimonial.prototype.$slideList = [
      slide1,
      slide2,
    ];
    spyOn(Testimonial.prototype, 'slideRendering');
    Testimonial.prototype.currentSlideIndex = 0;

    Testimonial.prototype.slideListRendering();

    expect(Testimonial.prototype.slideRendering).toHaveBeenCalled();
    expect(Testimonial.prototype.slideRendering.calls.count()).toEqual(2);
    expect(Testimonial.prototype.slideRendering.calls.argsFor(0)).toEqual([slide1, true]);
    expect(Testimonial.prototype.slideRendering.calls.argsFor(1)).toEqual([slide2, false]);
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

  describe('Next method', function() {
    var slide1;
    var slide2;
    var slide3;

    beforeEach(function() {
      var slideCount = 3;
      Testimonial.prototype.timerId = undefined;
      Testimonial.prototype.currentSlideIndex = 0;
      Testimonial.prototype.pluginOptions = {
        slideCount: slideCount
      };
    });

    beforeEach(function() {
      slide1 = new TestimonialSlide();
      slide2 = new TestimonialSlide();
      slide3 = new TestimonialSlide();
      var slideList = [
        slide1,
        slide2,
        slide3
      ];
      Testimonial.prototype.$slideList = slideList;
    });

    beforeEach(function() {
      spyOn(Testimonial.prototype, 'cleanSlideList');
      spyOn(Testimonial.prototype, 'indexing').and.callThrough();
      spyOn(Testimonial.prototype, 'resizePluginContainer');
      spyOn(Testimonial.prototype, 'start');
    });

    afterEach(function() {
      expect(Testimonial.prototype.cleanSlideList).toHaveBeenCalled();
      expect(Testimonial.prototype.indexing).toHaveBeenCalled();
      expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
      expect(Testimonial.prototype.start).toHaveBeenCalled();
    });

    it('should next with loadSlide', function() {
      Testimonial.prototype.currentSlideIndex = 1;
      spyOn(Testimonial.prototype, 'loadSlide');
      spyOn(slide2, 'animateHide');
      spyOn(slide3, 'animateShow');

      Testimonial.prototype.next();

      expect(Testimonial.prototype.loadSlide).toHaveBeenCalled();
      expect(slide2.animateHide).toHaveBeenCalled();
      expect(slide3.animateShow).toHaveBeenCalled();
    });

    describe('first and second slide', function() {
      beforeEach(function() {
        Testimonial.prototype.pluginOptions.slideCount = 1;
        spyOn(slide1, 'animateHide');
        spyOn(slide2, 'animateShow');
      });

      afterEach(function() {
        expect(slide1.animateHide).toHaveBeenCalled();
        expect(slide2.animateShow).toHaveBeenCalled();
      });

      it('should next with timerId', function() {
        Testimonial.prototype.timerId = 100;
        spyOn(Testimonial.prototype, 'stop');

        Testimonial.prototype.next();

        expect(Testimonial.prototype.stop).toHaveBeenCalled();
      });

      it('should next without stop and loadSlide', function() {
        Testimonial.prototype.next();
      });
    });
  });

  it('should add slide', function() {
    var slide = {
      test: 'test'
    };
    Testimonial.prototype.$slideList = [];
    var expected = {
      test: 'expected'
    };
    spyOn(Testimonial.prototype, 'createAndAddSlide').and.callFake(function() {
      Testimonial.prototype.$slideList.push(expected);
    });
    spyOn(Testimonial.prototype, 'slideRendering');

    Testimonial.prototype.add(slide);

    expect(Testimonial.prototype.createAndAddSlide).toHaveBeenCalledWith(slide);
    expect(Testimonial.prototype.$slideList.length).toEqual(1);
    expect(Testimonial.prototype.slideRendering.calls.argsFor(0)).toEqual([expected, false]);
  });

  it('should rendering slide', function() {
    var $slideListWrapper = $('<div />');
    Testimonial.prototype.$slideListWrapper = $slideListWrapper;

    var slide = new TestimonialSlide();
    var $node = $('<div />');
    spyOn(slide, 'getDomNode').and.returnValue($node);

    Testimonial.prototype.slideRendering(slide, false);

    expect(slide.getDomNode).toHaveBeenCalled();
    expect(Testimonial.prototype.$slideListWrapper.children().length).toEqual(1);
  });

  it('should rendering slide with hide slide', function() {
    var $slideListWrapper = $('<div />');
    Testimonial.prototype.$slideListWrapper = $slideListWrapper;

    var slide = new TestimonialSlide();
    var $node = $('<div />');
    spyOn(slide, 'getDomNode').and.returnValue($node);
    spyOn(slide, 'hideSlide');

    Testimonial.prototype.slideRendering(slide, true);

    expect(slide.getDomNode).toHaveBeenCalled();
    expect(Testimonial.prototype.$slideListWrapper.children().length).toEqual(1);
  });

  describe('Clean slide list', function() {
    var slideCount;

    beforeEach(function() {
      Testimonial.prototype.currentSlideIndex = 0;

      var list = [1 , 2 , 3];
      slideCount = list.length;
      Testimonial.prototype.$slideList = list;
      spyOn(Testimonial.prototype, 'removeSlide');
    });

    afterEach(function() {
      expect(Testimonial.prototype.whetherToRemoveSlide).toHaveBeenCalled();
      expect(Testimonial.prototype.$slideList.length).toEqual(slideCount);

    });

    it('should not need remove slide', function() {
      spyOn(Testimonial.prototype, 'whetherToRemoveSlide').and.returnValue(false);

      Testimonial.prototype.cleanSlideList();

      expect(Testimonial.prototype.removeSlide.calls.count()).toEqual(0);
      expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
    });

    describe('need to remove slide', function() {
      beforeEach(function() {
        spyOn(Testimonial.prototype, 'whetherToRemoveSlide').and.returnValue(true);
      });

      afterEach(function() {
        expect(Testimonial.prototype.removeSlide).toHaveBeenCalled();
      });

      it('should need to remove second slide', function() {
        Testimonial.prototype.cleanSlideList();

        expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
        expect(Testimonial.prototype.removeSlide).toHaveBeenCalledWith(1);
      });

      it('should remove first slide', function() {
        Testimonial.prototype.currentSlideIndex = 2;

        Testimonial.prototype.cleanSlideList();
        expect(Testimonial.prototype.currentSlideIndex).toEqual(1);
        expect(Testimonial.prototype.removeSlide).toHaveBeenCalledWith(0);
      });
    });
  });

  it('should loadSlide without getSlide not add slide', function() {
    spyOn(Testimonial.prototype, 'add');

    Testimonial.prototype.loadSlide();

    expect(Testimonial.prototype.add).not.toHaveBeenCalled();
  });

  it('should load slide with getSlide', function() {
    var expected = {
      quote: 'quote'
    };
    Testimonial.prototype.getSlide = null;
    spyOn(Testimonial.prototype, 'add');
    spyOn(Testimonial.prototype, 'getSlide').and.returnValue(expected);

    Testimonial.prototype.loadSlide();

    expect(Testimonial.prototype.getSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.add).toHaveBeenCalledWith(expected);
  });

  describe('whetherToRemoveSlide', function() {
    beforeEach(function() {
      Testimonial.prototype.$slideList = [1, 2, 3];
      Testimonial.prototype.pluginOptions = {
        slideCount: 2
      };
    });

    it('should need to remove the slide', function() {
      var res = Testimonial.prototype.whetherToRemoveSlide();

      expect(res).toBeTruthy();
    });

    it('should do not need to remove the slide', function() {
      Testimonial.prototype.pluginOptions = {
        slideCount: 5
      };

      var res = Testimonial.prototype.whetherToRemoveSlide();

      expect(res).toBeFalsy();
    });
  });

  it('should remove slide', function() {
    var $node = $('<div />');
    var slide = new TestimonialSlide($node);
    spyOn(slide, 'remove');

    Testimonial.prototype.$slideList = [
      1,
      slide,
      3
    ];
    var index = 1;

    Testimonial.prototype.removeSlide(index);

    expect(Testimonial.prototype.$slideList).toEqual([1, 3]);
    expect(slide.remove).toHaveBeenCalled();
  });

  it('should get slide count', function() {
    var expected = 3;

    Testimonial.prototype.pluginOptions = {
      slideCount: expected
    };

    var slideCount = Testimonial.prototype.getSlideCount();

    expect(slideCount).toEqual(expected);
  });

  it('should set slide count', function() {
    var value = 3;

    Testimonial.prototype.pluginOptions = {
      slideCount: 1
    };

    Testimonial.prototype.setSlideCount(value);

    var slideCount = Testimonial.prototype.pluginOptions.slideCount;
    expect(slideCount).toEqual(value);
  });

  it('should need to remove two slide', function() {
    spyOn(Testimonial.prototype, 'cleanSlideList').and.callFake(function() {
      Testimonial.prototype.$slideList.length -=1;
    });
    var value = 3;
    Testimonial.prototype.pluginOptions = {
      slideCount: 5
    };
    Testimonial.prototype.$slideList = [1, 2, 3, 4, 5];

    Testimonial.prototype.setSlideCount(value);

    var length = Testimonial.prototype.$slideList.length;
    expect(length).toEqual(value);
    var slideCount = Testimonial.prototype.pluginOptions.slideCount;
    expect(slideCount).toEqual(value);
    expect(Testimonial.prototype.cleanSlideList).toHaveBeenCalled();
    expect(Testimonial.prototype.cleanSlideList.calls.count()).toEqual(2);
  });

  it('should set height and width for container', function() {
    var height = 175;
    var width = 700;
    Testimonial.prototype.pluginOptions = {
      height: height,
      width: width
    };
    var $node = $('<div />');

    Testimonial.prototype.configContainer();

    var $container = Testimonial.prototype.$container;
    expect($container.height()).toEqual(height);
    expect($container.width()).toEqual(width);
  });

  it('should create and add slide', function() {
    var $node = $('<div />');
    var width = 700;

    Testimonial.prototype.$slideList = [];
    Testimonial.prototype.pluginOptions = {
      width: width
    };
    var cSpy = spyOn(window, 'TestimonialSlide');

    Testimonial.prototype.createAndAddSlide($node);

    var expected = {
      width: width
    };
    var args = cSpy.calls.argsFor(0);
    expect(cSpy).toHaveBeenCalled();
    expect(Testimonial.prototype.$slideList.length).toEqual(1);
    expect(args).toEqual([$node, expected]);
  });
});
