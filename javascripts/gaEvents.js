function createGAEvents() {
  githubRibbon();
  nextButtons();
  clickExampleLink();
}

function githubRibbon() {
  $('#githubRibbon').click(function() {
    ga('send', 'event', 'Crossing', 'ClickOnForkMe');
  });
}

function nextButtons() {
  var actionFirstPart = 'ClickOnNextButton_';

  $(document).on('click', '.next_slide', function() {
    var name = $(this).parent().attr('id');
    var action = actionFirstPart + name;
    ga('send', 'event', 'Clicking', action);
  });
}

function clickExampleLink() {
  var actionFirstPart = 'ClickExampleLink_';

  $(document).on('click', '.click-example-link', function() {
    var name = $(this).attr('href').slice(1);
    var action = actionFirstPart + name;
    ga('send', 'event', 'Clicking', action);
  });
}
