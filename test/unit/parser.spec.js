'use strict';

describe('Parser', function() {
  var arr = [1 , 2, 3];
  var parser;

  beforeEach(function() {
    parser = new Parser(arr);
  });

  it('should create members: nodeArr and dataArr', function() {
    expect(parser.$nodeArr.length).toEqual(arr.length);
    expect(parser.dataArr.length).toEqual(0);
  });

  it('should return data arr', function() {
    spyOn(parser, 'parseNode');

    var nodes = parser.parse();

    expect(nodes.length).toEqual(arr.length);
    expect(parser.parseNode.calls.count()).toEqual(arr.length);
  });

  it('should return #', function() {
    var node = $('<div />');

    var href = parser.getAttrHrefOrDefault(node);

    expect(href).toEqual('#');
  });

  it('should return current href', function() {
    var expected = 'href';
    var node = $('<div />', {
      href: expected
    });

    var href = parser.getAttrHrefOrDefault(node);

    expect(href).toEqual(expected);
  });

  describe('with fixtures', function() {
    var fileName = 'main.html';

    beforeEach(function() {
      jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
      loadFixtures(fileName);
    });

    it('should parse node', function() {
      var $arr = $('.testimonial_slider.slide');
      var $node = $arr.first();

      spyOn(parser, 'parseAuthorNode').and.returnValue({});

      var expected = {
        quote: ''
      };

      var data = parser.parseNode($node);

      expect(data).toEqual(expected);
      expect(parser.parseAuthorNode).toHaveBeenCalled();
    });

    it('should parse author node', function() {
      var $arr = $('.testimonial_slider.slide.author');
      var $authorNode = $arr.first();

      var expected = {
        fullName: '',
        authorHref: '#',
        company: '',
        companyHref: '#',
        fotoSrc: undefined
      };

      var data = parser.parseAuthorNode($authorNode);

      expect(data).toEqual(expected);
    });
  });
});
