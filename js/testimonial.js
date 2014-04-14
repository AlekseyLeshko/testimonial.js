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
    for (var i = 0; i < this.slides.length; i++) {
      var slide = this.slides[i];

      var $slideNode = $('<div />', { 'class': 'testimonial_slide' });
      $slideNode.append(this.createQuoteNode(slide));
      $slideNode.append(this.createAuthorFotoNode(slide));

      this.$container.append($slideNode);
    }
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
