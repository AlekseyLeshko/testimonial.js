var testimonialMain;

function createTestimonial() {
  var selector = '#testimonial-main';
  var el = document.getElementById('testimonial-main');
  var options = {
    width: el.parentNode.offsetWidth - (15 * 2),
    slideCount: 10
  };
  testimonialMain = new Testimonial('#testimonial-main', options);

  testimonialMain.add(slideArr[0]);
  testimonialMain.add(slideArr[2]);
  testimonialMain.add(slideArr[4]);
  // testimonialMain.add(slideArr[5]);
  // testimonialMain.add(slideArr[6]);
  // testimonialMain.add(slideArr[7]);
}
