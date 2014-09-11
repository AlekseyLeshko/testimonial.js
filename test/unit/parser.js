QUnit.module('Tests for the parser plugin', {
  setup: function() {
    // var path = '';
    // if (typeof window.__karma__ !== 'undefined') {
    //   path += 'base/'
    // }
    var fixtures  = jasmine.getFixtures();
    fixtures.fixturesPath = 'base/test/fixtures/';
    fixtures.load('main.html');
    // jasmine.getFixtures().fixturesPath = path + 'test/fixtures';
    // var f = jasmine.getFixtures();
    // f.fixturesPath = 'base/test/fixtures';
    // f.load('main.html');
  },
  teardown: function() {
    var f = jasmine.getFixtures();
    f.cleanUp();
    f.clearCache();
  }
});

test('Get attr href', function() {
  var $arr = $('.slide');
  console.log($arr);
  // given relative path test/fixtures/ to karma
  // fixtures.fixturesPath = 'base/test/fixtures/';
  // fixtures.load('main.html');
  // var f = loadFixtures('main.html');
  // console.log(fixtures);

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
  compareSlideObj(slideObj, expectedSlideObj);
});

test('Parse node', function() {
  var quote = 'Истинный путь идет по канату, который натянут не высоко, а над самой землей. ' +
    'Он предназначен, кажется, больше для того, чтобы о него спотыкаться, ' +
    'чем для того, чтобы идти по нему.';
  var $node = $('.slide').first();
  Parser.prototype.dataArr = [];
  Parser.prototype.parseNode($node);
  ok(Parser.prototype.dataArr.length === 1, 'Slide parsed correctly');

  var slideObj = Parser.prototype.dataArr[0];
  compareSlideObj(slideObj, expectedSlideObj);
  ok(slideObj.quote === quote, 'Quote is correct');
});

test('Parser constructor', function() {
  var $nodeArr = $('.slide');
  var parser = new Parser($nodeArr);

  ok(parser.dataArr.length === 0);
  ok(parser.$nodeArr === $nodeArr);
});

test('Parse node array', function() {
  var $nodeArr = $('.slide');
  var parser = new Parser($nodeArr);

  ok(parser.dataArr.length === 0);
  parser.parse();
  ok(parser.dataArr.length === 3);
});

var expectedSlideObj = {
  fullName: 'Кафка Франц',
  authorHref: 'https://github.com/AlekseyLeshko',
  company: 'Company',
  companyHref: 'https://github.com',
  fotoSrc: '../resources/img/author_logo.png'
};

function compareSlideObj(x, y) {
  ok(x.fullName === y.fullName, 'Fullname is correct');
  ok(x.authorHref === y.authorHref, 'Author url is correct');
  ok(x.company === y.company, 'Company is correct');
  ok(x.companyHref === y.companyHref, 'Company url is correct');
  ok(x.fotoSrc === y.fotoSrc, 'Foto src is correct');
};
