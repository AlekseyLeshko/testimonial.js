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
      this.options.timeout);
  },

  stop: function() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  },

  next: function() {
    this.cleanSlideArr();
    this.transitionAnimation();

    if (this.isNeedLoadSlide()) {
      this.loadSlide();
    }

    if (this.isNeedStartSlider()) {
      this.start();
    }
  },

  add: function(slideObj) {
    this.createAndAddSlide(slideObj);
    var slide = this.getLastSlide();
    this.slideRendering(slide);
  },

  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.options = $.extend(defaultOptions, options);
    this.setMinSizePlugin();
  },

  initPlugin: function() {
    this.slideArr = [];
    this.currentSlideIndex = 0;

    this.initSlideArr();

    if (this.options.autostart) {
      this.start();
    }
  },

  getCurrentSlide: function() {
    var slide = this.slideArr[this.currentSlideIndex];
    return slide;
  },

  getNextSlide: function() {
    this.indexing();
    var slide = this.getCurrentSlide();
    return slide;
  },

  getLastSlide: function() {
    var index = this.slideArr.length - 1;
    var slide = this.slideArr[index];
    return slide;
  },

  transitionAnimation: function() {
    var currentSlide = this.getCurrentSlide();
    var nextSlide = this.getNextSlide();

    currentSlide.animateHide();
    nextSlide.animateShow();
    this.resizePluginContainer();
  },

  isNeedLoadSlide: function () {
    var answer = this.currentSlideIndex <= this.options.slideCount - 1;
    return answer;
  },

  isNeedStartSlider: function() {
    var answer = this.timerId === undefined;
    return answer;
  },

  isFunction: function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  },

  loadSlide: function() {
    if (this.isFunction(this.options.getSlide)) {
      var slide = this.options.getSlide();
      this.add(slide);
    }
  },

  setMinSizePlugin: function() {
    if (this.options.width < this.options.minWidth) {
      this.options.width = this.options.minWidth;
    }
  },

  cleanSlideArr: function() {
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
    var res = this.slideArr.length > this.options.slideCount;
    return res;
  },

  removeSlide: function(index) {
    this.slideArr[index].remove();
    var a = this.slideArr.splice(index, 1);
    delete a[0];
  },

  getSlideCount: function() {
    return this.options.slideCount;
  },

  setSlideCount: function(value) {
    this.options.slideCount = value;

    while (this.whetherToRemoveSlide()) {
      this.cleanSlideArr();
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
      minWidth: 400,
      getSlide: undefined
    };
    return defaultOptions;
  },

  slideArrRendering: function() {
    for (var i = 0; i < this.slideArr.length; i++) {
      var slide = this.slideArr[i];
      this.slideRendering(slide);
    }
  },

  parseAndCreateSlide: function() {
    var dataList = this.parseDomTree();
    this.createSlides(dataList);
  },

  parseDomTree: function() {
    var $nodeArr = this.$container.children();
    if ($nodeArr.length <= 0) {
      return;
    }
    $nodeArr.remove();
    /* global Parser: false */
    var parser = new Parser($nodeArr);
    var dataList = parser.parse();
    return dataList;
  },

  createSlides: function(dataList) {
    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      this.createAndAddSlide(data);
    }
  },

  createAndAddSlide: function(data) {
    var options = {
      width: this.options.width
    };
    /* global TestimonialSlide: false */
    var slide = new TestimonialSlide(data, options);
    this.slideArr.push(slide);
  },

  bindEvents: function() {
    var $buttonNext = this.$container.find('.next_slide');
    var self = this;
    $buttonNext.click(function() {
      self.next();
    });
  },

  resizePluginContainer: function() {
    if (this.slideArr.length <= 0) {
      return;
    }
    var height = this.getCurrentSlide().height() + this.options.indents;
    this.$container.height(height);
  },

  indexing: function() {
    this.currentSlideIndex++;
    if (this.currentSlideIndex === this.slideArr.length) {
      this.currentSlideIndex = 0;
    }
  },

  isNeedHideSlide: function(slide) {
    var index = this.slideArr.indexOf(slide);
    var answer = index !== this.currentSlideIndex;
    return answer;
  },

  slideRendering: function(slide) {
    var $slideArrRendering = this.$container.find('.main_container');
    slide.renderTo($slideArrRendering);

    if (this.isNeedHideSlide(slide)) {
      slide.hideSlide();
    }
  },

  configContainer: function() {
    this.$container.height(this.options.height);
    this.$container.width(this.options.width);
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
      width: this.options.width * 2 + 500
    };
    var result = template(data);
    this.$container.html(result);
  },

  initSlideArr: function() {
      this.parseAndCreateSlide();

      this.configContainer();
      this.createTemplate();
      this.renderTemplate();
      this.bindEvents();


      this.slideArrRendering();
      this.resizePluginContainer();
  }
};
