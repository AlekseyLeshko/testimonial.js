module('Testimonial slide tests');
var dataForSlide = {
  authorHref: 'https://github.com/AlekseyLeshko',
  company: 'Company',
  companyHref: 'https://github.com/AlekseyLeshko',
  fotoSrc: 'http://2.gravatar.com/avatar/027ed55733da6f7037335e0af0c46591?s=146',
  fullName: 'Aleksey Leshko',
  quote: 'quote'
};

var emptydata = {
  authorHref: '',
  company: '',
  companyHref: '',
  fotoSrc: '',
  fullName: '',
  quote: ''
};

function compareSlideData(x, y) {
  ok(x.authorHref === y.authorHref, '');
  ok(x.company === y.company, '');
  ok(x.companyHref === y.companyHref, '');
  ok(x.fotoSrc === y.fotoSrc, '');
  ok(x.fullName === y.fullName, '');
  ok(x.quote === y.quote, '');
}

// test('Create slide with correct data', function() {
//   var slide = new TestimonialSlide(dataForSlide);
//   compareSlideData(slide.data, dataForSlide);
//   ok(slide.$slide !== undefined, 'Slide has DOM node');
// });

// test('Create slide with empty data', function() {
//   var slide = new TestimonialSlide();
//   ok(slide.data !== undefined, 'Slide has empty data');
//   ok(slide.$slide !== undefined, 'Slide has DOM node');
// });

// test('Slide css class', function() {
//   var slide = new TestimonialSlide(dataForSlide);
//   ok(slide.$slide.attr('class') === 'testimonial_slide', 'New slide has correct css class');
// });

test('Create slide data of empty data', function() {
  var slideData = TestimonialSlide.prototype.createData();
  ok(slideData !== undefined, 'Slide data not empty');
  compareSlideData(slideData, emptydata);
});

test('Create slide data of correct data', function() {
  var slideData = TestimonialSlide.prototype.createData(dataForSlide);
  compareSlideData(slideData, dataForSlide);
});

test('Create options', function() {
  TestimonialSlide.prototype.createOptions();
  ok(TestimonialSlide.prototype.options.duration === 750, '');
  ok(TestimonialSlide.prototype.options.distance === 250, '');
  ok(TestimonialSlide.prototype.options.cssClass === 'testimonial_slide', '');
});

test('Get DOM node', function() {
  var testId = 'testId';
  var domNode = $('<div />', {
    id: testId
  });
  TestimonialSlide.prototype.$domNode = domNode;
  var $expectedDomNode = TestimonialSlide.prototype.getDomNode();
  ok($expectedDomNode.attr('id') === testId, '');
});

test('Create empty dom node', function() {
  var expectedCssClass = 'testimonial_slide';
  TestimonialSlide.prototype.createOptions();
  TestimonialSlide.prototype.createStandardDomNode();
  var cssClass = TestimonialSlide.prototype.$domNode.attr('class');
  ok(cssClass === expectedCssClass, '');
  ok(cssClass === TestimonialSlide.prototype.options.cssClass, '');
});

test('Height dom node', function() {
  var height = 2014;
  var $domNode = $('<div />', {
    height: height
  });
  TestimonialSlide.prototype.$domNode = $domNode;
  ok(TestimonialSlide.prototype.height() === height, '');
});

test('Hide slide', function() {
  TestimonialSlide.prototype.createOptions();
  TestimonialSlide.prototype.createStandardDomNode();
  TestimonialSlide.prototype.hideSlide();
  var $domNode = TestimonialSlide.prototype.$domNode;
  var distanceVal = '-' + TestimonialSlide.prototype.options.distance + 'px';
  ok($domNode.css('display') === 'none', '');
  ok($domNode.css('opacity') === '0', '');
  ok($domNode.css('margin-left') === distanceVal, '');
});

asyncTest('Animate show', function() {
  TestimonialSlide.prototype.createOptions();
  var duration = (TestimonialSlide.prototype.options.duration * 2) + 50;
  TestimonialSlide.prototype.createStandardDomNode();
  TestimonialSlide.prototype.hideSlide();

  TestimonialSlide.prototype.animateShow();
  setTimeout(function() {
    var $domNode = TestimonialSlide.prototype.$domNode;
    ok($domNode.css('display') === '', 'Slide is show');
    ok(parseInt($domNode.css('opacity')) === 1, 'Slide opacity is not 0');
    ok($domNode.css('margin-left') === '0px', 'Slide margin-left is 0');

    start();
  }, duration);
});

