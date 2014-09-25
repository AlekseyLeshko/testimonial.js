# [Testimonial.js](http://alekseyleshko.github.io/testimonial.js/)
[![Build Status](https://travis-ci.org/AlekseyLeshko/testimonial.js.svg?branch=master)](https://travis-ci.org/AlekseyLeshko/testimonial.js)
[![Coverage Status](https://coveralls.io/repos/AlekseyLeshko/testimonial.js/badge.png?branch=master)](https://coveralls.io/r/AlekseyLeshko/testimonial.js?branch=master)
[![Code Climate](https://codeclimate.com/github/AlekseyLeshko/testimonial.js.png)](https://codeclimate.com/github/AlekseyLeshko/testimonial.js)
[![Dependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js)
[![devDependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js/dev-status.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js#info=devDependencies)
> This plugin that will help show all testimonial letters about your business!

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
