'use strict';

var Testimonial = function($container, options) {
  this.$container = $container;
  this.createOptions(options);

  this.initPlugin();
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

  initPlugin: function() {
    this.$slideList = [];
    this.dataList = [];
    this.currentSlideIndex = 0;
    this.getSlide = null;

    this.initSlideList();

    if (this.pluginOptions.autostart) {
      this.start();
    }
  }
};
