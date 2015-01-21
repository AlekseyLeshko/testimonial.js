function  runExamples() {
  testimonialMainCreate();
  testimonialSimpleCreate();
  testimonialCustomOptionsCreate();
  testimonialControlButtonsCreate();
  testimonialAddSlideCreate();
  testimonialUpdateUrlCreate();
  testimonialSlideLoaderCreate();
}

var testimonialMain;
function testimonialMainCreate() {
  var selector = '#testimonial_main';
  var $container = $(selector);
  testimonialMain = new Testimonial($container);
}

var testimonialSimple;
function testimonialSimpleCreate() {
  var selector = '#testimonial_simple';
  var $container = $(selector);
  testimonialSimple = new Testimonial($container);
}

var testimonialCustomOptions;
function testimonialCustomOptionsCreate() {
  var options = {
    timeout: 3684,
    autostart: true,
    slideCount: 3
  };
  var selector = '#testimonial_custom_options';
  var $container = $(selector);
  testimonialCustomOptions = new Testimonial($container, options);
}

var testimonialControlButtons;
function testimonialControlButtonsCreate() {
  var selector = '#testimonial_control_buttons';
  var $container = $(selector);
  testimonialControlButtons = new Testimonial($container);
}

var slideAddSlide;
var testimonialAddSlide;
function testimonialAddSlideCreate() {
  var selector = '#testimonial_add_slide';
  var $container = $(selector);
  testimonialAddSlide = new Testimonial($container);
  testimonialAddSlide.pluginOptions.slideCount = 5;

  var selectorAddSlide = 'textarea#json_input';
  slideAddSlide = getDefaultSlide();
  setJson(slideAddSlide, selectorAddSlide);
  textareaForSlide(selectorAddSlide);
}

var testimonialUpdateUrl;
function testimonialUpdateUrlCreate() {
  var updateDataUrl = 'json/slide.json';
  var selector = '#testimonial_update_url';
  var $container = $(selector);
  testimonialUpdateUrl = new Testimonial($container);
  testimonialUpdateUrl.pluginOptions.slideCount = 5;
  testimonialUpdateUrl.updateDataUrl = updateDataUrl;
}

var number = 0;
var testimonialSlideLoader;
function testimonialSlideLoaderCreate() {
  var selector = '#testimonial_slide_loader';
  var $container = $(selector);
  testimonialSlideLoader = new Testimonial($container);
  testimonialSlideLoader.pluginOptions.slideCount = 5;
  testimonialSlideLoader.slideLoader = slideLoader;
}
