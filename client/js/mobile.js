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
    if (eventData.beta >= 0){
      voteUp(); // submit a vote of "up"
    } 
    else {
      voteDown();// submit a vote of "down"
    }
    $(".orientation").html(eventData.beta);
  }

  function voteUp(){
    //increment the vote counter
  }

  function voteDown(){
    //decrement the vote counter
  }

  // Template events
  Template.mobile.events = {
    'click .instructions': function() {
      $(".instructions").hide();
      $(".indicators").show();
    }
  }
});
