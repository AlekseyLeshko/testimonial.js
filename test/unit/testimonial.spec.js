'use strict';

describe('Testimonial', function() {
  beforeEach(function() {
    spyOn(TestimonialSlide.prototype, 'createData');
    spyOn(TestimonialSlide.prototype, 'createOptions');
    spyOn(TestimonialSlide.prototype, 'createSlide');
  });

  it('should indexing return 2', function() {
    Testimonial.prototype.slideArr = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 1;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(2);
  });

  it('should indexing zeroed currentSlideIndex', function() {
    Testimonial.prototype.slideArr = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 2;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should getDefaultOptions', function() {
    var options = Testimonial.prototype.getDefaultOptions();

    var propertyCount = Object.keys(options).length;
    expect(propertyCount).toEqual(8);
    expect(options.height).toEqual(175);
    expect(options.width).toEqual(700);
    expect(options.timeout).toEqual(7000);
    expect(options.slideCount).toEqual(3);
    expect(options.autostart).toBeTruthy();
    expect(options.indents).toEqual(25);
    expect(options.minWidth).toEqual(400);
    expect(options.getSlide).toBeUndefined();
  });

  it('should resizePluginContainer', function() {
    var height = 100;
    var indents = 20;
    var expected = height + indents;

    var node = $('<div />', {
      height: height
    });
    spyOn(Testimonial.prototype, 'getCurrentSlide').and.returnValue(node);
    Testimonial.prototype.options = {
      indents: indents
    };
    Testimonial.prototype.$container = $('<div />');
    Testimonial.prototype.currentSlideIndex = 0;

    Testimonial.prototype.resizePluginContainer();

    expect(Testimonial.prototype.$container.height()).toEqual(expected);
  });

  it('should resizePluginContainer with empty slide list', function() {
    var expected = 0;
    Testimonial.prototype.$container = $('<div />');
    Testimonial.prototype.slideArr = [];

    Testimonial.prototype.resizePluginContainer();

    expect(Testimonial.prototype.$container.height()).toEqual(expected);
  });

  var slideCSSClassName = {
    buttonNext: '.next_slide'
  };

  it('should bind event for button', function() {
    var $container = $('<div />');
    var $button = $('<div />', {
      class: 'next_slide'
    });
    $container.append($button);
    Testimonial.prototype.$container = $container;
    spyOn(Testimonial.prototype, 'next');

    Testimonial.prototype.bindEvents();

    var $obj = Testimonial.prototype.$container.find(slideCSSClassName.buttonNext);

    $obj.click();
    expect(Testimonial.prototype.next).toHaveBeenCalled();
  });

  it('should createSlides', function() {
    var arr = [1, 2, 3];
    spyOn(Testimonial.prototype, 'createAndAddSlide');

    Testimonial.prototype.createSlides(arr);

    expect(Testimonial.prototype.createAndAddSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.createAndAddSlide.calls.count()).toEqual(arr.length);
  });

  it('should parseDomTree', function() {
    var arr = [1, 2, 3];
    spyOn(Parser.prototype, 'parse').and.returnValue(arr);
    var fileName = 'main.html';
    jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
    loadFixtures(fileName);

    var $container = $('.testimonial_slider');
    Testimonial.prototype.$container = $container;
    var dataList = Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(dataList).toEqual(arr);
    expect(Parser.prototype.parse).toHaveBeenCalled();
  });

  it('should parse empty div', function() {
    var $container = $('<div />');
    Testimonial.prototype.$container = $container;
    var dataList = Testimonial.prototype.parseDomTree();

    expect(Testimonial.prototype.$container.children().length).toEqual(0);
    expect(dataList.length).toEqual(0);
  });

  it('should parse and create slide', function() {
    var arr = [1, 2 ,3];
    spyOn(Testimonial.prototype, 'parseDomTree').and.returnValue(arr);
    spyOn(Testimonial.prototype, 'createSlides');

    Testimonial.prototype.parseAndCreateSlide();

    expect(Testimonial.prototype.parseDomTree).toHaveBeenCalled();
    expect(Testimonial.prototype.createSlides).toHaveBeenCalledWith(arr);
  });

  it('should initPlugin with autostart', function() {
    spyOn(Testimonial.prototype, 'initSlideArr');

    spyOn(Testimonial.prototype, 'start');
    Testimonial.prototype.options = {
      autostart: true
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.initPlugin();

    expect(Testimonial.prototype.initSlideArr).toHaveBeenCalled();
    expect(Testimonial.prototype.start).toHaveBeenCalled();
    expect(Testimonial.prototype.slideArr.length).toEqual(0);
    expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
  });

  it('should initPlugin without autostart', function() {
    spyOn(Testimonial.prototype, 'initSlideArr');

    Testimonial.prototype.options = {
      autostart: false
    };
    var options = {
      test: 'test'
    };

    Testimonial.prototype.initPlugin(options);

    expect(Testimonial.prototype.initSlideArr).toHaveBeenCalled();
    expect(Testimonial.prototype.slideArr.length).toEqual(0);
    expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
  });

  it('should initSlideArr', function() {
    spyOn(Testimonial.prototype, 'configContainer');
    spyOn(Testimonial.prototype, 'createTemplate');
    spyOn(Testimonial.prototype, 'renderTemplate');
    spyOn(Testimonial.prototype, 'bindEvents');
    spyOn(Testimonial.prototype, 'parseAndCreateSlide');
    spyOn(Testimonial.prototype, 'slideArrRendering');
    spyOn(Testimonial.prototype, 'resizePluginContainer');

    Testimonial.prototype.initSlideArr();

    expect(Testimonial.prototype.configContainer).toHaveBeenCalled();
    expect(Testimonial.prototype.createTemplate).toHaveBeenCalled();
    expect(Testimonial.prototype.renderTemplate).toHaveBeenCalled();
    expect(Testimonial.prototype.bindEvents).toHaveBeenCalled();
    expect(Testimonial.prototype.parseAndCreateSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.slideArrRendering).toHaveBeenCalled();
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
  });

  it('should start', function(done) {
    spyOn(Testimonial.prototype, 'next');
    var timeout = 100;
    Testimonial.prototype.options = {
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
    spyOn(Testimonial.prototype, 'createOptions');
    spyOn(Testimonial.prototype, 'initPlugin');
    var $container = $('<div />');
    var options = {
      test: 'test'
    };

    var testimonial = new Testimonial($container, options);

    expect(testimonial).toBeDefined();
    expect(testimonial.$container).toEqual($container);
    expect(testimonial.createOptions).toHaveBeenCalledWith(options);
    expect(testimonial.initPlugin).toHaveBeenCalledWith();
  });

  it('should rendering slide list', function() {
    var slide1 = new TestimonialSlide();
    var slide2 = new TestimonialSlide();
    Testimonial.prototype.slideArr = [
      slide1,
      slide2,
    ];
    spyOn(Testimonial.prototype, 'slideRendering');
    Testimonial.prototype.currentSlideIndex = 0;

    Testimonial.prototype.slideArrRendering();

    expect(Testimonial.prototype.slideRendering).toHaveBeenCalled();
    expect(Testimonial.prototype.slideRendering.calls.count()).toEqual(2);
    expect(Testimonial.prototype.slideRendering.calls.argsFor(0)).toEqual([slide1]);
    expect(Testimonial.prototype.slideRendering.calls.argsFor(1)).toEqual([slide2]);
  });

  it('should createOptions', function() {
    spyOn(Testimonial.prototype, 'getDefaultOptions').and.callFake(defaultTestimonialOptions);
    spyOn(Testimonial.prototype, 'setMinSizePlugin');
    var timeout = 5;
    var options = {
      timeout: timeout
    };

    Testimonial.prototype.createOptions(options);

    expect(Testimonial.prototype.options.timeout).toEqual(timeout);
    expect(Testimonial.prototype.getDefaultOptions).toHaveBeenCalled();
    expect(Testimonial.prototype.setMinSizePlugin).toHaveBeenCalled();
  });

  it('should createOptions with width', function() {
    var expected = 400;
    spyOn(Testimonial.prototype, 'getDefaultOptions').and.callFake(defaultTestimonialOptions)
    spyOn(Testimonial.prototype, 'setMinSizePlugin');
    var timeout = 5;
    var options = {
      timeout: timeout,
      width: expected
    };

    Testimonial.prototype.createOptions(options);

    expect(Testimonial.prototype.getDefaultOptions).toHaveBeenCalled();
    expect(Testimonial.prototype.options.timeout).toEqual(timeout);
    expect(Testimonial.prototype.options.width).toEqual(expected);
    expect(Testimonial.prototype.setMinSizePlugin).toHaveBeenCalled();
  });

  describe('Next method', function() {
    beforeEach(function() {
      spyOn(Testimonial.prototype, 'stop');
      spyOn(Testimonial.prototype, 'cleanSlideArr');
      spyOn(Testimonial.prototype, 'transitionAnimation');
    });

    afterEach(function() {
      expect(Testimonial.prototype.stop).toHaveBeenCalled();
      expect(Testimonial.prototype.cleanSlideArr).toHaveBeenCalled();
      expect(Testimonial.prototype.transitionAnimation).toHaveBeenCalled();
      expect(Testimonial.prototype.isNeedLoadSlide).toHaveBeenCalled();
      expect(Testimonial.prototype.isNeedStartSlider).toHaveBeenCalled();
    });

    it('should next', function() {
      spyOn(Testimonial.prototype, 'isNeedLoadSlide').and.returnValue(false);
      spyOn(Testimonial.prototype, 'isNeedStartSlider').and.returnValue(false);

      Testimonial.prototype.next();

    });

    it('should next with load slide', function() {
      spyOn(Testimonial.prototype, 'isNeedLoadSlide').and.returnValue(true);
      spyOn(Testimonial.prototype, 'isNeedStartSlider').and.returnValue(false);
      spyOn(Testimonial.prototype, 'loadSlide');

      Testimonial.prototype.next();

      expect(Testimonial.prototype.loadSlide).toHaveBeenCalled();
    });

    it('should next with start plugin', function() {
      spyOn(Testimonial.prototype, 'isNeedLoadSlide').and.returnValue(false);
      spyOn(Testimonial.prototype, 'isNeedStartSlider').and.returnValue(true);
      spyOn(Testimonial.prototype, 'start');

      Testimonial.prototype.next();

      expect(Testimonial.prototype.start).toHaveBeenCalled();
    });
  });

  it('should add slide', function() {
    var slideObj = {
      test: 'test'
    };
    var slide = new TestimonialSlide();

    spyOn(Testimonial.prototype, 'createAndAddSlide');
    spyOn(Testimonial.prototype, 'getLastSlide').and.returnValue(slide);
    spyOn(Testimonial.prototype, 'slideRendering');
    spyOn(Testimonial.prototype, 'resizePluginContainer');

    Testimonial.prototype.add(slideObj);

    expect(Testimonial.prototype.createAndAddSlide).toHaveBeenCalledWith(slideObj);
    expect(Testimonial.prototype.getLastSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.slideRendering).toHaveBeenCalledWith(slide);
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
  });

  describe('Slide rendering', function() {
    var slide;

    beforeEach(function() {
      var $container = $('<div />');
      var slideArrWrapper = $('<div />', {
        class: 'main_container'
      });
      $container.append(slideArrWrapper);
      Testimonial.prototype.$container = $container;
    });

    beforeEach(function() {
      slide = new TestimonialSlide();
      spyOn(slide, 'renderTo');
    });

    afterEach(function() {
      var $mainContainer = Testimonial.prototype.$container.find('.main_container');
      expect(slide.renderTo).toHaveBeenCalledWith($mainContainer);
    });

    it('should don\'t hide slide', function() {
      spyOn(Testimonial.prototype, 'isNeedHideSlide').and.returnValue(false);

      Testimonial.prototype.slideRendering(slide, true);

      expect(Testimonial.prototype.isNeedHideSlide).toHaveBeenCalled();
    });

    it('should hide slide', function() {
      spyOn(Testimonial.prototype, 'isNeedHideSlide').and.returnValue(true);
      spyOn(slide, 'hideSlide');

      Testimonial.prototype.slideRendering(slide, false);

      expect(slide.hideSlide).toHaveBeenCalled();
      expect(Testimonial.prototype.isNeedHideSlide).toHaveBeenCalled();
    });
  });

  describe('Clean slide list', function() {
    var slideCount;

    beforeEach(function() {
      Testimonial.prototype.currentSlideIndex = 0;

      var list = [1 , 2 , 3];
      slideCount = list.length;
      Testimonial.prototype.slideArr = list;
      spyOn(Testimonial.prototype, 'removeSlide');
    });

    afterEach(function() {
      expect(Testimonial.prototype.whetherToRemoveSlide).toHaveBeenCalled();
      expect(Testimonial.prototype.slideArr.length).toEqual(slideCount);

    });

    it('should not need remove slide', function() {
      spyOn(Testimonial.prototype, 'whetherToRemoveSlide').and.returnValue(false);

      Testimonial.prototype.cleanSlideArr();

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
        Testimonial.prototype.cleanSlideArr();

        expect(Testimonial.prototype.currentSlideIndex).toEqual(0);
        expect(Testimonial.prototype.removeSlide).toHaveBeenCalledWith(1);
      });

      it('should remove first slide', function() {
        Testimonial.prototype.currentSlideIndex = 2;

        Testimonial.prototype.cleanSlideArr();
        expect(Testimonial.prototype.currentSlideIndex).toEqual(1);
        expect(Testimonial.prototype.removeSlide).toHaveBeenCalledWith(0);
      });
    });
  });

  it('should loadSlide without getSlide not add slide', function() {
    spyOn(Testimonial.prototype, 'add');
    spyOn(Testimonial.prototype, 'isFunction').and.returnValue(false);

    Testimonial.prototype.loadSlide();

    expect(Testimonial.prototype.isFunction).toHaveBeenCalledWith(undefined);
    expect(Testimonial.prototype.add).not.toHaveBeenCalled();
  });

  it('should load slide with getSlide', function() {
    spyOn(Testimonial.prototype, 'isFunction').and.returnValue(true);
    var expected = {
      quote: 'quote'
    };
    Testimonial.prototype.options = {
      getSlide: function() {
      }
    };
    spyOn(Testimonial.prototype, 'add');
    spyOn(Testimonial.prototype.options, 'getSlide').and.returnValue(expected);

    Testimonial.prototype.loadSlide();

    expect(Testimonial.prototype.isFunction).toHaveBeenCalledWith(Testimonial.prototype.options.getSlide);
    expect(Testimonial.prototype.options.getSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.add).toHaveBeenCalledWith(expected);
  });

  it('should is function', function() {
    var fun = function() {
    };

    var res = Testimonial.prototype.isFunction(fun);

    expect(res).toBeTruthy();
  });

  it('should is not function', function() {
    var fun = 'not function';

    var res = Testimonial.prototype.isFunction(fun);

    expect(res).toBeFalsy();
  });

  describe('whetherToRemoveSlide', function() {
    beforeEach(function() {
      Testimonial.prototype.slideArr = [1, 2, 3];
      Testimonial.prototype.options = {
        slideCount: 2
      };
    });

    it('should need to remove the slide', function() {
      var res = Testimonial.prototype.whetherToRemoveSlide();

      expect(res).toBeTruthy();
    });

    it('should do not need to remove the slide', function() {
      Testimonial.prototype.options = {
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

    Testimonial.prototype.slideArr = [
      1,
      slide,
      3
    ];
    var index = 1;

    Testimonial.prototype.removeSlide(index);

    expect(Testimonial.prototype.slideArr).toEqual([1, 3]);
    expect(slide.remove).toHaveBeenCalled();
  });

  it('should get slide count', function() {
    var expected = 3;

    Testimonial.prototype.options = {
      slideCount: expected
    };

    var slideCount = Testimonial.prototype.getSlideCount();

    expect(slideCount).toEqual(expected);
  });

  it('should set slide count', function() {
    var value = 3;

    Testimonial.prototype.options = {
      slideCount: 1
    };

    Testimonial.prototype.setSlideCount(value);

    var slideCount = Testimonial.prototype.options.slideCount;
    expect(slideCount).toEqual(value);
  });

  it('should need to remove two slide', function() {
    spyOn(Testimonial.prototype, 'cleanSlideArr').and.callFake(function() {
      Testimonial.prototype.slideArr.length -= 1;
    });
    var value = 3;
    Testimonial.prototype.options = {
      slideCount: 5
    };
    Testimonial.prototype.slideArr = [1, 2, 3, 4, 5];

    Testimonial.prototype.setSlideCount(value);

    var length = Testimonial.prototype.slideArr.length;
    expect(length).toEqual(value);
    var slideCount = Testimonial.prototype.options.slideCount;
    expect(slideCount).toEqual(value);
    expect(Testimonial.prototype.cleanSlideArr).toHaveBeenCalled();
    expect(Testimonial.prototype.cleanSlideArr.calls.count()).toEqual(2);
  });

  it('should set height and width for container', function() {
    var height = 175;
    var width = 700;
    Testimonial.prototype.options = {
      height: height,
      width: width
    };
    var $node = $('<div />');

    Testimonial.prototype.configContainer();

    var $container = Testimonial.prototype.$container;
    expect($container.height()).toEqual(0);
    expect($container.width()).toEqual(width);
  });

  it('should create and add slide', function() {
    var $node = $('<div />');
    var width = 700;

    Testimonial.prototype.slideArr = [];
    Testimonial.prototype.options = {
      width: width
    };
    var cSpy = spyOn(window, 'TestimonialSlide');

    Testimonial.prototype.createAndAddSlide($node);

    var expected = {
      width: width
    };
    var args = cSpy.calls.argsFor(0);
    expect(cSpy).toHaveBeenCalled();
    expect(Testimonial.prototype.slideArr.length).toEqual(1);
    expect(args).toEqual([$node, expected]);
  });

  it('should create template', function() {
    expect(Testimonial.prototype.template).toBeUndefined();

    Testimonial.prototype.createTemplate();

    expect(Testimonial.prototype.template).toBeDefined();
    expect(Testimonial.prototype.template.length).toEqual(3);
  });

  it('should render template', function() {
    var width = 500;
    var expected = width * 2 + 500;
    var $container = $('<div />');
    Testimonial.prototype.$container = $container;
    Testimonial.prototype.options = {
      width: width
    };

    Testimonial.prototype.renderTemplate();

    var count = Testimonial.prototype.$container.find('div').length;
    var $mainContainer = Testimonial.prototype.$container.find('.main_container');
    expect(count).toEqual(2);
    expect($mainContainer.width()).toEqual(expected);
  });

  it('should get current slide', function() {
    var expectedObj = 2;
    var slideArr = [1, expectedObj, 3];
    var index = 1;
    Testimonial.prototype.slideArr = slideArr;
    Testimonial.prototype.currentSlideIndex = index;

    var res = Testimonial.prototype.getCurrentSlide();

    expect(res).toEqual(expectedObj);
  });

  it('should get next slide', function() {
    var expected = 2;
    spyOn(Testimonial.prototype, 'indexing');
    spyOn(Testimonial.prototype, 'getCurrentSlide').and.callFake(function() {
      return expected
    });

    var res = Testimonial.prototype.getNextSlide();

    expect(res).toEqual(expected);
    expect(Testimonial.prototype.indexing).toHaveBeenCalled();
    expect(Testimonial.prototype.getCurrentSlide).toHaveBeenCalled();
  });

  it('should get last slide', function() {
    var expectedObj = 3;
    var slideArr = [1, 2, expectedObj];
    Testimonial.prototype.slideArr = slideArr;

    var res = Testimonial.prototype.getLastSlide();

    expect(res).toEqual(expectedObj);
  });

  it('should transition animation', function() {
    var currentSlide = new TestimonialSlide();
    var nextSLide = new TestimonialSlide();
    spyOn(currentSlide, 'animateHide');
    spyOn(nextSLide, 'animateShow');
    spyOn(Testimonial.prototype, 'getCurrentSlide').and.returnValue(currentSlide);
    spyOn(Testimonial.prototype, 'getNextSlide').and.returnValue(nextSLide);
    spyOn(Testimonial.prototype, 'resizePluginContainer');

    Testimonial.prototype.transitionAnimation();

    expect(Testimonial.prototype.getCurrentSlide).toHaveBeenCalled();
    expect(Testimonial.prototype.getNextSlide).toHaveBeenCalled();
    expect(currentSlide.animateHide).toHaveBeenCalled();
    expect(nextSLide.animateShow).toHaveBeenCalled();
    expect(Testimonial.prototype.resizePluginContainer).toHaveBeenCalled();
  });

  it('should need load slide', function() {
    Testimonial.prototype.currentSlideIndex = 0;
    Testimonial.prototype.options = {
      slideCount: 3
    };
    var res = Testimonial.prototype.isNeedLoadSlide();

    expect(res).toBeTruthy();
  });

  it('should don\'t need load slide', function() {
    Testimonial.prototype.currentSlideIndex = 2;
    Testimonial.prototype.options = {
      slideCount: 2
    };
    var res = Testimonial.prototype.isNeedLoadSlide();

    expect(res).toBeFalsy();
  });

  it('should need start slider', function() {
    Testimonial.prototype.timerId = undefined;

    var res = Testimonial.prototype.isNeedStartSlider();

    expect(res).toBeTruthy();
  });

  it('should don\'t need start slider', function() {
    Testimonial.prototype.timerId = 3;

    var res = Testimonial.prototype.isNeedStartSlider();

    expect(res).toBeFalsy();
  });

  it('should set min size for the plugin', function() {
    var expected = 400;
    Testimonial.prototype.options = {
      width: 350,
      minWidth: expected
    };

    Testimonial.prototype.setMinSizePlugin();

    expect(Testimonial.prototype.options.width).toEqual(expected);
  });

  it('should not set min size for the plugin', function() {
    var expected = 401;
    Testimonial.prototype.options = {
      width: expected,
      minWidth: 400
    };

    Testimonial.prototype.setMinSizePlugin();

    expect(Testimonial.prototype.options.width).toEqual(expected);
  });

  it('should need hide slide', function() {
    var slide = new TestimonialSlide();
    Testimonial.prototype.slideArr = [slide];
    Testimonial.prototype.currentSlideIndex = 1;

    var res = Testimonial.prototype.isNeedHideSlide(slide);

    expect(res).toBeTruthy();
  });

  it('should don\'t need hide slide', function() {
    var slide = new TestimonialSlide();
    Testimonial.prototype.slideArr = [slide];
    Testimonial.prototype.currentSlideIndex = 0;

    var res = Testimonial.prototype.isNeedHideSlide(slide);

    expect(res).toBeFalsy();
  });
});
