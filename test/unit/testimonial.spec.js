'use strict';

describe('Testimonial', function() {

  beforeEach(function() {
  });

  it('should indexing return 2', function() {
    Testimonial.prototype.$slides = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 1;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(2);
  });

  it('should indexing return 0', function() {
    Testimonial.prototype.$slides = [];

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should indexing zeroed currentSlideIndex', function() {
    Testimonial.prototype.$slides = [1, 2 , 3];
    Testimonial.prototype.currentSlideIndex = 2;

    Testimonial.prototype.indexing();

    var res = Testimonial.prototype.currentSlideIndex;
    expect(res).toEqual(0);
  });

  it('should getDefaultOptions', function() {
    var options = Testimonial.prototype.getDefaultOptions();

    expect(options.timeout).toEqual(7000);
    expect(options.autostart).toBeTruthy();
  });
});
