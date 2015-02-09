function defaultTestimonialSlideOptions() {
  var options = {
    duration: 750,
    distance: 250,
    cssClass: 'testimonial_slide'
  };

  return options;
}

function defaultTestimonialOptions() {
  var options = {
    height: 175,
    width: 700,
    slideCount: 3,
    timeout: 7000,
    autostart: true,
    indents: 20,
    minWidth: 400
  };
  return options;
}

function createDivWithClassStub(className) {
  var $div = $('<div />', {
    'class': className
  });
  return $div;
}
