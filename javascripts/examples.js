function  runExamples() {
  testimonialMainCreate();
}

var slideMainSlide;
var testimonialMain;
var selectorMainSlide = 'textarea#json_input';
function testimonialMainCreate() {
  var selector = '#testimonial_main';
  var $container = $(selector);
  var options = {
    width: 650,
    slideCount: 10
  };
  testimonialMain = new Testimonial($container, options);

  testimonialMain.add(slideArr[0]);
  testimonialMain.add(slideArr[2]);
  testimonialMain.add(slideArr[4]);
  testimonialMain.add(slideArr[5]);
  testimonialMain.add(slideArr[6]);
  testimonialMain.add(slideArr[7]);
  // for (var i = 0; i < slideArr.length; i++) {
  //   var slide = slideArr[i];
  //   testimonialMain.add(slide);
  // };

  slideMainSlide = getDefaultSlide();
  setJson(slideMainSlide, selectorMainSlide);
  textareaForSlide(selectorMainSlide);
}
