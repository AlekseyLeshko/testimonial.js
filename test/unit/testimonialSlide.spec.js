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

  it('should create options', function() {
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

  describe('uses createDivWithClass', function() {
    beforeEach(function() {
      /* global createDivWithClassStub: false */
      spyOn(TestimonialSlide.prototype, 'createDivWithClass').and.callFake(createDivWithClassStub);
    });

    it('should create standard dom node', function() {
      var indents = 20;
      var width = 680;
      var expected = width - indents;
      TestimonialSlide.prototype.options = {
        width: width,
        indents: indents
      };

      TestimonialSlide.prototype.createStandardDomNode();

      width = TestimonialSlide.prototype.$domNode.width();
      expect(width).toEqual(expected);
      expect(TestimonialSlide.prototype.$domNode).toBeDefined();
      expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
    });

    it('should createAvatarNode', function() {
      spyOn(TestimonialSlide.prototype, 'createImgAuthorFoto').and.callFake(function() {
        return $('<div />');
      });

      var $node = TestimonialSlide.prototype.createAvatarNode();

      expect($node.prop('tagName')).toEqual('DIV');
      expect($node.attr('class')).toEqual('avatar');
      expect($node.find('.block').length).toEqual(1);
      expect($node.find('.author').length).toEqual(1);
      expect($node.find('.helper').length).toEqual(1);
      expect(TestimonialSlide.prototype.createDivWithClass.calls.count()).toEqual(4);
    });

    it('should createMainNode', function() {
      var width = 180;
      var expected = width - 180;
      TestimonialSlide.prototype.options = {
        width: width
      };
      spyOn(TestimonialSlide.prototype, 'createQuoteNode').and.callFake(function() {
        return $('<div />');
      });
      spyOn(TestimonialSlide.prototype, 'createSignatureNode').and.callFake(function() {
        return $('<div />');
      });
      var $node = TestimonialSlide.prototype.createMainNode();

      expect($node.width()).toEqual(expected);
      expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
      expect(TestimonialSlide.prototype.createQuoteNode).toHaveBeenCalled();
      expect(TestimonialSlide.prototype.createSignatureNode).toHaveBeenCalled();
    });

    it('should create quote node', function() {
      spyOn(TestimonialSlide.prototype, 'createTextNode').and.callFake(function() {
        return $('<div />');
      });

      var $res = TestimonialSlide.prototype.createQuoteNode();

      expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
      expect(TestimonialSlide.prototype.createTextNode).toHaveBeenCalled();

      expect($res.prop('tagName')).toEqual('DIV');
      expect($res.attr('class')).toEqual('quote');
      expect($res.children().length).toEqual(1);
    });

    it('should create text node', function() {
      var quote = 'test';
      TestimonialSlide.prototype.data = {
        quote: quote
      };
      var $res = TestimonialSlide.prototype.createTextNode();

      expect(TestimonialSlide.prototype.createDivWithClass.calls.count()).toEqual(3);
      expect($res.prop('tagName')).toEqual('DIV');
      expect($res.attr('class')).toEqual('text');
      expect($res.text()).toEqual(quote);
      expect($res.children().length).toEqual(3);
    });

    it('should create signature node', function() {
      spyOn(TestimonialSlide.prototype, 'createAuthorNode');
      spyOn(TestimonialSlide.prototype, 'createCompanyNode');

      var $node = TestimonialSlide.prototype.createSignatureNode();

      expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
      expect($node.prop('tagName')).toEqual('DIV');
      expect($node.attr('class')).toEqual('signature');
      expect(TestimonialSlide.prototype.createAuthorNode).toHaveBeenCalled();
      expect(TestimonialSlide.prototype.createCompanyNode).toHaveBeenCalled();
    });

    it('should create author node', function() {
      spyOn(TestimonialSlide.prototype, 'createLinkNode').and.returnValue($('<a />'));
      var url = 'example.com';
      var name = 'example';
      var data = {
        author: {
          name: name,
          url: url
        }
      };
      TestimonialSlide.prototype.data = data;

      var $node = TestimonialSlide.prototype.createAuthorNode();

      expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
      expect($node.prop('tagName')).toEqual('DIV');
      expect($node.attr('class')).toEqual('author');
      expect($node.text()).toEqual('- ');
      expect($node.find('a').length).toEqual(1);
      expect(TestimonialSlide.prototype.createLinkNode).toHaveBeenCalledWith(url, name);
    });

    it('should create company node', function() {
      spyOn(TestimonialSlide.prototype, 'createLinkNode').and.returnValue($('<a />'));
      var url = 'example.com';
      var name = 'example';
      var data = {
        company: {
          name: name,
          url: url
        }
      };
      TestimonialSlide.prototype.data = data;

      var $node = TestimonialSlide.prototype.createCompanyNode();

      expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
      expect($node.prop('tagName')).toEqual('DIV');
      expect($node.attr('class')).toEqual('company');
      expect($node.find('a').length).toEqual(1);
      expect(TestimonialSlide.prototype.createLinkNode).toHaveBeenCalledWith(url, name);
    });
  });

  it('should create div with class name', function() {
    var className = 'test';
    var $div = TestimonialSlide.prototype.createDivWithClass(className);

    expect($div.prop('tagName')).toEqual('DIV');
    expect($div.attr('class')).toEqual(className);
  });

  it('should create link node', function() {
    var text = 'text';
    var href = 'example.com';
    var $res = TestimonialSlide.prototype.createLinkNode(href, text);

    expect($res.prop('tagName')).toEqual('A');
    expect($res.text()).toEqual(text);
    expect($res.attr('href')).toEqual(href);
    expect($res.attr('target')).toEqual('_blank');
  });

  it('should get dom node', function() {
    var expected = $('<div />');
    TestimonialSlide.prototype.$domNode = expected;
    var $domNode = TestimonialSlide.prototype.getDomNode();

    expect($domNode.prop('tagName')).toEqual('DIV');
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

  it('should create img author foto', function() {
    var avatar = 'example.com/image.jpg';
    TestimonialSlide.prototype.data = {
      author: {
        avatar: avatar
      }
    };

    var $node = TestimonialSlide.prototype.createImgAuthorFoto();

    expect($node.prop('tagName')).toEqual('IMG');
    expect($node.attr('src')).toEqual(avatar);
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

  it('should createContentNode', function() {
    /* global createDivWithClassStub: false */
    spyOn(TestimonialSlide.prototype, 'createDivWithClass').and.callFake(createDivWithClassStub);
    spyOn(TestimonialSlide.prototype, 'createMainNode');
    spyOn(TestimonialSlide.prototype, 'createAvatarNode');

    TestimonialSlide.prototype.createContentNode();

    expect(TestimonialSlide.prototype.createDivWithClass).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.createMainNode).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.createAvatarNode).toHaveBeenCalled();
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
});
