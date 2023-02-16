$(function() {
  var triggerWord = "asteroidz";
  $('#comment-input').keyup(function() {
      for (var i = 0; i < triggerWord.length; i++) {
          if ($(this).val().toLowerCase() == triggerWord) {
            window.location.replace("http://lorenkp.github.io/Asteroids/")
          }
      }
  });
});