# [Testimonial.js](http://alekseyleshko.github.io/testimonial.js/)
[![Build Status](https://travis-ci.org/AlekseyLeshko/testimonial.js.svg?branch=master)](https://travis-ci.org/AlekseyLeshko/testimonial.js)
[![Coverage Status](https://coveralls.io/repos/AlekseyLeshko/testimonial.js/badge.png?branch=master)](https://coveralls.io/r/AlekseyLeshko/testimonial.js?branch=master)
[![Code Climate](https://codeclimate.com/github/AlekseyLeshko/testimonial.js.png)](https://codeclimate.com/github/AlekseyLeshko/testimonial.js)
[![Dependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js)
[![devDependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js/dev-status.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js#info=devDependencies)
[![NPM](https://nodei.co/npm/testimonial.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/testimonial/)
<iframe src="//benschwarz.github.io/bower-badges/embed.html?pkgname=testimonial" width="160" height="32" allowtransparency="true" frameborder="0" scrolling="0"></iframe>
[![NPM version](https://badge.fury.io/js/testimonial.svg)](http://badge.fury.io/js/testimonial)
[![Bower version](https://badge.fury.io/bo/testimonial.svg)](http://badge.fury.io/bo/testimonial)
[![GitHub version](https://badge.fury.io/gh/AlekseyLeshko%2Ftestimonial.js.svg)](http://badge.fury.io/gh/AlekseyLeshko%2Ftestimonial.js)
> This plugin that will help show all testimonial letters about your business!

## Install 
#### with [bower](http://bower.io/)
```
bower install testimonial --save-dev
```

#### with [npm](https://www.npmjs.org/)
```
npm i -D testimonial
```

## Usage
```js
var $container = $('.testimonial_slider');
var testimonial = new Testimonial($container);
```
or with options
```js
var $container = $('.testimonial_slider');
var options = { ... };
var testimonial = new Testimonial($container, options);
```
[Example](https://github.com/AlekseyLeshko/testimonial.js/blob/master/examples/index.html)

## Config Options
- __timeout__, type: Number, default: 700
- __auto__, type: Boolean, default: true

## Build project
```
make
```

## Examples
[Examples](https://github.com/AlekseyLeshko/testimonial.js/tree/master/examples)

## Release History
v0.1.4 Add plugin in bower
v0.1.3 Update info about plugin
v0.1.2 Update info about plugin
v0.1.1 Add dist folder
v0.1.0 Initial release

## License
Copyright (c) 2014 Aleksey Leshko Licensed under the The MIT License (MIT)

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-51119524-2', 'auto');
  ga('send', 'pageview');

</script>
