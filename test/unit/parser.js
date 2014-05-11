module('Tests for the parser plugin');
test('Get attr href', function() {
  var url = 'https://github.com/AlekseyLeshko/testimonial.js';
  var $node = $('<a />', {
    href: url
  });
  var href = Parser.prototype.getAttrHrefOrDefault($node);
  ok(href === url, 'Received href is correct');
});
