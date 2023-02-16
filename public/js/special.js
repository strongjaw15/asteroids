$(function() {
  var triggerWord = "asteroidz";
  $('#comment-input').keyup(function() {

          if ($(this).val().toLowerCase() == triggerWord) {
            window.location.replace("http://lorenkp.github.io/Asteroids/")
          }

  });
});