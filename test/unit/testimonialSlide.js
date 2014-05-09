module('Testimonial slide tests');
var dataForSlide = {
  authorHref: 'https://github.com/AlekseyLeshko',
  company: 'Company',
  companyHref: 'https://github.com/AlekseyLeshko',
  fotoSrc: 'http://2.gravatar.com/avatar/027ed55733da6f7037335e0af0c46591?s=146',
  fullName: 'Aleksey Leshko',
  quote: 'quote'
};

var emptydata = {
  authorHref: '',
  company: '',
  companyHref: '',
  fotoSrc: '',
  fullName: '',
  quote: ''
};

function compareSlideData(x, y) {
  ok(x.authorHref === y.authorHref, '');
  ok(x.company === y.company, '');
  ok(x.companyHref === y.companyHref, '');
  ok(x.fotoSrc === y.fotoSrc, '');
  ok(x.fullName === y.fullName, '');
  ok(x.quote === y.quote, '');
}

// test('Create slide with correct data', function() {
//   var slide = new TestimonialSlide(dataForSlide);
//   compareSlideData(slide.data, dataForSlide);
//   ok(slide.$slide !== undefined, 'Slide has DOM node');
// });

// test('Create slide with empty data', function() {
//   var slide = new TestimonialSlide();
//   ok(slide.data !== undefined, 'Slide has empty data');
//   ok(slide.$slide !== undefined, 'Slide has DOM node');
// });

// test('Slide css class', function() {
//   var slide = new TestimonialSlide(dataForSlide);
//   ok(slide.$slide.attr('class') === 'testimonial_slide', 'New slide has correct css class');
// });

test('Create slide data of empty data', function() {
  var slideData = TestimonialSlide.prototype.createData();
  ok(slideData !== undefined, 'Slide data not empty');
  compareSlideData(slideData, emptydata);
});

test('Create slide data of correct data', function() {
  var slideData = TestimonialSlide.prototype.createData(dataForSlide);
  compareSlideData(slideData, dataForSlide);
});

test('Create options', function() {
  TestimonialSlide.prototype.createOptions();
  ok(TestimonialSlide.prototype.options.duration === 750, '');
  ok(TestimonialSlide.prototype.options.distance === 250, '');
  ok(TestimonialSlide.prototype.options.cssClass === 'testimonial_slide', '');
});

test('Get DOM node', function() {
  var testId = 'testId';
  var domNode = $('<div />', { id: testId });
  TestimonialSlide.prototype.$domNode = domNode;
  var $expectedDomNode = TestimonialSlide.prototype.getDomNode();
  ok($expectedDomNode.attr('id') === testId , '');
});

test('Create empty dom node', function() {
  var expectedCssClass = 'testimonial_slide';
  TestimonialSlide.prototype.createOptions();
  TestimonialSlide.prototype.createStandardDomNode();
  var cssClass = TestimonialSlide.prototype.$domNode.attr('class');
  ok(cssClass === expectedCssClass, '');
  ok(cssClass === TestimonialSlide.prototype.options.cssClass, '');
});

test('Height dom node', function() {
  var height = 2014;
  var $domNode = $('<div />', { height: height });
  TestimonialSlide.prototype.$domNode = $domNode;
  ok(TestimonialSlide.prototype.height() === height, '');
});

test('Hide slide', function() {
  TestimonialSlide.prototype.createOptions();
  TestimonialSlide.prototype.createStandardDomNode();
  TestimonialSlide.prototype.hideSlide();
  var $domNode = TestimonialSlide.prototype.$domNode;
  var distanceVal = '-' + TestimonialSlide.prototype.options.distance + 'px';
  ok($domNode.css('display') === 'none', '');
  ok($domNode.css('opacity') === '0', '');
  ok($domNode.css('margin-left') === distanceVal, '');
});

asyncTest('Animate show', function () {
  TestimonialSlide.prototype.createOptions();
  var duration = (TestimonialSlide.prototype.options.duration * 2) + 50;
  TestimonialSlide.prototype.createStandardDomNode();
  TestimonialSlide.prototype.hideSlide();

  TestimonialSlide.prototype.animateShow();
  setTimeout(function () {
    var $domNode = TestimonialSlide.prototype.$domNode;
    ok($domNode.css('display') === '', 'Slide is show');
    ok(parseInt($domNode.css('opacity')) === 1, 'Slide opacity is not 0');
    ok($domNode.css('margin-left') === '0px', 'Slide margin-left is 0');

    start();
  }, duration);
});
