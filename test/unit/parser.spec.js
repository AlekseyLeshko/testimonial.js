'use strict';

describe('Parser', function() {
  it('should create members: nodeList and dataList', function() {
    var arr = [1 , 2, 3];

    var parser = new Parser(arr);

    expect(parser.nodeList.length).toEqual(arr.length);
    expect(parser.dataList.length).toEqual(0);
  });

  it('should parse method return data list', function() {
    spyOn(Parser.prototype, 'parseNode');
    var arr = [1 , 2];
    Parser.prototype.nodeList = arr;
    Parser.prototype.dataList = [];

    var nodes = Parser.prototype.parse();

    expect(nodes.length).toEqual(arr.length);
    expect(Parser.prototype.parseNode.calls.count()).toEqual(arr.length);
  });

  it('should getAttrHrefOrDefault method return #', function() {
    var node = document.createElement('div');

    var href = Parser.prototype.getAttrHrefOrDefault(node);

    expect(href).toEqual('#');
  });

  it('should getAttrHrefOrDefault method return current href', function() {
    var expected = 'href';
    var node = document.createElement('div');
    node.setAttribute('href', expected);

    var href = Parser.prototype.getAttrHrefOrDefault(node);

    expect(href).toEqual(expected);
  });

  describe('with fixtures', function() {
    var fileName = 'main.html';

    beforeEach(function() {
      jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
      loadFixtures(fileName);
    });

    it('should parseNode method return data with quote', function() {
      spyOn(Parser.prototype, 'parseAuthorNode').and.returnValue({});
      spyOn(Parser.prototype, 'parseCompanyNode').and.returnValue({});

      var $list = $('.testimonial_slider .slide');
      var quote = $list.first().children('.quote').text().trim();
      var node = $list[0];

      var data = Parser.prototype.parseNode(node);

      expect(Parser.prototype.parseAuthorNode).toHaveBeenCalled();
      expect(Parser.prototype.parseCompanyNode).toHaveBeenCalled();
      expect(data.author).toEqual({});
      expect(data.company).toEqual({});
      expect(data.quote).toEqual(quote);
    });

    it('should parse author node', function() {
      var url = 'test url';
      spyOn(Parser.prototype, 'getAttrHrefOrDefault').and.returnValue(url);

      var $list = $('.testimonial_slider .slide .author');
      var node = $list[0];

      var author = Parser.prototype.parseAuthorNode(node);

      expect(author.name).toBeTruthy();
      expect(author.url).toBeTruthy();
      expect(author.avatar).toBeTruthy();
    });

    it('should parse company node', function() {
      var url = 'test url';
      spyOn(Parser.prototype, 'getAttrHrefOrDefault').and.returnValue(url);

      var $list = $('.testimonial_slider .slide .company');
      var node = $list[0];

      var company = Parser.prototype.parseCompanyNode(node);

      expect(company.name).toBeTruthy();
      expect(company.url).toBeTruthy();
    });
  });
});
