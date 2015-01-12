'use strict';

describe('Parser', function() {
  var arr = [1 , 2, 3];
  var parser;

  beforeEach(function() {
    parser = new Parser(arr);
  });

  it('should create members: nodeList and dataList', function() {
    expect(parser.$nodeList.length).toEqual(arr.length);
    expect(parser.dataList.length).toEqual(0);
  });

  it('should parse method return data list', function() {
    spyOn(parser, 'parseNode');

    var nodes = parser.parse();

    expect(nodes.length).toEqual(arr.length);
    expect(parser.parseNode.calls.count()).toEqual(arr.length);
  });

  it('should getAttrHrefOrDefault method return #', function() {
    var node = $('<div />');

    var href = parser.getAttrHrefOrDefault(node);

    expect(href).toEqual('#');
  });

  it('should getAttrHrefOrDefault method return current href', function() {
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

    it('should parseNode method return data with quote', function() {
      spyOn(parser, 'parseAuthorNode').and.returnValue({});
      spyOn(parser, 'parseCompanyNode').and.returnValue({});

      var $list = $('.testimonial_slider .slide');
      var $node = $list.first();

      var data = parser.parseNode($node);

      expect(data.author).not.toBeUndefined();
      expect(data.company).not.toBeUndefined();
      expect(data.quote).toBeTruthy();
      expect(parser.parseAuthorNode).toHaveBeenCalled();
      expect(parser.parseCompanyNode).toHaveBeenCalled();
    });

    it('should parse author node', function() {
      var $list = $('.testimonial_slider .slide .author');
      var $node = $list.first();

      var author = parser.parseAuthorNode($node);

      expect(author.name).toBeTruthy();
      expect(author.url).toBeTruthy();
      expect(author.avatar).toBeTruthy();
    });

    it('should parse company node', function() {
      var $list = $('.testimonial_slider .slide .company');
      var $node = $list.first();

      var company = parser.parseCompanyNode($node);

      expect(company.name).toBeTruthy();
      expect(company.url).toBeTruthy();
    });
  });
});
