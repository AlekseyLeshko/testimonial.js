/**
 * testimonial.js
 *
 * Aleksey Leshko
 * Copyright 2014, MIT License
 */

Testimonial = function($container) {
  this.settings = {};
  this.slides = [];
  this.currentSlideIndex = 0;
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
    var $slideArr = $('.testimonial_slide');
    $currentSlide = $($slideArr[this.currentSlideIndex]);
    this.indexing();
    $nextSlide = $($slideArr[this.currentSlideIndex]);
    var self = this;

    $currentSlide.animate({ "margin-left": "+=250px", opacity: "0" }, 750, function() {
      self.hideSlide($currentSlide);
    });

    this.showSlide($nextSlide);
  },

  prev: function() {
  },

  indexing: function() {
    this.currentSlideIndex++;
    if (this.currentSlideIndex === this.slides.length) {
      this.currentSlideIndex = 0;
    }
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
    var $fullNameNode = $container.children('.full_name');
    var $companyNode = $container.children('.company');
    var slide = { fullName: $fullNameNode.text().trim(),
      authorHref: this.getAttrHrefOrDefault($fullNameNode.children('a')),
      company: $companyNode.text().trim(),
      companyHref: this.getAttrHrefOrDefault($companyNode.children('a')),
      fotoSrc: $container.children('.foto').attr('src')
    };
    return slide;
  },

  getAttrHrefOrDefault: function($node) {
    var href = $node.attr('href');
    if (href === undefined) {
      href = '#';
    }
    return href;
  },

  createPluginDomTree: function() {
    var $mainContainer = $('<div />', { 'class': 'main_container' });
    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];

      var $slideNode = $('<div />', { 'class': 'testimonial_slide' });
      $slideNode.append(this.createQuoteNode(slide));
      $slideNode.append(this.createAuthorFotoNode(slide));

      if (i !== 0) {
        this.hideSlide($slideNode);
      }
      $mainContainer.append($slideNode);
    }
    this.$container.append($mainContainer);
  },

  hideSlide: function($slide) {
    $slide.attr('style', 'display: none; opacity: 0; margin-left: -250px');
  },

  showSlide: function($slide) {
      $slide.show().animate({ "margin-left": "+=250px", opacity: "1" }, 1500);
  },

  createAuthorFotoNode: function(slide) {
    var $authorFoto = $('<img />', { 'class': 'author_foto', 'src': slide.fotoSrc});
    return $authorFoto;
  },

  createQuoteNode: function(slide) {
    var $quoteNode = $('<div />', { 'class': 'quote' });
    var $quotationMark = $('<div />', { 'class': 'quotation_mark' })
    $quoteNode.append($quotationMark);

    var $text = $('<div />', { 'class': 'text'});
    $text.text(slide.quote);
    $quoteNode.append($text)

    var $quotationMarkInverted = $('<div />', { 'class': 'quotation_mark_inverted' })
    $quoteNode.append($quotationMarkInverted);

    $quoteNode.append(this.createSignatureNode(slide));
    return $quoteNode;
  },

  createSignatureNode: function(slide) {
    var $signatureNode = $('<div />', { 'class': 'signature' });

    var $authorNode = $('<div />', { 'class': 'author' });
    $authorNode.text('- ');
    $authorNode.append(this.createLinkNode(slide.authorHref, slide.fullName));


    var $companyNode = $('<div />', { 'class': 'company' });
    $companyNode.append(this.createLinkNode(slide.companyHref, slide.company));

    $signatureNode.append($authorNode);
    $signatureNode.append($companyNode);
    return $signatureNode;
  },

  createLinkNode: function(href, text) {
    var $linkNode = $('<a />', { target: '_blank',
      href: href,
      text: text
    });
    return $linkNode;
  }
};
