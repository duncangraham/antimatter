$(function(){
  if (window.DeviceOrientationEvent) {
    console.log("Tile recognition found");

    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('deviceorientation', 
                            handleTilting, 
                            false);
  }
  else {
    $(".orientation").html("Sorry, your device doesn't have tilt " +
      "recognition");
  }


  function handleTilting(eventData){
    $(".orientation").html(eventData.beta);
  }

  // Template events
  Template.mobile.events = {
    'click .instructions': function() {
      $(".instructions").hide();
      $(".indicators").show();
    }
  }
});
