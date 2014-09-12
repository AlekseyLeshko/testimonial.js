'use strict';

describe('fixtures', function() {
  var fileName = 'main.html'

  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
  });

  it('should return fixture', function() {
    loadFixtures(fileName);

    var $arr = $('.testimonial_slider');
    var className = $arr.children().first().attr('class');
    expect(className).toEqual('slide');
  })
});
