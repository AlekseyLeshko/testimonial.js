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

// test('Create slide data of empty data', function() {
//   var slideData = TestimonialSlide.prototype.createData();
//   ok(slideData !== undefined, 'Slide data not empty');
//   compareSlideData(slideData, emptydata);
// });

// test('Create slide data of correct data', function() {
//   var slideData = TestimonialSlide.prototype.createData(dataForSlide);
//   compareSlideData(slideData, dataForSlide);
// });

test('Create options', function() {
  var options = TestimonialSlide.prototype.createoptions();
  ok(options.duration === 750, '');
  ok(options.distance === 250, '');
});
