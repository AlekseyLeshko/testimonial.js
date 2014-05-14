module('Testimonial tests');
var defaultOptions = {
  timeout: 7000,
  autostart: true
};

test('Testimonial constructor', function() {
  var $container = $('#qunit-fixture .testimonial_slider').first();
  var testimonial = new Testimonial($container);
  testimonial.stop();

  ok(testimonial.$container === $container, 'Plugin container ok');
  ok(testimonial.pluginOptions.timeout == defaultOptions.timeout, 'Plugin default timeout option ok');
  ok(testimonial.pluginOptions.autostart == defaultOptions.autostart, 'Plugin default autostart option ok');
  ok(testimonial.$slides.length == 3, 'Count slides ok');
  ok(testimonial.dataArr.length == 3);
  ok(testimonial.currentSlideIndex == 0, 'Current index ok');
});

test('Autostart', function() {
  var $container = $('#qunit-fixture .testimonial_slider').first();
  var testimonial = new Testimonial($container);

  ok(testimonial.timerId !== undefined, 'Autostart works');
  testimonial.stop();
});

asyncTest('Start', function() {
  var options = {
    timeout: 100,
    autostart: false
  };
  var $container = $('#qunit-fixture .testimonial_slider').first();
  var testimonial = new Testimonial($container, options);
  var delay = options.timeout;
  var duration = options.timeout + delay;

  ok(testimonial.timerId === undefined);
  ok(testimonial.currentSlideIndex === 0);
  testimonial.start();
  setTimeout(function() {
    ok(testimonial.timerId !== undefined);
    ok(testimonial.currentSlideIndex === 1);

    testimonial.stop();
    start();
  }, duration);
});

test('Stop', function() {
  var $container = $('#qunit-fixture .testimonial_slider').first();
  var testimonial = new Testimonial($container);

  ok(testimonial.timerId !== undefined);
  testimonial.stop();
  ok(testimonial.timerId === undefined);
});

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

test('Slide rendering', function() {
  var $container = $('#qunit-fixture .testimonial_slider').first();
  Testimonial.prototype.$container = $container;
  Testimonial.prototype.$slides = [];
  Testimonial.prototype.parseDomTree();
  Testimonial.prototype.createSlides();
  Testimonial.prototype.createInfrastructure();
  Testimonial.prototype.slideRendering();

  var distanceVal = '-250px';
  var $slideArr = Testimonial.prototype.$slidesWrapper.children();
  ok($slideArr.first().attr('class') === 'testimonial_slide');

  ok($slideArr.first().css('display') === 'block', 'Slide is show');
  ok(parseInt($slideArr.first().css('opacity')) === 1, 'Slide opacity is not 0');
  ok($slideArr.first().css('margin-left') === '0px', 'Slide margin-left is 0');

  ok($slideArr.last().css('display') === 'none', 'Slidedisplay is none');
  ok($slideArr.last().css('opacity') === '0', 'Slide opacity is 0');
  ok($slideArr.last().css('margin-left') === distanceVal, 'Slide margin-left is ' + distanceVal);

  ok($($slideArr[1]).css('display') === 'none', 'Slidedisplay is none');
  ok($($slideArr[1]).css('opacity') === '0', 'Slide opacity is 0');
  ok($($slideArr[1]).css('margin-left') === distanceVal, 'Slide margin-left is ' + distanceVal);
});
