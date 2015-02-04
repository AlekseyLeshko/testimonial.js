'use strict';

describe('TestimonialSlide', function() {
  it('should create testimonial slide', function() {
    spyOn(TestimonialSlide.prototype, 'createData').and.returnValue({});
    spyOn(TestimonialSlide.prototype, 'createOptions');
    spyOn(TestimonialSlide.prototype, 'createSlide');
    var $node = $('<div />');
    var options = {
      test: 'test'
    };

    var testimonialSlide = new TestimonialSlide($node, options);

    expect(testimonialSlide.data).toBeDefined();
    expect(testimonialSlide.createData).toHaveBeenCalledWith($node);
    expect(testimonialSlide.createOptions).toHaveBeenCalledWith(options);
    expect(testimonialSlide.createSlide).toHaveBeenCalled();
  });

  it('should create data', function() {
    var data = {};
    var expected = {
      author: {
        name: '',
        url: '',
        avatar: ''
      },
      company: {
        name: '',
        url: ''
      },
      quote: ''
    };
    var res = TestimonialSlide.prototype.createData(data);

    expect(res).toEqual(expected);
  });

  var getDefaultOptionsStub = function() {
   var defaultOptions = {
      width: 700,
      duration: 750,
      distance: 250,
      cssClass: 'testimonial_slide',
      indents: 20
    };
    return defaultOptions;
  };

  it('should create options', function() {

    spyOn(TestimonialSlide.prototype, 'getDefaultOptions').and.callFake(getDefaultOptionsStub);

    var expected = {
      width: 900,
      duration: 750,
      distance: 250,
      cssClass: 'testimonial_slide',
      indents: 20
    };
    var options = {
      width: 900,
      duration: 750,
      cssClass: 'testimonial_slide'
    };

    TestimonialSlide.prototype.createOptions(options);

    expect(TestimonialSlide.prototype.getDefaultOptions).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.options).toEqual(expected);
  });

  it('should height', function() {
    var expected = 100;
    var node = $('<div />', {
      height: expected
    });
    TestimonialSlide.prototype.$domNode = node;
    var height = TestimonialSlide.prototype.height();

    expect(height).toEqual(expected);
  });

  describe('animation', function() {
    var options;
    var node;
    var marginLeft;
    var delay;

    beforeEach(function() {
      /* global defaultTestimonialSlideOptions: false */
      options = defaultTestimonialSlideOptions();
      marginLeft = options.distance + 'px';
      delay = options.duration * 2 + 10;

      node = $('<div />');
      TestimonialSlide.prototype.$domNode = node;
      TestimonialSlide.prototype.options = options;
      TestimonialSlide.prototype.options.duration = 2;
    });

    it('should hide slide', function() {
      var marginLeft = '-' + options.distance + 'px';

      TestimonialSlide.prototype.hideSlide();

      var $res = TestimonialSlide.prototype.$domNode;
      expect($res.css('display')).toEqual('none');
      expect($res.css('opacity')).toEqual('0');
      expect($res.css('margin-left')).toEqual(marginLeft);
    });

    it('should animate show', function(done) {
      TestimonialSlide.prototype.animateShow();

      setTimeout(function() {
        var $res = TestimonialSlide.prototype.$domNode;
        expect($res.css('display')).toEqual('block');
        expect($res.css('opacity')).toEqual('1');
        expect($res.css('margin-left')).toEqual(marginLeft);
        done();
      }, delay);
    });

    it('should animate hide', function(done) {
      spyOn(TestimonialSlide.prototype, 'hideSlide');

      TestimonialSlide.prototype.animateHide();

      setTimeout(function() {
        var $res = TestimonialSlide.prototype.$domNode;
        expect($res.css('display')).toEqual('');
        expect($res.css('opacity')).toEqual('0');
        expect($res.css('margin-left')).toEqual(marginLeft);

        expect(TestimonialSlide.prototype.hideSlide).toHaveBeenCalled();
        done();
      }, delay);
    });
  });

  it('should create slide', function() {
    spyOn(TestimonialSlide.prototype, 'createTemplate');
    spyOn(TestimonialSlide.prototype, 'renderTemplate');

    TestimonialSlide.prototype.createSlide();

    expect(TestimonialSlide.prototype.createTemplate).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.renderTemplate).toHaveBeenCalled();
  });

  it('should slide not to be exist', function() {
    var $node = $('<div />');

    TestimonialSlide.prototype.$domNode = $node;
    spyOn($node, 'empty').and.callThrough();
    spyOn($node, 'remove').and.callThrough();

    TestimonialSlide.prototype.remove();

    expect($node.empty).toHaveBeenCalled();
    expect($node.remove).toHaveBeenCalled();
    var res = $(TestimonialSlide.prototype.$domNode).is(':empty');
    expect(res).toBeTruthy();
  });

  it('should getDefaultOptions', function() {
    var options = TestimonialSlide.prototype.getDefaultOptions();

    var propertyCount = Object.keys(options).length;
    expect(propertyCount).toEqual(5);
    expect(options.width).toEqual(700);
    expect(options.duration).toEqual(750);
    expect(options.distance).toEqual(250);
    expect(options.cssClass).toEqual('testimonial_slide');
    expect(options.indents).toEqual(20);
  });

  it('should setHeightForBlockDiv', function() {
    var height = 344;

    var $blockNode = $('<div />', {
      'class': 'block'
    });

    var $node = $('<div />', {
      'class': 'avatar'
    });
    $node.height(height);
    $node.append($blockNode);
    TestimonialSlide.prototype.$domNode = $node;

    TestimonialSlide.prototype.setHeightForBlockDiv();

    expect($node.find('.block').height()).toEqual(height);
  });

  it('should create template', function() {
    expect(TestimonialSlide.prototype.template).toBeUndefined();

    TestimonialSlide.prototype.createTemplate();

    expect(TestimonialSlide.prototype.template).toBeDefined();
  });

  it('should render template', function() {
    var value = 'test';
    TestimonialSlide.prototype.template = '<div>{{test}}</div>';
    spyOn(TestimonialSlide.prototype, 'getDataForTemplate').and.callFake(function() {
      var data = {
        test: value
      };
      return data;
    });

    TestimonialSlide.prototype.renderTemplate();

    expect(TestimonialSlide.prototype.$domNode).toBeDefined();
    var html = TestimonialSlide.prototype.$domNode.html();
    expect(html).toEqual(value);
  });

  it('should return data for template', function() {
    TestimonialSlide.prototype.options = getDefaultOptionsStub();
    TestimonialSlide.prototype.data = {
      test: 'test'
    };
    var data = TestimonialSlide.prototype.getDataForTemplate();

    expect(data).toBeDefined();
  });

  it('should return data for template', function() {
    var $node = $('<div />');
    var $container = $('<div />');
    TestimonialSlide.prototype.$domNode = $node;

    TestimonialSlide.prototype.renderTo($container);

    expect($container.children().length).toEqual(1);
  });
});
