var videoPaused = false;

Template.implications.events = {
  //Toggle play/pause with img.play-button
  "click  img.play-button": function() {
    if (videoPaused){
      implicationsVid.play();
      videoPaused = false;
    }
    else {
      implicationsVid.pause()
      videoPaused = true;
    }
  }
}

Template.implications.rendered = function() {
  var implicationsVid = document.getElementById("implicationsVid");

  implicationsVid.play()
}
