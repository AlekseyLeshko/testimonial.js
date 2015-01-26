function defaultTestimonialSlideOptions() {
  var options = {
    duration: 750,
    distance: 250,
    cssClass: 'testimonial_slide'
  };

  return options;
}

function createDivWithClassStub(className) {
  var $div = $('<div />', {
    'class': className
  });
  return $div;
}
