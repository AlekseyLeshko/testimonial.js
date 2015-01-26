/**
  * testimonial - JS testimonial slider with AJAX
  * @version v1.0.1
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
    /* global TestimonialSlide: false */
    var slide = new TestimonialSlide(slideObj);

    this.$slideList.push(slide);
    this.slideRendering(slide, false);

    this.removeSlide();
  },

  loadSlide: function() {
    if (this.getSlide && typeof this.getSlide === 'function') {
      var slide = this.getSlide();
      this.add(slide);
      return;
    }
  },

  removeSlide: function() {
    if (this.$slideList.length > this.pluginOptions.slideCount) {
      var index = 1;
      if (this.currentSlideIndex !== 0) {
        index = 0;
        this.currentSlideIndex--;
      }
      this.$slideList[index].$domNode.remove();
      this.$slideList.splice(index, 1);
    }
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
    this.getSlide = null;

    this.createOptions(options);
    this.initSlideList();

    if (this.pluginOptions.autostart) {
      this.start();
    }
  }
};

'use strict';

var TestimonialSlide = function(data) {
  this.data = this.createData(data);

  this.createOptions();
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

  createOptions: function() {
    this.options = {
      duration: 750,
      distance: 250,
      cssClass: 'testimonial_slide'
    };
  },

  createSlide: function() {
    this.createStandardDomNode();
    this.$domNode.append(this.createQuoteNode());
    this.$domNode.append(this.createImgAuthorFoto());
  },

  createStandardDomNode: function() {
    this.$domNode = $('<div />', {
      'class': this.options.cssClass
    });
  },

  createQuoteNode: function() {
    var $quoteNode = $('<div />', {
      'class': 'quote'
    });

    $quoteNode.append(this.createDivWithClass('quotation_mark'));
    $quoteNode.append(this.createTextNode());
    $quoteNode.append(this.createDivWithClass('quotation_mark_inverted'));
    $quoteNode.append(this.createSignatureNode());
    return $quoteNode;
  },

  createTextNode: function() {
    var $text = this.createDivWithClass('text');
    $text.text(this.data.quote);
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
      'class': 'author_foto',
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
  }
};
