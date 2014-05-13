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
