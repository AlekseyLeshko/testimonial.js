/**
  * testimonial - JS testimonial slider with AJAX
  * @version v1.0.4
  * @link http://alekseyleshko.github.io/testimonial.js/
  * @license MIT (https://github.com/AlekseyLeshko/testimonial.js/blob/master/LICENSE)
*/
'use strict';

var Parser = function($nodeList) {
  this.$nodeList = $nodeList;
  this.dataList = [];
};

Parser.prototype = {
  parse: function() {
    for (var i = 0; i < this.$nodeList.length; i++) {
      var $node = $(this.$nodeList[i]);
      var data = this.parseNode($node);
      this.dataList.push(data);
    }

    return this.dataList;
  },

  parseNode: function($node) {
    var data = {};

    var $authorNode = $node.children('.author');
    data.author = this.parseAuthorNode($authorNode);

    var $companyNode = $node.children('.company');
    data.company = this.parseCompanyNode($companyNode);

    data.quote = $node.children('.quote').text().trim();
    return data;
  },

  parseAuthorNode: function($node) {
    var $nameNode = $node.children('a');
    var name = $nameNode.text().trim();
    var url = this.getAttrHrefOrDefault($nameNode);
    var avatar = $node.children('.avatar').attr('src');

    var author = {
      name: name,
      url: url,
      avatar: avatar
    };

    return author;
  },

  parseCompanyNode: function($node) {
    var $companyNode = $node.children('a');
    var name = $companyNode.text().trim();
    var url = this.getAttrHrefOrDefault($companyNode);

    var company = {
      name: name,
      url: url
    };

    return company;
  },

  getAttrHrefOrDefault: function($node) {
    var href = $node.attr('href');
    if (href === undefined) {
      href = '#';
    }
    return href;
  },
};

'use strict';

var Testimonial = function($container, options) {
  this.$container = $container;

  this.initPlugin(options);
};

Testimonial.prototype = {
  start: function() {
    var self = this;
    this.timerId = setInterval(function() {
        self.next();
      },
      this.pluginOptions.timeout);
  },

  stop: function() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  },

  next: function() {
    if (this.timerId !== undefined) {
      this.stop();
    }

    this.cleanSlideList();

    var currentSlide = this.$slideList[this.currentSlideIndex];
    this.indexing();
    var nextSlide = this.$slideList[this.currentSlideIndex];

    currentSlide.animateHide();
    nextSlide.animateShow();
    this.resizePluginContainer();

    if (this.currentSlideIndex <= this.pluginOptions.slideCount - 1) {
      this.loadSlide();
    }

    this.start();
  },

  add: function(slideObj) {
    this.createAndAddSlide(slideObj);

    var slide = this.$slideList[this.$slideList.length - 1];
    this.slideRendering(slide, false);
  },

  loadSlide: function() {
    if (this.getSlide && typeof this.getSlide === 'function') {
      var slide = this.getSlide();
      this.add(slide);
      return;
    }
  },

  cleanSlideList: function() {
    if (this.whetherToRemoveSlide()) {
      var index = 1;
      if (this.currentSlideIndex !== 0) {
        index = 0;
        this.currentSlideIndex--;
      }

      this.removeSlide(index);
    }
  },

  whetherToRemoveSlide: function() {
    var res = this.$slideList.length > this.pluginOptions.slideCount;
    return res;
  },

  removeSlide: function(index) {
    this.$slideList[index].remove();
    var a = this.$slideList.splice(index, 1);
    delete a[0];
  },

  getSlideCount: function() {
    return this.pluginOptions.slideCount;
  },

  setSlideCount: function(value) {
    this.pluginOptions.slideCount = value;

    while (this.whetherToRemoveSlide() === true) {
      this.cleanSlideList();
    }
  },

  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.pluginOptions = $.extend(defaultOptions, options);
    if (this.pluginOptions.width < 400) {
      this.pluginOptions.width = 400;
    }
  },

  getDefaultOptions: function() {
    var defaultOptions = {
      height: 175,
      width: 700,
      slideCount: 3,
      timeout: 7000,
      autostart: true,
      indents: 20,
      minWidth: 400
    };
    return defaultOptions;
  },

  slideListRendering: function() {
    for (var i = 0; i < this.$slideList.length; i++) {
      var slide = this.$slideList[i];
      var isShow = i === this.currentSlideIndex;
      this.slideRendering(slide, isShow);
    }
  },

  parseDomTree: function() {
    var $nodeArr = this.$container.children();
    if ($nodeArr.length <= 0) {
      return;
    }
    $nodeArr.remove();
    /* global Parser: false */
    var parser = new Parser($nodeArr);
    this.dataList = parser.parse();
  },

  createSlides: function() {
    for (var i = 0; i < this.dataList.length; i++) {
      var data = this.dataList[i];
      this.createAndAddSlide(data);
    }
  },

  createAndAddSlide: function(data) {
    var options = {
      width: this.pluginOptions.width
    };
    /* global TestimonialSlide: false */
    var slide = new TestimonialSlide(data, options);
    this.$slideList.push(slide);
  },

  bindEvents: function() {
    var $buttonNext = this.$container.find('.next_slide');
    var self = this;
    $buttonNext.click(function() {
      self.next();
    });
  },

  resizePluginContainer: function() {
    if (this.$slideList.length <= 0) {
      return;
    }
    var indents = 20;
    var slideHeight = this.$slideList[this.currentSlideIndex].height();

    this.$container.height(slideHeight + indents);
  },

  indexing: function() {
    if (this.$slideList.length === 0) {
      this.currentSlideIndex = 0;
      return;
    }

    this.currentSlideIndex++;
    if (this.currentSlideIndex === this.$slideList.length) {
      this.currentSlideIndex = 0;
    }
  },

  slideRendering: function(slide, isShow) {
    var $slideListWrapper = this.$container.find('.main_container');
    slide.renderTo($slideListWrapper);

    if (!isShow) {
      slide.hideSlide();
    }
  },

  configContainer: function() {
    this.$container.height(this.pluginOptions.height);
    this.$container.width(this.pluginOptions.width);
  },

  createTemplate: function() {
    this.template = '' +
      '<div class="main_container" style="width: {{width}}px;"></div>' +
      '<div class="next_slide"></div>';
  },

  renderTemplate: function() {
    /* global Handlebars: false */
    var template = Handlebars.compile(this.template);
    var data = {
      width: this.pluginOptions.width * 2 + 500
    };
    var result = template(data);
    this.$container.html(result);
  },

  initSlideList: function() {
      this.parseDomTree();
      this.configContainer();
      this.createTemplate();
      this.renderTemplate();
      this.bindEvents();
      this.createSlides();
      this.slideListRendering();
      this.resizePluginContainer();
  },

  initPlugin: function(options) {
    this.$slideList = [];
    this.dataList = [];
    this.currentSlideIndex = 0;
    this.getSlide = null;

    this.createOptions(options);
    this.initSlideList();

    if (this.pluginOptions.autostart) {
      this.start();
    }
  }
};

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
