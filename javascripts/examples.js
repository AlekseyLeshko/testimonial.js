function  runExamples() {
  testimonialMainCreate();
}

var testimonialMain;
function testimonialMainCreate() {
  var selector = '#testimonial_main';
  var $container = $(selector);
  testimonialMain = new Testimonial($container);
}
