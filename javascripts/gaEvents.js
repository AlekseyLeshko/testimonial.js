function createGAEvents() {
  githubRibbon();
  nextButtons();
  clickExampleLink();
  clickExampleButtons();
}

function githubRibbon() {
  var ribbonEl = document.getElementById('githubRibbon');
  ribbonEl.addEventListener('click', function() {
    gaWrapper('send', 'event', 'Crossing', 'ClickOnForkMe');
  });
}

function nextButtons() {
  var actionFirstPart = 'ClickOnNextButton_';

  var el = document.getElementsByClassName('next_slide')[0];
  el.addEventListener('click', function() {
    var name = el.parentNode.getAttribute('id');
    var action = actionFirstPart + name;
    gaWrapper('send', 'event', 'Clicking', action);
  });
}

function clickExampleLink() {
  var actionFirstPart = 'ClickExampleLink_';

  var el = document.getElementsByClassName('click-example-link')[0];
  el.addEventListener('click', function() {
    var name = el.getAttribute('href').slice(1);
    var action = actionFirstPart + name;
    gaWrapper('send', 'event', 'Clicking', action);
  });
}

function clickExampleButtons() {
  var actionFirstPart = 'ClickExampleButton_';

  var arr = document.getElementsByClassName('btn');
  for (var i = arr.length - 1; i >= 0; i--) {
    var el = arr[i];
    el.addEventListener('click', function(args) {
      var name = args.toElement.getAttribute('id');
      var action = actionFirstPart + name;
      gaWrapper('send', 'event', 'Clicking', action);
    });
  };
}

function gaWrapper(m, e, t, n) {
  console.log(m, e, t, n);
  ga(m, e, t, n);
}
