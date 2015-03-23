'use strict';

var Parser = function(nodeList) {

  var $nodeList = $(nodeList);
  this.$nodeList = $nodeList;
  this.dataList = [];
};

Parser.prototype = {
  parse: function() {
    for (var i = 0; i < this.$nodeList.length; i++) {
      var $node = $(this.$nodeList[i]);
      var data = this.parseNode($node);
      this.dataList.push(data);
    }

    return this.dataList;
  },

  parseNode: function($node) {
    var data = {};

    var $authorNode = $node.children('.author');
    data.author = this.parseAuthorNode($authorNode);

    var $companyNode = $node.children('.company');
    data.company = this.parseCompanyNode($companyNode);

    data.quote = $node.children('.quote').text().trim();
    return data;
  },

  parseAuthorNode: function($node) {
    var $nameNode = $node.children('a');
    var name = $nameNode.text().trim();
    var url = this.getAttrHrefOrDefault($nameNode);
    var avatar = $node.children('.avatar').attr('src');

    var author = {
      name: name,
      url: url,
      avatar: avatar
    };

    return author;
  },

  parseCompanyNode: function($node) {
    var $companyNode = $node.children('a');
    var name = $companyNode.text().trim();
    var url = this.getAttrHrefOrDefault($companyNode);

    var company = {
      name: name,
      url: url
    };

    return company;
  },

  getAttrHrefOrDefault: function($node) {
    var href = $node.attr('href');
    if (href === undefined) {
      href = '#';
    }
    return href;
  },
};
