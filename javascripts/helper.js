function setJson(obj, id) {
  var data = JSON.stringify(obj, null, '  ');
  $(id).val(data);
}

function getDefaultSlide() {
  var slide = {
    author: {
      name: 'name',
      url: 'url',
      avatar: 'http://2.gravatar.com/avatar/027ed55733da6f7037335e0af0c46591?s=146'
    },
    company: {
      name: 'name',
      url: 'url'
    },
    quote: 'New quote #1.'
  };
  return slide;
}

function textareaForSlide(selector) {
  $(selector).bind('input propertychange', checkTextarea);
  checkTextarea(selector);
}

var slide;
function checkTextarea(textareaSelector) {
  var $textarea = $(textareaSelector);
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
