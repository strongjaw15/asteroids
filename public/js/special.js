// if asteroidz is typed in comment field redirect to asteroid game.

$(function() {
  var triggerWord = "asteroidz";
  $('#comment-input').keyup(function() {

          if ($(this).val().toLowerCase() == triggerWord) {
            window.location.replace("http://lorenkp.github.io/Asteroids/")
          }

  });
});