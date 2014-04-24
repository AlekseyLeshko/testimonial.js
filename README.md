# Testimonial.js
[![Build Status](https://travis-ci.org/AlekseyLeshko/testimonial.js.svg?branch=master)](https://travis-ci.org/AlekseyLeshko/testimonial.js)
[![Code Climate](https://codeclimate.com/github/AlekseyLeshko/testimonial.js.png)](https://codeclimate.com/github/AlekseyLeshko/testimonial.js)
[![Dependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js)____
[![devDependency Status](https://david-dm.org/AlekseyLeshko/testimonial.js/dev-status.svg?theme=shields.io)](https://david-dm.org/AlekseyLeshko/testimonial.js#info=devDependencies)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/AlekseyLeshko/testimonial.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

# Usage
Create div element with 'testimonial_slider' class name attr. Fill div slides.
```html
<div class="testimonial_slider">
  <div class="slide">
    <div class="quote">
      The plugin is written using js and css. Uses the library jquery. Plugin is run, there are tests and generally very good plugin!
    </div>
    <div class="author">
      <div class="full_name">
        <a href="https://github.com/AlekseyLeshko">
          Aleksey Leshko
        </a>
      </div>
      <div class="company">
        <a href="https://github.com/AlekseyLeshko">
          Company
        </a>
      </div>
      <img class="foto" src="http://2.gravatar.com/avatar/027ed55733da6f7037335e0af0c46591?s=146">
    </div>
  </div>
  <div class="slide">
    ...
  </div>
</div>
```

After create an object plugin
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
# Config Options
- __timeout__, type: Number, default: 700
- __auto__, type: Boolean, default: true

# Examples
### View the examples (in browser):
Use [servedir](https://github.com/remy/servedir)

[Install servedir](https://github.com/remy/servedir#installation)
```shell
$ npm install servedir -g
```
And run
```
$ cd ./testimonial.js
$ servedir ./ 8001
```
Go to links:
- [Plugin example](http://localhost:8001/examples/index.html)
- [Plugin layout](http://localhost:8001/examples/testimonial_layout.html)

# Testing
### To run tests (in browser):
Use [servedir](https://github.com/remy/servedir)

[Install servedir](https://github.com/remy/servedir#installation)
```shell
$ npm install servedir -g
```
And run
```
$ cd ./testimonial.js
$ servedir ./ 8001
```
Go to [link](http://localhost:8001/test/index.html)

# Dependence
* [jQuery](http://jquery.com/), version >= [1.4.0](http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js)

# Author
__Aleksey Leshko__, _[github](https://github.com/AlekseyLeshko), [linkedin](http://ru.linkedin.com/pub/aleksey-leshko/71/780/b69), [![endorse](https://api.coderwall.com/alekseyleshko/endorsecount.png)](https://coderwall.com/alekseyleshko)_

# License
Copyright (c) 2014 Aleksey Leshko Licensed under the The MIT License (MIT)