asyncTest('Animate show', function() {
  TestimonialSlide.prototype.createOptions();
  var duration = TestimonialSlide.prototype.options.duration + 50;
  var distanceVal = '-' + TestimonialSlide.prototype.options.distance + 'px';
  TestimonialSlide.prototype.createStandardDomNode();

  TestimonialSlide.prototype.animateHide();
  setTimeout(function() {
    var $domNode = TestimonialSlide.prototype.$domNode;

    ok($domNode.css('display') === 'none', 'Slidedisplay is none');
    ok($domNode.css('opacity') === '0', 'Slide opacity is 0');
    ok($domNode.css('margin-left') === distanceVal, 'Slide margin-left is ' + distanceVal);
    start();
  }, duration);
});

test('Create dom node with author foto', function() {
  TestimonialSlide.prototype.data = dataForSlide;
  var $img = TestimonialSlide.prototype.createImgAuthorFoto();
  ok($img.prop('nodeName') === 'IMG', 'Dom node is img');
  ok($img.attr('class') === 'author_foto', 'Css class dom node is correct');
  ok($img.attr('src') === dataForSlide.fotoSrc, 'Src dom node is correct');
});

test('Create link node', function() {
  var href = 'http://test.com';
  var text = 'test text';
  var $link = TestimonialSlide.prototype.createLinkNode(href, text);
  ok($link.prop('nodeName') === 'A', 'Dom node is link');
  ok($link.attr('target') === '_blank', 'link target is blank');
  ok($link.attr('href') === href, 'Link href is correct');
  ok($link.text() === text, 'link text is correct');
});

test('Create company node', function() {
  TestimonialSlide.prototype.data = dataForSlide;
  var $node = TestimonialSlide.prototype.createCompanyNode();
  ok($node.prop('nodeName') === 'DIV', 'Company dom node is div');
  ok($node.attr('class') === 'company', 'Css class dom node is correct');

  var $link = $node.children().first();
  ok($link.prop('nodeName') === 'A', 'Present link in company node');
  ok($link.attr('target') === '_blank', 'Link target is blank');
  ok($link.attr('href') === dataForSlide.companyHref, 'Link href is correct');
  ok($link.text() === dataForSlide.company, 'Link text is correct');
});

test('Create author node', function() {
  TestimonialSlide.prototype.data = dataForSlide;
  var $node = TestimonialSlide.prototype.createAuthorNode();
  ok($node.prop('nodeName') === 'DIV', 'Author dom node is div');
  ok($node.attr('class') === 'author', 'Css class dom node is correct');
  ok($node.text() === '- ' + dataForSlide.fullName, 'Text in node is correct');

  var $link = $node.children().first();
  ok($link.prop('nodeName') === 'A', 'Present link in author node');
  ok($link.attr('target') === '_blank', 'Link target is blank');
  ok($link.attr('href') === dataForSlide.authorHref, 'Link href is correct');
  ok($link.text() === dataForSlide.fullName, 'Link text is correct');
});

test('Create signature node', function() {
  TestimonialSlide.prototype.data = dataForSlide;
  var $node = TestimonialSlide.prototype.createSignatureNode();
  ok($node.prop('nodeName') === 'DIV', 'Signature dom node is div');
  ok($node.attr('class') === 'signature', 'Css class dom node is correct');

  var $children = $node.children();
  ok($children.length === 2, '2 nodes in signature node');
  ok($children.first().attr('class') === 'author', 'Css class first child node is correct');
  ok($children.last().attr('class') === 'company', 'Css class last child node is correct');
});

test('Create quotation mark inverted', function() {
  var $node = TestimonialSlide.prototype.createQuotationMarkInverted();
  ok($node.prop('nodeName') === 'DIV', 'Quotation mark inverted dom node is div');
  ok($node.attr('class') === 'quotation_mark_inverted', 'Css class dom node is correct');
});
