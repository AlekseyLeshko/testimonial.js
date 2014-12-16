'use strict';

var TestimonialSlide = function(data) {
  this.data = this.createData(data);

  this.createOptions();
  this.createSlide();
};

TestimonialSlide.prototype = {
  createData: function(data) {
    var emptydata = {
      authorHref: '',
      company: '',
      companyHref: '',
      fotoSrc: '',
      fullName: '',
      quote: ''
    };
    var resultData = $.extend(emptydata, data);
    return resultData;
  },

  createOptions: function() {
    this.options = {
      duration: 750,
      distance: 250,
      cssClass: 'testimonial_slide'
    };
  },

  createSlide: function() {
    this.createStandardDomNode();
    this.$domNode.append(this.createQuoteNode());
    this.$domNode.append(this.createImgAuthorFoto());
  },

  createStandardDomNode: function() {
    this.$domNode = $('<div />', {
      'class': this.options.cssClass
    });
  },

  createQuoteNode: function() {
    var $quoteNode = $('<div />', {
      'class': 'quote'
    });

    $quoteNode.append(this.createQuotationMark());
    $quoteNode.append(this.createTextNode());
    $quoteNode.append(this.createQuotationMarkInverted());
    $quoteNode.append(this.createSignatureNode());
    return $quoteNode;
  },

  createTextNode: function() {
    var $text = $('<div />', {
      'class': 'text'
    });
    $text.text(this.data.quote);
    return $text;
  },

  createQuotationMark: function() {
    var $quotationMark = $('<div />', {
      'class': 'quotation_mark'
    });
    return $quotationMark;
  },

  createQuotationMarkInverted: function() {
    var $quotationMarkInverted = $('<div />', {
      'class': 'quotation_mark_inverted'
    });
    return $quotationMarkInverted;
  },

  createSignatureNode: function() {
    var $signatureNode = $('<div />', {
      'class': 'signature'
    });
    $signatureNode.append(this.createAuthorNode());
    $signatureNode.append(this.createCompanyNode());
    return $signatureNode;
  },

  createAuthorNode: function() {
    var $authorNode = $('<div />', {
      'class': 'author'
    });
    $authorNode.text('- ');
    $authorNode.append(this.createLinkNode(this.data.authorHref, this.data.fullName));
    return $authorNode;
  },

  createCompanyNode: function() {
    var $companyNode = $('<div />', {
      'class': 'company'
    });
    $companyNode.append(this.createLinkNode(this.data.companyHref, this.data.company));
    return $companyNode;
  },

  createLinkNode: function(href, text) {
    var $linkNode = $('<a />', {
      target: '_blank',
      href: href,
      text: text
    });
    return $linkNode;
  },

  createImgAuthorFoto: function() {
    var $authorFoto = $('<img />', {
      'class': 'author_foto',
      'src': this.data.fotoSrc
    });
    return $authorFoto;
  },

  animateHide: function() {
    var self = this;

    this.$domNode.animate({
        'margin-left': '+=' + this.options.distance + 'px',
        opacity: '0'
      },
      this.options.duration,
      function() {
        self.hideSlide();
      }
    );
  },

  animateShow: function() {
    this.$domNode.show().animate({
        'margin-left': '+=' + this.options.distance + 'px',
        opacity: '1'
      },
      this.options.duration * 2);
  },

  hideSlide: function() {
    var css = {
      display: 'none',
      opacity: 0,
      'margin-left': '-' + this.options.distance + 'px'
    };
    this.$domNode.css(css);
  },

  height: function() {
    return this.$domNode.height();
  },

  getDomNode: function() {
    return this.$domNode;
  }
};
