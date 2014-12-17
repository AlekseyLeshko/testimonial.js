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
      authorHref: '',
      company: '',
      companyHref: '',
      fotoSrc: '',
      fullName: '',
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
});
