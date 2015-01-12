'use strict';

describe('TestimonialSlide', function() {
  it('should create testimonial slide', function() {
    spyOn(TestimonialSlide.prototype, 'createData').and.returnValue({});
    spyOn(TestimonialSlide.prototype, 'createOptions');
    spyOn(TestimonialSlide.prototype, 'createSlide');

    var testimonialSlide = new TestimonialSlide();

    expect(testimonialSlide.data).toBeDefined();
    expect(testimonialSlide.createData).toHaveBeenCalled();
    expect(testimonialSlide.createOptions).toHaveBeenCalled();
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
    var expected = {
      duration: 750,
      distance: 250,
      cssClass: 'testimonial_slide'
    };

    TestimonialSlide.prototype.createOptions();

    expect(TestimonialSlide.prototype.options).toEqual(expected);
  });

  it('should create standard dom node', function() {
    TestimonialSlide.prototype.createStandardDomNode();

    expect(TestimonialSlide.prototype.$domNode).toBeDefined();
  });

  it('should create quote node', function() {
    spyOn(TestimonialSlide.prototype, 'createQuotationMark');
    spyOn(TestimonialSlide.prototype, 'createTextNode');
    spyOn(TestimonialSlide.prototype, 'createQuotationMarkInverted');
    spyOn(TestimonialSlide.prototype, 'createSignatureNode');

    var $res = TestimonialSlide.prototype.createQuoteNode();

    expect($res.prop('tagName')).toEqual('DIV');
    expect($res.attr('class')).toEqual('quote');
  });

  it('should create text node', function() {
    var quote = 'test';
    TestimonialSlide.prototype.data = {
      quote: quote
    };
    var $res = TestimonialSlide.prototype.createTextNode();

    expect($res.prop('tagName')).toEqual('DIV');
    expect($res.attr('class')).toEqual('text');
    expect($res.text()).toEqual(quote);
  });

  it('should create quotation mark', function() {
    var $res = TestimonialSlide.prototype.createQuotationMark();

    expect($res.prop('tagName')).toEqual('DIV');
    expect($res.attr('class')).toEqual('quotation_mark');
  });

  it('should create quotation mark inverted', function() {
    var $res = TestimonialSlide.prototype.createQuotationMarkInverted();

    expect($res.prop('tagName')).toEqual('DIV');
    expect($res.attr('class')).toEqual('quotation_mark_inverted');
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

  it('should hide slide', function() {
    TestimonialSlide.prototype.createOptions();
    var marginLeft = '-' + TestimonialSlide.prototype.options.distance + 'px';

    var node = $('<div />');
    TestimonialSlide.prototype.$domNode = node;
    TestimonialSlide.prototype.hideSlide();

    var $res = TestimonialSlide.prototype.$domNode;
    expect($res.css('display')).toEqual('none');
    expect($res.css('opacity')).toEqual('0');
    expect($res.css('margin-left')).toEqual(marginLeft);
  });

  it('should animate show', function(done) {
    TestimonialSlide.prototype.createOptions();
    TestimonialSlide.prototype.options.duration = 2;
    var marginLeft = TestimonialSlide.prototype.options.distance + 'px';
    var node = $('<div />');
    TestimonialSlide.prototype.$domNode = node;
    TestimonialSlide.prototype.animateShow();
    var delay = TestimonialSlide.prototype.options.duration * 2 + 10;

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

    TestimonialSlide.prototype.createOptions();
    TestimonialSlide.prototype.options.duration = 2;
    var marginLeft = TestimonialSlide.prototype.options.distance + 'px';
    var node = $('<div />');
    TestimonialSlide.prototype.$domNode = node;
    var delay = TestimonialSlide.prototype.options.duration * 2 + 10;

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


  it('should create img author foto', function() {
    var fotoSrc = 'example.com/image.jpg';
    TestimonialSlide.prototype.data = {
      fotoSrc: fotoSrc
    };

    var $node = TestimonialSlide.prototype.createImgAuthorFoto();

    expect($node.prop('tagName')).toEqual('IMG');
    expect($node.attr('class')).toEqual('author_foto');
    expect($node.attr('src')).toEqual(fotoSrc);
  });

  it('should create slide', function() {
    spyOn(TestimonialSlide.prototype, 'createStandardDomNode');
    spyOn(TestimonialSlide.prototype, 'createQuoteNode').and.returnValue($('<div />'));
    spyOn(TestimonialSlide.prototype, 'createImgAuthorFoto').and.returnValue($('<div />'));

    TestimonialSlide.prototype.createSlide();
    var $node = TestimonialSlide.prototype.$domNode;

    expect($node.children().length).toEqual(2);
    expect(TestimonialSlide.prototype.createStandardDomNode).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.createQuoteNode).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.createImgAuthorFoto).toHaveBeenCalled();
  });

  it('should create company node', function() {
    spyOn(TestimonialSlide.prototype, 'createLinkNode');
    var companyHref = 'example.com';
    var company = 'example';
    TestimonialSlide.prototype.data = {
      companyHref: companyHref,
      company: company
    };

    var $node = TestimonialSlide.prototype.createCompanyNode();

    expect($node.prop('tagName')).toEqual('DIV');
    expect($node.attr('class')).toEqual('company');
    expect(TestimonialSlide.prototype.createLinkNode).toHaveBeenCalledWith(companyHref, company);
  });

  it('should create author node', function() {
    spyOn(TestimonialSlide.prototype, 'createLinkNode');
    var authorHref = 'example.com';
    var fullName = 'example';
    TestimonialSlide.prototype.data = {
      authorHref: authorHref,
      fullName: fullName
    };

    var $node = TestimonialSlide.prototype.createAuthorNode();

    expect($node.prop('tagName')).toEqual('DIV');
    expect($node.attr('class')).toEqual('author');
    expect($node.text()).toEqual('- ');
    expect(TestimonialSlide.prototype.createLinkNode).toHaveBeenCalledWith(authorHref, fullName);
  });

  it('should create signature node', function() {
    spyOn(TestimonialSlide.prototype, 'createAuthorNode');
    spyOn(TestimonialSlide.prototype, 'createCompanyNode');

    var $node = TestimonialSlide.prototype.createSignatureNode();

    expect($node.prop('tagName')).toEqual('DIV');
    expect($node.attr('class')).toEqual('signature');
    expect(TestimonialSlide.prototype.createAuthorNode).toHaveBeenCalled();
    expect(TestimonialSlide.prototype.createCompanyNode).toHaveBeenCalled();
  });
});
