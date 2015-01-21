function createGAEvents() {
  githubRibbon();
  nextButtons();
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
