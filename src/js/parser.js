'use strict';

var Parser = function($nodeArr) {
  this.$nodeArr = $nodeArr;
  this.dataArr = [];
};

Parser.prototype = {
  parse: function() {
    for (var i = 0; i < this.$nodeArr.length; i++) {
      var $node = $(this.$nodeArr[i]);
      this.parseNode($node);
    }

    return this.dataArr;
  },

  parseNode: function($node) {
    var data = this.parseAuthorNode($node.children('.author'));
    data.quote = $node.children('.quote').text().trim();
    this.dataArr.push(data);
  },

  parseAuthorNode: function($authorNode) {
    var $fullNameNode = $authorNode.children('.full_name');
    var $companyNode = $authorNode.children('.company');
    var slide = {
      fullName: $fullNameNode.text().trim(),
      authorHref: this.getAttrHrefOrDefault($fullNameNode.children('a')),
      company: $companyNode.text().trim(),
      companyHref: this.getAttrHrefOrDefault($companyNode.children('a')),
      fotoSrc: $authorNode.children('.foto').attr('src')
    };
    return slide;
  },

  getAttrHrefOrDefault: function($node) {
    var href = $node.attr('href');
    if (href === undefined) {
      href = '#';
    }
    return href;
  },
};
