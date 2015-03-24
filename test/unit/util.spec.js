'use strict';

describe('Util', function() {
  it('should extend', function() {
    var defaultOptions = defaultTestimonialOptions();
    var timeout = 5;
    var options = {
      timeout: timeout
    };

    var outOptions = Util.extend(defaultOptions, options);

    expect(outOptions.timeout).toEqual(timeout);
    expect(defaultOptions.slideCount).toEqual(defaultOptions.slideCount);
  });

  it('should extend does not work in both directions', function() {
    var defaultOptions = defaultTestimonialOptions();
    var options = {
      timeout: 5
    };

    var outOptions = Util.extend(options, defaultOptions);

    expect(outOptions.timeout).toEqual(defaultOptions.timeout);
    expect(defaultOptions.slideCount).toEqual(defaultOptions.slideCount);
  });

  it('should extend bad args', function() {
    Object.prototype.bar = 'bar';

    var obj = {};
    var outOptions = Util.extend('', null, obj);

    expect(outOptions).toEqual({});
    delete Object.prototype.bar;
  });
});
