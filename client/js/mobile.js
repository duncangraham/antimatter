$(function(){
  if (window.DeviceOrientationEvent) {
    console.log("Tile recognition found");

    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('deviceorientation', 
                            outputOrientation, 
                            false);
  }
  else {
    $(".orientation").html("Sorry, your device doesn't have tilt " +
      "recognition");
  }


  function outputOrientation(eventData){
    $(".orientation").html(eventData.beta);
  }

  // Template events
  Template.mobile.events = {
    'click .instructions': function() {
      alert("You clicked it now, mofuckah!");
    }
  }
});
