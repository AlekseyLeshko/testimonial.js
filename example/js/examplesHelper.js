function setJson(obj, id) {
  var data = JSON.stringify(obj, null, '  ');
  $(id).val(data);
}

function getDefaultSlide() {
  var slide = {
    author: {
      name: 'Aleksey Leshko',
      url: 'https://github.com/AlekseyLeshko',
      avatar: 'http://2.gravatar.com/avatar/027ed55733da6f7037335e0af0c46591?s=146'
    },
    company: {
      name: 'GitHub Repo',
      url: 'https://github.com/AlekseyLeshko/testimonial.js'
    },
    quote: 'The plugin is written using js and css. Uses the library jquery. Plugin is run, there are tests and generally very good plugin!'
  };
  return slide;
}

function textareaForSlide() {
  $('textarea#json_input').bind('input propertychange', checkTextarea);
  checkTextarea();
}

var slide;
function checkTextarea() {
  var $textarea = $('textarea#json_input');
  var $addSlideButton = $('input#add_slide_button');

  var data = $textarea.val();
  try {
    slide = jsonlint.parse(data);
    if (slide) {
      $textarea.css('background-color', '');
      $addSlideButton.prop('disabled', false);
    }
  } catch(e) {
    $textarea.css('background-color', '#F00');
    $addSlideButton.prop('disabled', true);
  }
}

function addSlide() {
  testimonial.add(slide);
}

function getQuote() {
  number++;
  var quote = number + ': ' + Math.random().toString(36).substring(7);
  return quote;
}

function slideLoader() {
  var quote = getQuote();
  slide.quote = quote;
  return slide;
}
