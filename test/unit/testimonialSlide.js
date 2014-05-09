module('Testimonial slide tests');
var dataForSlide = {
  authorHref: 'https://github.com/AlekseyLeshko',
  company: 'Company',
  companyHref: 'https://github.com/AlekseyLeshko',
  fotoSrc: 'http://2.gravatar.com/avatar/027ed55733da6f7037335e0af0c46591?s=146',
  fullName: 'Aleksey Leshko',
  quote: 'quote'
};

test('Create slide with correct data', function() {
  var slide = new TestimonialSlide(dataForSlide);
  ok(slide.data === dataForSlide, 'Slide has correct data');
  ok(slide.$slide !== undefined, 'Slide has DOM node');
});

test('Slide css class', function() {
  var slide = new TestimonialSlide(dataForSlide);
  ok(slide.$slide.attr('class') === 'testimonial_slide', 'New slide has correct css class');
});
