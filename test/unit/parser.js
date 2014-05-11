module('Tests for the parser plugin');
test('Get attr href', function() {
  var url = 'https://github.com/AlekseyLeshko/testimonial.js';
  var $node = $('<a />', {
    href: url
  });
  var href = Parser.prototype.getAttrHrefOrDefault($node);
  ok(href === url, 'Received href is correct');
});

test('Get default href', function() {
  var defaultHref = '#';
  var $node = $('<a />');
  var href = Parser.prototype.getAttrHrefOrDefault($node);
  ok(href === defaultHref, 'Received href is correct');
});
