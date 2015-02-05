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
    var height = this.node.clientHeight;
    // var height = this.$domNode.height();
    return height;
  },

  remove: function() {
    this.$domNode.empty();
    this.$domNode.remove();
  },

  createTemplate: function() {
    this.template = '' +
      // '<div class="testimonial_slide" style="width: {{slide.width}}px;">' +
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
            '<div class="block">' +
              '<div class="author">' +
                '<img src="{{slide.author.avatar}}">' +
              '</div>' +
              '<div class="helper">' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      // '</div>';
  },

  renderTemplate: function() {
    /* global Handlebars: false */
    var template = Handlebars.compile(this.template);
    var data = this.getDataForTemplate();
    var result = template(data);
    this.html = result;
    this.$domNode = $(result);
  },

  getDataForTemplate: function() {
    var data = {
      main: {
        width: this.options.width - 180
      }
    };
    data.slide = this.data;
    data.slide.width = this.options.width - this.options.indents;
    return data;
  },

  renderTo: function($parent, fragment) {
    var div = document.createElement('div');
    var width = this.options.width - this.options.indents;

    div.setAttribute('class', 'testimonial_slide');
    div.style.width = width + "px";

    div.innerHTML = this.html;
    this.node = div;
    fragment.appendChild(div);
    // $parent.append(this.$domNode);
    // this.setHeightForBlockDiv();
  }
};
