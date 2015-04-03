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
    /* global Util: false */
    var resultData = Util.extend(emptydata, data);
    return resultData;
  },

  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.options = Util.extend({}, defaultOptions, options);
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
    var height = this.node.style.height;
    this.node.querySelectorAll('.block')[0].style.height = height;
  },

  createSlide: function() {
    this.createTemplate();
    this.renderTemplate();
  },

  animateHide: function() {
    var className = 'fadeOutRight';
    this.node.style['z-index'] = 2;
    this.addCssClass(className);

    var self = this;
    setTimeout(function() {
      self.removeCssClass(className);
      self.hideSlide();
    }, 1000);
  },

  animateShow: function() {
    var className = 'fadeInLeft';
    this.node.style['z-index'] = 1;

    var self = this;
    setTimeout(function() {
      self.addCssClass(className);
      self.node.style.display = '';

      setTimeout(function() {
        self.removeCssClass(className);
      }, 1000);
    }, 100);
  },

  hideSlide: function() {
    this.node.style.display = 'none';
  },

  addCssClass: function(className) {
    // http://youmightnotneedjquery.com/#add_class
    this.node.classList.add(className);
  },

  removeCssClass: function(className) {
    // http://youmightnotneedjquery.com/#remove_class
    this.node.classList.remove(className);
  },

  height: function() {
    var height = this.node.offsetHeight;
    return height;
  },

  remove: function() {
    this.node.parentNode.removeChild(this.node);
    delete this.node;
  },

  createTemplate: function() {
    var str = '<div class="quotation_mark right"></div></div><div class="signature"><div class="author">';
    str += '&#x2015;&nbsp;<a target="_blank" href="';

    this.template = [
      '<div class="content"><div class="text" style="width: ',
      'px;"><div class="quote"><div class="quotation_mark left"></div>',
      str,
      '">',
      '</a></div><div class="company"><a target="_blank" href="',
      '">',
      '</a></div></div></div><div class="avatar"><div class="block"><div class="author"><img src="',
      '"></div><div class="helper"></div></div></div></div>'
    ];
  },

  renderTemplate: function() {
    var data = this.getDataForTemplate();
    this.template.splice(1, 0, data.main.width);
    this.template.splice(3, 0, data.slide.quote);
    this.template.splice(5, 0, data.slide.author.url);
    this.template.splice(7, 0, data.slide.author.name);
    this.template.splice(9, 0, data.slide.company.url);
    this.template.splice(11, 0, data.slide.company.name);
    this.template.splice(13, 0, data.slide.author.avatar);
    var html = this.template.join('');

    var node = document.createElement('div');
    node.className = 'testimonial_slide animated';
    node.style.width = data.slide.width +'px';
    node.innerHTML = html;

    this.node = node;
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

  renderTo: function(parent) {
    parent.appendChild(this.node);
    this.setHeightForBlockDiv();
  }
};
