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
  $(selector).bind('input propertychange', function() {
    checkTextarea(selector);
  });
  checkTextarea(selector);
}

function checkTextarea(textareaSelector) {
  var errorClass = 'has-error';
  var $textarea = $(textareaSelector);
  var $addSlideButton = $('input#add_slide_button');

  var data = $textarea.val();
  try {
    slideAddSlide = jsonlint.parse(data);
    if (slideAddSlide) {
      var $container = $textarea.parent().parent();
      $container.removeClass(errorClass);
      $addSlideButton.prop('disabled', false);
    }
  } catch(e) {
    var $container = $textarea.parent().parent();
    $container.addClass(errorClass);
    $addSlideButton.prop('disabled', true);
  }
}

function getQuote() {
  number++;
  var quote = number + ': ' + Math.random().toString(36).substring(7);
  return quote;
}

function slideLoader() {
  var slide = getDefaultSlide();
  var quote = getQuote();
  slide.quote = quote;
  return slide;
}
