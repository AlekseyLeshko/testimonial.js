Testimonial = function($container, options) {
  this.$container = $container;
  this.pluginOptions = {};

  this.$slides = [];
  this.dataArr = [];
  this.currentSlideIndex = 0;

  this.initPlugin(options);
};

Testimonial.prototype = {
  initPlugin: function(options) {
    this.createOptions(options);
    this.parseDomTree();
    this.createSlides();
    this.createInfrastructure();
    this.slideRendering();
    this.resizePluginContainer();

    if (this.pluginOptions.autostart) {
      this.start();
    }
  },

  start: function() {
    this.timerId = setInterval(function() {
        testimonial.next();
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

    var currentSlide = this.$slides[this.currentSlideIndex];
    this.indexing();
    var nextSlide = this.$slides[this.currentSlideIndex];

    currentSlide.animateHide();
    nextSlide.animateShow();
    this.resizePluginContainer();

    this.start();
  },

  createOptions: function(options) {
    var defaultOptions = this.getDefaultOptions();
    this.pluginOptions = $.extend(defaultOptions, options);
  },

  getDefaultOptions: function() {
    var defaultOptions = {
      timeout: 7000,
      autostart: true
    };
    return defaultOptions;
  },

  slideRendering: function() {
    for (var i = 0; i < this.$slides.length; i++) {
      var $slide = this.$slides[i];
      if (i !== 0) {
        $slide.hideSlide();
      }
      this.$slidesWrapper.append($slide.getNode());
    }
  },

  parseDomTree: function() {
    var $nodeArr = this.$container.children();
    $nodeArr.remove();

    var parser = new Parser($nodeArr);
    this.dataArr = parser.parse();
  },

  createSlides: function() {
    for (var i = 0; i < this.dataArr.length; i++) {
      var data = this.dataArr[i];
      var $slide = new TestimonialSlide(data);
      this.$slides.push($slide);
    }
  },

  createInfrastructure: function() {
    this.$slidesWrapper = $('<div />', {
      'class': 'main_container'
    });
    this.$container.append(this.$slidesWrapper);
    this.createButtonNext();
  },

  createButtonNext: function() {
    var $buttonNext = $('<div />', {
      'class': 'next_slide'
    });
    $buttonNext.click(function() {
      testimonial.next();
    });
    this.$container.append($buttonNext);
  },

  resizePluginContainer: function() {
    var indents = 20;
    var slideHeight = this.$slides[this.currentSlideIndex].height();

    this.$container.height(slideHeight + indents);
  },

  indexing: function() {
    this.currentSlideIndex++;
    if (this.currentSlideIndex === this.$slides.length) {
      this.currentSlideIndex = 0;
    }
  }
};

Parser = function($nodeArr) {
  this.$nodeArr = $nodeArr;
  this.dataArr = [];
};

Parser.prototype = {
  parse: function() {
    for (var i = 0; i < this.$nodeArr.length; i++) {
      var $node = $(this.$nodeArr[i]);
      this.parseNode($node);
    }

    return this.dataArr;
  },

  parseNode: function($node) {
    var data = this.parseAuthorNode($node.children('.author'));
    data.quote = $node.children('.quote').text().trim();
    this.dataArr.push(data);
  },

  parseAuthorNode: function($authorNode) {
    var $fullNameNode = $authorNode.children('.full_name');
    var $companyNode = $authorNode.children('.company');
    var slide = {
      fullName: $fullNameNode.text().trim(),
      authorHref: this.getAttrHrefOrDefault($fullNameNode.children('a')),
      company: $companyNode.text().trim(),
      companyHref: this.getAttrHrefOrDefault($companyNode.children('a')),
      fotoSrc: $authorNode.children('.foto').attr('src')
    };
    return slide;
  },

  getAttrHrefOrDefault: function($node) {
    var href = $node.attr('href');
    if (href === undefined) {
      href = '#';
    }
    return href;
  },
};


TestimonialSlide = function(data) {
  this.data = data;
  this.$slide = $('<div />', {
    'class': 'testimonial_slide'
  });

  this.createOptions();
  this.createSlide();
};

TestimonialSlide.prototype = {
  createOptions: function() {
    this.options = {
      duration: 750,
      distance: 250
    };
  },

  createSlide: function() {
    this.$slide.append(this.createQuoteNode());
    this.$slide.append(this.createAuthorFotoNode());
  },

  createQuoteNode: function() {
    var $quoteNode = $('<div />', {
      'class': 'quote'
    });

    $quoteNode.append(this.createQuotationMark());
    $quoteNode.append(this.createTextNode());
    $quoteNode.append(this.createQuotationMarkInverted());
    $quoteNode.append(this.createSignatureNode());
    return $quoteNode;
  },

  createTextNode: function() {
    var $text = $('<div />', {
      'class': 'text'
    });
    $text.text(this.data.quote);
    return $text;
  },

  createQuotationMark: function() {
    var $quotationMark = $('<div />', {
      'class': 'quotation_mark'
    });
    return $quotationMark;
  },

  createQuotationMarkInverted: function() {
    var $quotationMarkInverted = $('<div />', {
      'class': 'quotation_mark_inverted'
    });
    return $quotationMarkInverted;
  },

  createSignatureNode: function() {
    var $signatureNode = $('<div />', {
      'class': 'signature'
    });
    $signatureNode.append(this.createAuthorNode());
    $signatureNode.append(this.createCompanyNode());
    return $signatureNode;
  },

  createAuthorNode: function() {
    var $authorNode = $('<div />', {
      'class': 'author'
    });
    $authorNode.text('- ');
    $authorNode.append(this.createLinkNode(this.data.authorHref, this.data.fullName));
    return $authorNode;
  },

  createCompanyNode: function() {
    var $companyNode = $('<div />', {
      'class': 'company'
    });
    $companyNode.append(this.createLinkNode(this.data.companyHref, this.data.company));
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

  createAuthorFotoNode: function() {
    var $authorFoto = $('<img />', {
      'class': 'author_foto',
      'src': this.data.fotoSrc
    });
    return $authorFoto;
  },

  animateHide: function() {
    var self = this;

    this.$slide.animate({
        "margin-left": "+=" + this.options.distance + "px",
        opacity: "0"
      },
      this.options.duration,
      function() {
        self.hideSlide();
      }
    );
  },

  animateShow: function() {
    this.$slide.show().animate({
        "margin-left": "+=" + this.options.distance + "px",
        opacity: "1"
      },
      this.options.duration * 2);
  },

  hideSlide: function() {
    /*jshint multistr: true */
    var styleVal = 'display: none; opacity: 0; \
      margin-left: -' + this.options.distance + 'px';
    this.$slide.attr('style', styleVal);
  },

  height: function() {
    return this.$slide.height();
  },

  getNode: function() {
    return this.$slide;
  }
};
