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

  this.parseDomTree();
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

  parseDomTree: function() {
    var $slideNodes = this.$container.children();
    $slideNodes.remove();

    this.parseSlideNodes($slideNodes);
  },

  parseSlideNodes: function($slideNodes) {
    for (var i = 0; i < $slideNodes.length; i++) {
      var $slideNode = $($slideNodes[i]);

      var slide = this.parseAuthorNode($slideNode.children('.author'));
      slide.quote = $slideNode.children('.quote').text().trim();
      this.slides.push(slide);
    }
  },

  parseAuthorNode: function($container) {
    var slide = { fullName: $container.children('.full_name').text().trim(),
      company: $container.children('.company').text().trim(),
      fotoSrc: $container.children('.foto').attr('src')
    };
    return slide;
  }
};
