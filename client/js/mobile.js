$(function(){
  //make "Constants"
  var UP = 1,
      DOWN = -1,
      NOT_SET = 0;


  // var beginButtonPushed = false

  Session.set("myVote", NOT_SET);
  console.log("Current Vote = " + NOT_SET);


  //Database collections
  //    database has the schema:
  //      voteType:     amount:
  //      "up"          3
  //      "down"        7
  Votes = new Meteor.Collection("votes");


  //Capture device orientation
  if (window.DeviceOrientationEvent) {

    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('deviceorientation', 
                            handleTilting, 
                            false);
  }
  else {
    $(".orientation").html("Sorry, your device doesn't have tilt " +
      "recognition");
  }


  //for now, make the voting binary.  Only up or down
  function handleTilting(eventData){
      var b = eventData.beta,
          voteChoice = document.getElementById('voteChoice');

      // voteChoice.style.webkitTransform = 'translated( 0,' + (b/.45)-100 + '%)'; 
      if (b <= 45 && b >= -45) {
        voteChoice.style.top = (b/.45)-100+ '%'; 
      } else if ( b > 45 ) {
        voteChoice.style.top = 0 + '%'; 
      } else if ( b < -45 ) {
        voteChoice.style.top = '-200%'; 
      }

      if (b>= 0){
        voteUp(); // submit a vote of "up"
      } 
      else {
        voteDown();// submit a vote of "down"
      }
  }


  function voteUp(){
    // If there was no previous vote, make "up"+1
    if (Session.get("myVote") == NOT_SET) {
      dbChangeVotes("up", 1);
      Session.set("myVote", UP);
      outputDebugging();
      return
    }

    // If previous vote was "down", make "up"+1 and "down"-1
    if (Session.get("myVote") == DOWN) {
      Session.set("myVote", UP);
      dbChangeVotes("up", 1);
      dbChangeVotes("down", -1);
      outputDebugging();
    }
  }


  function voteDown(){
    // If there was no previous vote, make "down"+1
    if (Session.get("myVote") == NOT_SET) {
      dbChangeVotes("down", 1);
      Session.set("myVote", DOWN);
      outputDebugging();
      return
    }

    // If previous vote was "up", make "down"+1 and "up"-1
    if (Session.get("myVote") == UP) {
      Session.set("myVote", DOWN);
      dbChangeVotes("down", 1);
      dbChangeVotes("up", -1);
      outputDebugging();
    }
  }


  function dbChangeVotes( direction, changeBy ){
    Votes.update(
      {_id: Votes.findOne({voteType: direction})._id}, 
      {$inc: {amount: changeBy}});
  }


  //Template functions
  Template.mobile.votes = function () {
    return Votes.find();
  };

  
  // Template events
  Template.mobile.events = {
    // 'click .begin-tilting': function() {
    //   $(".instructions").hide();
    //   $(".indicators").show();
    //   beginButtonPushed = true;
    // },

    // 'click .up-indicator': function() {
    //   voteUp();
    //   console.log(Votes.findOne({voteType: "up"}));
    //   console.log(Votes.findOne({voteType: "down"}));
    // },

    // 'click .down-indicator': function() {
    //   voteDown();
    //   console.log(Votes.findOne({voteType: "up"}));
    //   console.log(Votes.findOne({voteType: "down"}));
    // }
  }


  // We aren't going to try to wipe the user's vote when they close the
  // browser anymore.  We're going to make the db wipe
  // when the "game" page is loaded.  We're going to make it unable to
  // access the page without a username and password
  //
  // // remove this user's vote from the DB when they close the mobile page
  // //SCARY WARNING!!! THIS IS UNTESTED AS OF YET.  PROCEED WITH CAUTION!
  // window.onbeforeunload = function() {
  //   if (Session.get("myVote") == DOWN) {
  //     dbChangeVotes( "down", -1 );
  //   }
  //   else if (Session.get("myVote") == UP) {
  //     dbChangeVotes( "up", -1 );
  //   }
  // }
  //

  function outputDebugging() {
    $(".orientation").html(
        "Your vote = " + Session.get("myVote") + 
        " Total: Up = " + Votes.findOne({voteType: "up"}).amount 
        + ", Down = " + Votes.findOne({voteType: "down"}).amount);
  }

});
