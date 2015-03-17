/**
  * testimonial - JS testimonial slider with AJAX
  * @version v1.1.3
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
    this.stop();
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
    this.resizePluginContainer();
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
      indents: 25,
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
      return [];
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
    var currentSlide = this.getCurrentSlide();
    var height = currentSlide.height() + this.options.indents;
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
    var $slideArrContainer = this.$container.find('.main_container');
    slide.renderTo($slideArrContainer);

    if (this.isNeedHideSlide(slide)) {
      slide.hideSlide();
    }
  },

  configContainer: function() {
    // this.$container.height(this.options.height);
    this.$container.width(this.options.width);
  },

  createTemplate: function() {
    this.template = [
      '<div class="main_container" style="width: ',
      'px"></div>',
      '<div class="next_slide"></div>'
    ];
  },

  renderTemplate: function() {
    var magicNumber = 500;
    var width = this.options.width * 2 + magicNumber;
    this.template.splice(1, 0, width);
    var html = this.template.join('');
    this.$container.html(html);
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
