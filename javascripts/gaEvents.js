function createGAEvents() {
  githubRibbon();
}

function githubRibbon() {
  $('#githubRibbon').click(function() {
    ga('send', 'event', 'Crossing', 'ClickOnForkMe');
  });
}
