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
      cssClass: 'testimonial_slide',
      indents: 20
    };
    return defaultOptions;
  },

  setHeightForBlockDiv: function() {
    var height = this.$domNode.height();
    this.$domNode.find('.block').height(height);
  },

  createSlide: function() {
    this.createTemplate();
    this.renderTemplate();
  },

  createContentNode: function() {
    var className = 'content';
    var $node = this.createDivWithClass(className);

    $node.append(this.createMainNode());
    $node.append(this.createAvatarNode());
    return $node;
  },

  createMainNode: function() {
    var className = 'main';
    var $node = this.createDivWithClass(className);

    var width = this.options.width - 20 - 160;
    $node.width(width);
    $node.append(this.createQuoteNode());
    $node.append(this.createSignatureNode());

    return $node;
  },

  createAvatarNode: function() {
    var className = 'author';
    var $authorNode = this.createDivWithClass(className);

    className = 'block';
    var $blockNode = this.createDivWithClass(className);

    className = 'avatar';
    var $node = this.createDivWithClass(className);

    className = 'helper';
    var $helperNode = this.createDivWithClass(className);

    $authorNode.append(this.createImgAuthorFoto());
    $blockNode.append($authorNode);
    $blockNode.append($helperNode);
    $node.append($blockNode);

    return $node;
  },

  createStandardDomNode: function() {
    this.$domNode = this.createDivWithClass(this.options.cssClass);
    var width = this.options.width - this.options.indents;
    this.$domNode.width(width);
  },

  createQuoteNode: function() {
    var className = 'quote';
    var $quoteNode = this.createDivWithClass(className);

    $quoteNode.append(this.createTextNode());
    return $quoteNode;
  },

  createTextNode: function() {
    var p = $('<p />');
    p.text(this.data.quote);

    var $text = this.createDivWithClass('text');

    var leftMark = this.createDivWithClass('quotation_mark left');
    var leftImg = $('<img />', {
      src: 'dist/img/quotation_mark.png'
    });
    leftMark.append(leftImg);
    var rightMark = this.createDivWithClass('quotation_mark right');
    var rightImg = $('<img />', {
      src: 'dist/img/quotation_mark_inverted.png'
    });
    rightMark.append(rightImg);

    $text.append(leftMark);
    $text.append(p);
    $text.append(rightMark);

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
  },

  createTemplate: function() {
    this.template = '' +
      '<div class="testimonial_slide" style="width: {{slide.width}}px;">' +
        '<div class="content">' +
          '<div class="main" style="width: {{main.width}}px;">' +
            '<div class="quote">' +
              '<div class="text">' +
                '<div class="quotation_mark left">' +
                  '<img src="dist/img/quotation_mark.png">' +
                '</div>' +
                '<p>{{slide.quote}}</p>' +
                '<div class="quotation_mark right">' +
                  '<img src="dist/img/quotation_mark_inverted.png">' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="signature">' +
              '<div class="author">' +
                '&#x2015;<a target="_blank" href="{{slide.author.url}}">' +
                  '{{slide.author.name}}' +
                '</a>' +
              '</div>' +
              '<div class="company">' +
                '<a target="_blank" href="{{slide.company.url}}">' +
                  '{{slide.company.name}}' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="avatar">' +
            '<div class="block" style="height: {{block.height}}px;">' +
              '<div class="author">' +
                '<img src="{{slide.author.avatar}}">' +
              '</div>' +
              '<div class="helper">' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  },

  renderTemplate: function() {
    /* global Handlebars: false */
    var template = Handlebars.compile(this.template);
    var data = this.getDataForTemplate();
    var result = template(data);
    this.$domNode = $(result);
  },

  getDataForTemplate: function() {
    var data = {
      main: {
        width: this.options.width - 180
      },
      block: {
        height: 154
      }
    };
    data.slide = this.data;
    data.slide.width = this.options.width - this.options.indents;
    return data;
  },

  renderTo: function($parent) {
    $parent.append(this.$domNode);
    this.setHeightForBlockDiv();
  }
};
