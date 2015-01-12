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

    var currentSlide = this.$slideList[this.currentSlideIndex];
    this.indexing();
    var nextSlide = this.$slideList[this.currentSlideIndex];

    currentSlide.animateHide();
    nextSlide.animateShow();
    this.resizePluginContainer();

    this.start();
  },

  add: function(slideObj) {
    /* global TestimonialSlide: false */
    var slide = new TestimonialSlide(slideObj);

    this.$slideList.push(slide);
    this.slideRendering(slide, false);
  },

  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.pluginOptions = $.extend(defaultOptions, options);
  },

  getDefaultOptions: function() {
    var defaultOptions = {
      timeout: 7000,
      autostart: true,
      slideCount: 3
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
      /* global TestimonialSlide: false */
      var $slide = new TestimonialSlide(data);
      this.$slideList.push($slide);
    }
  },

  createInfrastructure: function() {
    this.$slideListWrapper = $('<div />', {
      'class': 'main_container'
    });
    this.$container.append(this.$slideListWrapper);
    this.createButtonNext();
  },

  createButtonNext: function() {
    var $buttonNext = $('<div />', {
      'class': 'next_slide'
    });
    var self = this;
    $buttonNext.click(function() {
      self.next();
    });
    this.$container.append($buttonNext);
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
    if (!isShow) {
      slide.hideSlide();
    }
    var $node = slide.getDomNode();
    this.$slideListWrapper.append($node);
  },

  initSlideList: function() {
    this.parseDomTree();
    this.createSlides();
    this.createInfrastructure();
    this.slideListRendering();
    this.resizePluginContainer();
  },

  initPlugin: function(options) {
    this.$slideList = [];
    this.dataList = [];
    this.currentSlideIndex = 0;

    this.createOptions(options);
    this.initSlideList();

    if (this.pluginOptions.autostart) {
      this.start();
    }
  }
};
