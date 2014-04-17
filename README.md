testimonial.js
==============
[![Code Climate](https://codeclimate.com/github/AlekseyLeshko/testimonial.js.png)](https://codeclimate.com/github/AlekseyLeshko/testimonial.js)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/AlekseyLeshko/testimonial.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

## Usage

Create div element with 'testimonial_slider' class name attr. Fill div slides.
```html
<div class="testimonial_slider">
  <div class="slide">
    <div class="quote">
      Text
    </div>
    <div class="author">
      <div class="full_name">
        <a href="http://example.com/" target="_blank">
          Кафка Франц
        </a>
      </div>
      <div class="company">
        <a href="http://example.com/" target="_blank">
          Company
        </a>
      </div>
      <img class="foto" src="img/author_logo.png">
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
## Config Options
- __timeout__, type: Number, default: 700
- __auto__, type: Boolean, default: true
