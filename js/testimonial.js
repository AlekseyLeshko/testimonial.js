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
  this.createPluginDomTree();
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
  },

  createPluginDomTree: function() {
    for (var i = 0; i < 1; i++) {
      var slide = this.slides[i];

      var $slideNode = $('<div />', { 'class': 'testimonial_slide' });
      $slideNode.append(this.createQuoteNode(slide.quote, slide.fullName, slide.company));
      $slideNode.append(this.createAuthorFotoNode(slide.src));

      this.$container.append($slideNode);
    }
  },

  createAuthorFotoNode: function(src) {
    var $authorFoto = $('<div />', { 'class': 'author_foto', 'src':  src});
    return $authorFoto;
  },

  createQuoteNode: function(quote, fullName, company) {
    var $quoteNode = $('<div />', { 'class': 'quote' });
    var $quotationMark = $('<div />', { 'class': 'quotation_mark' })
    $quoteNode.append($quotationMark);

    var $text = $('<div />', { 'class': 'text'});
    $text.text(quote);
    $quoteNode.append($text)

    var $quotationMarkInverted = $('<div />', { 'class': 'quotation_mark_inverted' })
    $quoteNode.append($quotationMarkInverted);

    return $quoteNode;
  }
};
