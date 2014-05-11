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

test('Parse author node', function() {
  var $node = $('.author').first();
  var slideObj = Parser.prototype.parseAuthorNode($node);
  ok(slideObj.fullName === 'Кафка Франц', 'Fullname is correct');
  ok(slideObj.authorHref === 'https://github.com/AlekseyLeshko', 'Author url is correct');
  ok(slideObj.company === 'Company', 'Company is correct');
  ok(slideObj.companyHref === 'https://github.com', 'Company url is correct');
  ok(slideObj.fotoSrc === '../resources/img/author_logo.png', 'Foto src is correct');
});

test('Parse node', function() {
  var quote = 'Истинный путь идет по канату, который натянут не высоко, а над самой землей. ' +
    'Он предназначен, кажется, больше для того, чтобы о него спотыкаться, ' +
    'чем для того, чтобы идти по нему.';
  var $node = $('.slide').first();
  Parser.prototype.dataArr = [];
  Parser.prototype.parseNode($node);
  ok(Parser.prototype.dataArr.length === 1, 'Ыlide parsed correctly');

  var slideObj = Parser.prototype.dataArr[0];
  ok(slideObj.fullName === 'Кафка Франц', 'Fullname is correct');
  ok(slideObj.authorHref === 'https://github.com/AlekseyLeshko', 'Author url is correct');
  ok(slideObj.company === 'Company', 'Company is correct');
  ok(slideObj.companyHref === 'https://github.com', 'Company url is correct');
  ok(slideObj.fotoSrc === '../resources/img/author_logo.png', 'Foto src is correct');
  ok(slideObj.quote === quote, 'Quote is correct');
});
