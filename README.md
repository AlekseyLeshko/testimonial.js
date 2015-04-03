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
> JS testimonial slider with AJAX!

[Site with examples](http://alekseyleshko.github.io/testimonial.js/)

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
#### Slider simple use
```js
var testimonial = new Testimonial('#testimonial-slider');
```

#### Slider with custom options
```js
var options = {
    width: 645,
    timeout: 7000,
    autostart: true,
    slideCount: 3
};
var testimonial = new Testimonial('#testimonial-slider', options);
```

#### Slider API
```js
var slideObj = {...};
var testimonial = new Testimonial('#testimonial-slider');
testimonial.stop();
testimonial.start();
testimonial.next();
testimonial.add(slideObj);
```

#### Slider with ajax slide load
```js
function getSlide() {
  var slide = getRandomSlide();
  return slide;
};
var options = {
    width: 645,
    timeout: 7000,
    autostart: true,
    slideCount: 3,
    getSlide: getSlide
};

var testimonial = new Testimonial('#testimonial-slider', options);
```

## [Examples](http://alekseyleshko.github.io/testimonial.js/)

## Structure of the slide
* author
  * name
  * url
  * avatar(url)
* company
  * name
  * url
* quote

## Options
- __width__, type: Number, default: 700
- __slideCount__, type: Number, default: 3
- __timeout__, type: Number, default: 7000
- __autostart__, type: Boolean, default: true
- __getSlide__, type: Function, default: undefined

## Build project
```
make
```

## License
Copyright (c) 2014 Aleksey Leshko Licensed under the The MIT License (MIT)
