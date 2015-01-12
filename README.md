# [Testimonial.js](http://alekseyleshko.github.io/testimonial.js/)
[![GitHub version](https://badge.fury.io/gh/AlekseyLeshko%2Ftestimonial.js.svg)](http://badge.fury.io/gh/AlekseyLeshko%2Ftestimonial.js)
[![Build Status](https://travis-ci.org/AlekseyLeshko/testimonial.js.svg?branch=master)](https://travis-ci.org/AlekseyLeshko/testimonial.js)
[![Build Status](https://travis-ci.org/AlekseyLeshko/testimonial.js.svg?branch=develop)](https://travis-ci.org/AlekseyLeshko/testimonial.js)
[![Dependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js)
[![devDependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js/dev-status.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/AlekseyLeshko/testimonial.js.png)](https://codeclimate.com/github/AlekseyLeshko/testimonial.js)
[![Test Coverage](https://codeclimate.com/github/AlekseyLeshko/testimonial.js/badges/coverage.svg)](https://codeclimate.com/github/AlekseyLeshko/testimonial.js)
[![Coverage Status](https://coveralls.io/repos/AlekseyLeshko/testimonial.js/badge.png?branch=master)](https://coveralls.io/r/AlekseyLeshko/testimonial.js?branch=master)
[![NPM version](https://badge.fury.io/js/testimonial.svg)](http://badge.fury.io/js/testimonial)
[![Bower version](https://badge.fury.io/bo/testimonial.svg)](http://badge.fury.io/bo/testimonial)
[![NPM](https://nodei.co/npm/testimonial.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/testimonial/)
[![NPM](https://nodei.co/npm-dl/testimonial.png?months=3&height=3)](https://nodei.co/npm/testimonial/)
<iframe src="//benschwarz.github.io/bower-badges/embed.html?pkgname=testimonial" width="160" height="32" allowtransparency="true" frameborder="0" scrolling="0"></iframe>
> This plugin that will help show all testimonial letters about your business!

## Install 

#### with [npm](https://www.npmjs.org/)
```
npm i -D testimonial
```

#### with [bower](http://bower.io/)
```
bower install testimonial --save-dev
```

## Usage
```js
var $container = $('.testimonial_slider');
var testimonial = new Testimonial($container);
```
or with options
```js
var $container = $('.testimonial_slider');
var options = {
    timeout: 7000,
    autostart: true
};
var testimonial = new Testimonial($container, options);
```

## [Examples](https://github.com/AlekseyLeshko/testimonial.js/tree/master/examples)

## Config Options
- __timeout__, type: Number, default: 700
- __autostart__, type: Boolean, default: true

## Build project
```
make
```

## License
Copyright (c) 2014 Aleksey Leshko Licensed under the The MIT License (MIT)
