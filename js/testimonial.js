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
  },

  removeInitialSlides: function($slides) {
    $slides.each(function() {
      $(this).remove();
    });
  }
};
