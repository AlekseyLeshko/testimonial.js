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

  animateHide: function() {
    var self = this;

    var marginLeft = '+=' + this.options.distance + 'px';
    var options = {
      'margin-left': marginLeft,
      opacity: '0'
    };

    this.$domNode.animate(options,
      this.options.duration,
      function() {
        self.hideSlide();
      }
    );
  },

  animateShow: function() {
    var marginLeft = '+=' + this.options.distance + 'px';
    var options = {
      'margin-left': marginLeft,
      opacity: '1'
    };

    var duration = this.options.duration * 2;
    this.$domNode.show().animate(options, duration);
  },

  hideSlide: function() {
    var marginLeft = '-' + this.options.distance + 'px';
    var css = {
      display: 'none',
      opacity: 0,
      'margin-left': marginLeft
    };
    this.$domNode.css(css);
  },

  height: function() {
    return this.$domNode.height();
  },

  remove: function() {
    this.$domNode.empty();
    this.$domNode.remove();
  },

  createTemplate: function() {
    this.template = '' +
      '<div class="testimonial_slide" style="width: {{slide.width}}px;">' +
        '<div class="content">' +
          '<div class="text" style="width: {{main.width}}px;">' +
            '<div class="quote">' +
              '<div class="quotation_mark left">' +
              '</div>' +
              '{{slide.quote}}' +
              '<div class="quotation_mark right">' +
              '</div>' +
            '</div>' +
            '<div class="signature">' +
              '<div class="author">' +
                '&#x2015;&nbsp;<a target="_blank" href="{{slide.author.url}}">' +
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
            '<div class="block">' +
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
    var magicNumber = 180;
    var width = this.options.width - magicNumber;
    var data = {
      main: {
        width: width
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
