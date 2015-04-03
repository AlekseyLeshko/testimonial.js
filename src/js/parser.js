'use strict';

var Parser = function(nodeList) {
  this.nodeList = nodeList;
  this.dataList = [];
};

Parser.prototype = {
  parse: function() {
    for (var i = 0; i < this.nodeList.length; i++) {
      var node = this.nodeList[i];
      var data = this.parseNode(node);
      this.dataList.push(data);
    }

    return this.dataList;
  },

  parseNode: function(node) {
    var data = {};

    var authorNode = node.querySelector('.author');
    data.author = this.parseAuthorNode(authorNode);

    var companyNode = node.querySelector('.company');
    data.company = this.parseCompanyNode(companyNode);

    var quote = node.querySelector('.quote');
    var text = quote.innerHTML.trim();
    data.quote = text;
    return data;
  },

  parseAuthorNode: function(node) {
    var nameNode = node.querySelector('a');
    var name = nameNode.innerHTML.trim();
    var url = this.getAttrHrefOrDefault(nameNode);
    var avatarNode = node.querySelector('.avatar');
    var avatar = avatarNode.getAttribute('src');

    var author = {
      name: name,
      url: url,
      avatar: avatar
    };

    return author;
  },

  parseCompanyNode: function(node) {
    var companyNode = node.querySelector('a');
    var name = companyNode.innerHTML.trim();
    var url = this.getAttrHrefOrDefault(companyNode);

    var company = {
      name: name,
      url: url
    };

    return company;
  },

  getAttrHrefOrDefault: function(node) {
    var href = node.getAttribute('href');
    if (!href) {
      href = '#';
    }
    return href;
  },
};
