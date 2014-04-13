/**
 * testimonial.js
 *
 * Aleksey Leshko
 * Copyright 2014, MIT License
 */

Testimonial = function($container) {
  this.settings = {};
  this.slides = [];
  this.currentSlide = 0;
  this.$container = $container;

  this.parseSlides();
};

Testimonial.prototype = {
  start: function() {
  },

  stop: function() {
  },

  next: function() {
  },

  prev: function() {
  },

  parseSlides: function() {
    var $slides = this.$container.children();
    this.removeInitialSlides($slides);

    for (var i = 0; i < $slides.length; i++) {
      var $slide = $($slides[i]);

      var data = this.parseAuthorDiv($slide.children('.author'));
      data.quote = $slide.children('.quote').text().trim();
      this.slides.push(data);
    }
  },

  parseAuthorDiv: function($container) {
    var authorInfo = { fullName: $container.children('.full_name').text().trim(),
      company: $container.children('.company').text().trim(),
      fotoSrc: $container.children('.foto').attr('src')
    };
    return authorInfo;
  },

  removeInitialSlides: function($slides) {
    $slides.each(function() {
      $(this).remove();
    });
  }
};
