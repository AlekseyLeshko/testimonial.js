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
    var str = '<div class="quotation_mark right"></div></div><div class="signature"><div class="author">';
    str += '&#x2015;&nbsp;<a target="_blank" href="';

    this.template = [
      '<div class="testimonial_slide" style="width: ',
      'px;"><div class="content"><div class="text" style="width: ',
      'px;"><div class="quote"><div class="quotation_mark left"></div>',
      str,
      '">',
      '</a></div><div class="company"><a target="_blank" href="',
      '">',
      '</a></div></div></div><div class="avatar"><div class="block"><div class="author"><img src="',
      '"></div><div class="helper"></div></div></div></div></div>'
    ];
  },

  renderTemplate: function() {
    var data = this.getDataForTemplate();
    this.template.splice(1, 0, data.slide.width);
    this.template.splice(3, 0, data.main.width);
    this.template.splice(5, 0, data.slide.quote);
    this.template.splice(7, 0, data.slide.author.url);
    this.template.splice(9, 0, data.slide.author.name);
    this.template.splice(11, 0, data.slide.company.url);
    this.template.splice(13, 0, data.slide.company.name);
    this.template.splice(15, 0, data.slide.author.avatar);

    var html = this.template.join('');
    this.$domNode = $(html);
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
