'use strict';

var TestimonialSlide = function(data, options) {
  this.data = this.createData(data);

  this.createOptions(options);
  this.createSlide();
};

TestimonialSlide.prototype = {
  createData: function(data) {
    var emptydata = {
      author: {
        name: '',
        url: '',
        avatar: ''
      },
      company: {
        name: '',
        url: ''
      },
      quote: ''
    };
    var resultData = $.extend(emptydata, data);
    return resultData;
  },

  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.options = $.extend({}, defaultOptions, options);
  },

  getDefaultOptions: function() {
    var defaultOptions = {
      width: 700,
      duration: 750,
      distance: 250,
      cssClass: 'testimonial_slide'
    };
    return defaultOptions;
  },

  createSlide: function() {
    this.createStandardDomNode();
    this.$domNode.append(this.createContentNode());
    // this.$domNode.append(this.createQuoteNode());
    // this.$domNode.append(this.createImgAuthorFoto());
  },

  createContentNode: function() {
    var $node = $('<div />', {
      'class': 'content'
    });

    $node.append(this.createMainNode());
    $node.append(this.createAvatarNode());

    return $node;
  },

  createMainNode: function() {
    var $node = $('<div />', {
      'class': 'main'
    });
    return $node;
  },

  createAvatarNode: function() {
    var $authorNode = $('<div />', {
      'class': 'author'
    });

    var $blockNode = $('<div />', {
      'class': 'block'
    });

    var $node = $('<div />', {
      'class': 'avatar'
    });

    $authorNode.append(this.createImgAuthorFoto());
    $blockNode.append($authorNode);
    $node.append($blockNode);

    return $node;
  },

  createStandardDomNode: function() {
    this.$domNode = $('<div />', {
      'class': this.options.cssClass
    });
    var width = this.options.width - 20;
    this.$domNode.width(width);
  },

  createQuoteNode: function() {
    var $quoteNode = $('<div />', {
      'class': 'quote'
    });

    $quoteNode.append(this.createDivWithClass('quotation_mark'));
    $quoteNode.append(this.createTextNode());
    $quoteNode.append(this.createDivWithClass('quotation_mark_inverted'));
    $quoteNode.append(this.createSignatureNode());
    return $quoteNode;
  },

  createTextNode: function() {
    var $text = this.createDivWithClass('text');
    $text.text(this.data.quote);
    return $text;
  },

  createDivWithClass: function(className) {
    var $div = $('<div />', {
      'class': className
    });
    return $div;
  },

  createSignatureNode: function() {
    var $signatureNode = this.createDivWithClass('signature');
    $signatureNode.append(this.createAuthorNode());
    $signatureNode.append(this.createCompanyNode());
    return $signatureNode;
  },

  createAuthorNode: function() {
    var $authorNode = this.createDivWithClass('author');
    $authorNode.text('- ');
    var $link = this.createLinkNode(this.data.author.url, this.data.author.name);
    $authorNode.append($link);
    return $authorNode;
  },

  createCompanyNode: function() {
    var $companyNode = this.createDivWithClass('company');
    var $link = this.createLinkNode(this.data.company.url, this.data.company.name);
    $companyNode.append($link);
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
      'src': this.data.author.avatar
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
  },

  remove: function() {
    this.$domNode.empty();
    this.$domNode.remove();
  }
};
