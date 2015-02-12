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
    slideMainSlide = jsonlint.parse(data);
    if (slideMainSlide) {
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

function setRandomSlide() {
  var slide = getRandomSlide();
  slideMainSlide = slide;
  setJson(slide, selectorMainSlide);
}

function getRandomInt(min, max) {
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
}

function getRandomSlide() {
  var min = 0;
  var max = slideArr.length - 1;
  var number = getRandomInt(min, max);
  var slide = slideArr[number];
  return slide;
}

function addSlide() {

}

function getQuote() {
  number++;
  var quote = number + ': ' + Math.random().toString(36);
  return quote;
}

function slideLoader() {
  var slide = getDefaultSlide();
  var quote = getQuote();
  slide.quote = quote;
  return slide;
}

function nextButton() {
  var options = {
    'background-color': '#7a62d3',
    opacity: 0.7
  };
  var $button = $('.next_slide');
  $button.css(options);
  testimonialMain.next();

  options = {
    opacity: 0
  };

  $button.animate(options, 1000, function() {
    $button.removeAttr('style');
  });
}

// function getRandomSlide() {
//   var slide = getDefaultSlide();
//   var quote = 'Random slide: ' + Math.random().toString(36);
//   slide.quote = quote;
//   return slide;
// }

var slideArr = [{
    author: {
      name: 'C.A. R. Hoare',
      url: '',
      avatar: 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Sir_Tony_Hoare_IMG_5125.jpg/220px-Sir_Tony_Hoare_IMG_5125.jpg'
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies. And the other way is to make it so complicated that there are no obvious deficiencies'
  }, {
    author: {
      name: 'Martin Golding',
      url: '',
      avatar: ''
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live'
  }, {
    author: {
      name: 'Linus Torvalds',
      url: '',
      avatar: 'https://lh4.googleusercontent.com/-Y_ESIDYRHpk/AAAAAAAAAAI/AAAAAAAAQtI/4Ztq84zsJuU/photo.jpg'
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program'
  }, {
    author: {
      name: 'Charles Babbage',
      url: '',
      avatar: ''
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'On two occasions I have been asked [by members of Parliament]: "Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out?" I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question'
  }, {
    author: {
      name: 'L. Peter Deutsch',
      url: '',
      avatar: 'http://www.jwpepper.com/images/myscore/MSLD01/profile_902profilejune2006-face.jpg'
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'To iterate is human, to recurse divine'
  }, {
    author: {
      name: 'Seymour Cray',
      url: '',
      avatar: 'https://www.cisl.ucar.edu/dig/cuglog/winter97/images/seymour.gif'
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'The trouble with programmers is that you can never tell what a programmer is doing until it’s too late'
  }, {
    author: {
      name: 'Alan Kay',
      url: '',
      avatar: 'http://www.adeptis.ru/vinci/alan_kay9.jpg'
    },
    company: {
      name: '',
      url: ''
    },
    quote: 'Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves'
  }, {
    author: {
      name: 'Steve Jobs',
      url: 'http://allaboutstevejobs.com/',
      avatar: 'http://www.ispazio.net/wp-content/uploads/2012/12/Steve-Mini.png'
    },
    company: {
      name: 'Apple',
      url: 'http://www.apple.com/'
    },
    quote: 'You can\'t just ask customers what they want and then try to give that to them. By the time you get it built, they\'ll want something new'
  }];
