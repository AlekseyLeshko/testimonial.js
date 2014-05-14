module('Testimonial tests');
test('Testimonial constructor', function() {
  var $container = $('#qunit-fixture .testimonial_slider').first();
  var timeout = 7000;
  var autostart = true;

  var testimonial = new Testimonial($container);
  ok(testimonial.$container === $container, 'Plugin container ok');
  ok(testimonial.pluginOptions.timeout == timeout, 'Plugin default timeout option ok');
  ok(testimonial.pluginOptions.autostart == autostart, 'Plugin default autostart option ok');

  ok(testimonial.timerId !== undefined, 'Autostart works');
  testimonial.stop();

  ok(testimonial.$slidesWrapper.attr('class') === 'main_container', 'Slides wrapper create');

  ok(testimonial.$slides.length == 3, 'Count slides ok');
  ok(testimonial.currentSlideIndex == 0, 'Current index ok');
});

var defaultOptions = {
  timeout: 7000,
  autostart: true
};

test('Get default options', function() {
  var pluginOptions = Testimonial.prototype.getDefaultOptions();

  ok(pluginOptions.timeout === defaultOptions.timeout);
  ok(pluginOptions.autostart === defaultOptions.autostart);
});

test('Create options with an empty parameter', function() {
  Testimonial.prototype.createOptions();
  var pluginOptions = Testimonial.prototype.pluginOptions;

  ok(pluginOptions.timeout === defaultOptions.timeout);
  ok(pluginOptions.autostart === defaultOptions.autostart);
});

test('Create options with all parameters', function() {
  var options = {
    timeout: 1000,
    autostart: false
  };
  Testimonial.prototype.createOptions(options);
  var pluginOptions = Testimonial.prototype.pluginOptions;

  ok(pluginOptions.timeout === options.timeout);
  ok(pluginOptions.autostart === options.autostart);
});

test('Create options with incomplete parameters', function() {
  var options = {
    autostart: false
  };
  Testimonial.prototype.createOptions(options);
  var pluginOptions = Testimonial.prototype.pluginOptions;

  ok(pluginOptions.timeout === defaultOptions.timeout);
  ok(pluginOptions.autostart === options.autostart);
});

test('Normal indexing', function() {
  Testimonial.prototype.currentSlideIndex = 0;
  Testimonial.prototype.$slides = [1, 2];

  Testimonial.prototype.indexing()

  var index = Testimonial.prototype.currentSlideIndex;
  ok(index === 1);
});

test('Cyclical indexing', function() {
  Testimonial.prototype.currentSlideIndex = 1;
  Testimonial.prototype.$slides = [1, 2];

  Testimonial.prototype.indexing()

  var index = Testimonial.prototype.currentSlideIndex;
  ok(index === 0);
});

test('Indexation empty array', function() {
  Testimonial.prototype.currentSlideIndex = 0;
  Testimonial.prototype.$slides = [];

  Testimonial.prototype.indexing()

  var index = Testimonial.prototype.currentSlideIndex;
  ok(index === 0);
});

test('Resize plugin container', function() {
  Testimonial.prototype.currentSlideIndex = 0;
  Testimonial.prototype.$container = $('<div />');
  var height = 400;
  var indents = 20;
  var testSlide = $('<div />', {
    height: height
  });
  Testimonial.prototype.$slides = [testSlide];
  Testimonial.prototype.resizePluginContainer();

  ok(Testimonial.prototype.$container.height() === height + indents);
});

test('Create button next', function() {
  Testimonial.prototype.$container = $('<div />');
  Testimonial.prototype.createButtonNext();

  var $button = Testimonial.prototype.$container.children().first();
  ok($button.attr('class') === 'next_slide', 'Button has correct css class');
});

test('Create infrastructure', function() {
  Testimonial.prototype.$container = $('<div />');
  Testimonial.prototype.createInfrastructure();

  var $children = Testimonial.prototype.$container.children()
  ok($children.first().attr('class') === 'main_container', 'Container has correct css class');
  ok($children.last().attr('class') === 'next_slide', 'Button next has correct css class');
});

test('Create slides', function() {
  var slideObj = {
    fullName: 'Кафка Франц',
    authorHref: 'https://github.com/AlekseyLeshko',
    company: 'Company',
    companyHref: 'https://github.com',
    fotoSrc: '../resources/img/author_logo.png'
  };

  var dataArr = [];
  dataArr.push(slideObj);
  Testimonial.prototype.dataArr = dataArr;
  Testimonial.prototype.$slides = [];

  Testimonial.prototype.createSlides();
  ok(Testimonial.prototype.$slides.length === 1);
  ok(Testimonial.prototype.$slides[0] instanceof TestimonialSlide);
});

test('Parse dom tree', function() {
  var $container = $('#qunit-fixture .testimonial_slider').first();
  Testimonial.prototype.$container = $container;

  Testimonial.prototype.parseDomTree();
  ok(Testimonial.prototype.dataArr.length === 3);
});
