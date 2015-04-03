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
    var expected = {
      test: 'test'
    };
    spyOn(Util, 'extend').and.returnValue(expected);
    var data = {};

    var res = TestimonialSlide.prototype.createData(data);

    expect(res).toEqual(expected);
    expect(Util.extend).toHaveBeenCalled();
    var args = Util.extend.calls.argsFor(0);
    expect(args[1]).toEqual(data);
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
    var obj1 = {
      x: 1
    };
    var obj2 = {
      x: 2
    };
    var options = {
      test: 'test'
    };
    spyOn(TestimonialSlide.prototype, 'getDefaultOptions').and.returnValue(obj1);
    spyOn(Util, 'extend').and.returnValue(options);


    TestimonialSlide.prototype.createOptions(obj2);

    expect(TestimonialSlide.prototype.getDefaultOptions).toHaveBeenCalled();
    expect(Util.extend).toHaveBeenCalled();
    var args = Util.extend.calls.argsFor(0);
    expect(args[1]).toEqual(obj1);
    expect(args[2]).toEqual(obj2);
    expect(TestimonialSlide.prototype.options).toEqual(options);
  });

  it('should height', function() {
    var expected = 100;
    var $node = $('<div />', {
      height: expected
    });
    var fixture = setFixtures('<div class="post">foo</div>')
    fixture.append($node);
    TestimonialSlide.prototype.node = $node[0];

    var height = TestimonialSlide.prototype.height();

    expect(height).toEqual(expected);
  });

  describe('css classes', function() {
    var node;
    var mainClassName;

    beforeEach(function() {
      node = document.createElement('div');
      mainClassName = 'main-class';
      node.classList.add(mainClassName);

      TestimonialSlide.prototype.node = node;
    });

    it('should add class', function() {
      var className = 'test';

      TestimonialSlide.prototype.addCssClass(className);

      var str = mainClassName + ' ' + className;
      expect(TestimonialSlide.prototype.node.className).toEqual(str);
    });

    it('should remove class', function() {
      var className = 'test';
      node.classList.add(className);

      TestimonialSlide.prototype.removeCssClass(className);

      expect(TestimonialSlide.prototype.node.className).toEqual(mainClassName);
    });
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

      node = document.createElement('div');
      TestimonialSlide.prototype.node = node;
      TestimonialSlide.prototype.options = options;
      TestimonialSlide.prototype.options.duration = 2;
    });

    it('should hide slide', function() {
      TestimonialSlide.prototype.hideSlide();

      expect(TestimonialSlide.prototype.node.style.display).toEqual('none');
    });

    it('should animate show', function(done) {
      var className = 'fadeInLeft';
      spyOn(TestimonialSlide.prototype, 'addCssClass');
      spyOn(TestimonialSlide.prototype, 'removeCssClass');

      TestimonialSlide.prototype.animateShow();

      expect(TestimonialSlide.prototype.node.style['z-index']).toEqual('1');

      setTimeout(function() {
        expect(TestimonialSlide.prototype.addCssClass).toHaveBeenCalledWith(className);
        expect(TestimonialSlide.prototype.node.style.display).toEqual('');

        setTimeout(function() {
          expect(TestimonialSlide.prototype.removeCssClass).toHaveBeenCalledWith(className);

          done();
        }, 1001);
      }, 101);
    });

    it('should animate hide', function(done) {
      var className = 'fadeOutRight';
      spyOn(TestimonialSlide.prototype, 'addCssClass');
      spyOn(TestimonialSlide.prototype, 'removeCssClass');
      spyOn(TestimonialSlide.prototype, 'hideSlide');

      TestimonialSlide.prototype.animateHide();

      expect(TestimonialSlide.prototype.addCssClass).toHaveBeenCalledWith(className);
      setTimeout(function() {
          expect(TestimonialSlide.prototype.removeCssClass).toHaveBeenCalledWith(className);
          expect(TestimonialSlide.prototype.hideSlide).toHaveBeenCalled();
          done();
        }, 1001);
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
    var node = document.createElement('div');
    var parent = document.createElement('div');
    parent.appendChild(node);

    TestimonialSlide.prototype.node = node;

    TestimonialSlide.prototype.remove();

    expect(parent.children.length).toEqual(0);
    expect(TestimonialSlide.prototype.node).toBeUndefined();
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
    TestimonialSlide.prototype.node = $node[0];

    TestimonialSlide.prototype.setHeightForBlockDiv();

    expect($(TestimonialSlide.prototype.node).find('.block').height()).toEqual(height);
  });

  it('should create template', function() {
    expect(TestimonialSlide.prototype.template).toBeUndefined();

    TestimonialSlide.prototype.createTemplate();

    expect(TestimonialSlide.prototype.template).toBeDefined();
  });

  it('should render template', function() {
    var value = 'test';
    TestimonialSlide.prototype.template = ['','','','','','','','',''];
    var width = 680;
    spyOn(TestimonialSlide.prototype, 'getDataForTemplate').and.callFake(function() {
      var data = {
        'main': {
          'width': 520
        },
        'slide': {
          'author': {
            'name': 'C.A. R. Hoare',
            'url': 'http://www.example.com',
            'avatar': './img/C.A. R. Hoare.jpg'},
            'company': {
              'name' :'Example Ltd.',
              'url': 'http://www.example.com'
            },
            'quote': 'There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies',
            'width': width
          }
      };
      return data;
    });

    TestimonialSlide.prototype.renderTemplate();

    expect(TestimonialSlide.prototype.node).toBeDefined();
    expect(TestimonialSlide.prototype.node.style.width).toEqual(width + 'px');
    expect(TestimonialSlide.prototype.template.length).toEqual(16);
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
    spyOn(TestimonialSlide.prototype, 'setHeightForBlockDiv');

    var node = document.createElement('div');
    var id = 'node';
    node.id = id;
    var container = document.createElement('div');
    TestimonialSlide.prototype.node = node;

    TestimonialSlide.prototype.renderTo(container);

    expect(TestimonialSlide.prototype.setHeightForBlockDiv).toHaveBeenCalled();
    expect(container.children.length).toEqual(1);
    var el = container.querySelectorAll('#' + id)[0];
    expect(el).toBeDefined();
    expect(el.id).toEqual(id);
  });
});
