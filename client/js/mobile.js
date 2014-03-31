//==================================================================
//
//  Database Schema
//
//==================================================================
//    database has the schema:
//      voteType:     amount:
//      "up"          3
//      "down"        7

//==================================================================
//
//  Constants
//
//==================================================================
//make "Constants"
var UP = 1,
    DOWN = -1,
    NOT_SET = 0;

//==================================================================
//
//  Session Variables
//
//==================================================================
Session.set("myVote", NOT_SET);
Session.set( "dbReady", false ); //Will remain false until the database is loaded
Session.set( "upId", null );
Session.set( "downId", null );
// Session.set( "upId", Votes.findOne({voteType: 'up'})._id );
// Session.set( "downId", Votes.findOne({voteType: 'down'})._id );


//==================================================================
//
//  Functions to be loaded when page is finished rendering
//
//==================================================================
Template.mobile.rendered = function() {
  //TODO: test if tilting actually works or not now that the lock is in
  //place
  if (window.DeviceOrientationEvent) {
    console.log("Tilting is supported on this device");

    // Listen for the event and handle DeviceOrientationEvent object
    window.addEventListener('deviceorientation', 
                            handleTilting, 
                            false);
  }
  else {
    console.log("Sorry, your device doesn't have tilt recognition");
  }

  //for now, make the voting binary.  Only up or down
  function handleTilting(eventData){
    if( Session.get("dbReady") !== false ){
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
  }
}

//==================================================================
//
//  Template helper functions
//
//==================================================================
Template.mobile.helpers({
  votes: function () {
    return Votes.find();
  },

  voteTally: function() {
    if (Votes.findOne() !== undefined ){
      Session.set("dbReady", true);
      var upVotes = Votes.findOne({voteType: "up"}).amount;
      var downVotes = Votes.findOne({voteType: "down"}).amount;

      return upVotes - downVotes;
    }
  },

  myVote: function () {
    var vote = Session.get('myVote');
    if (vote === UP){
      return "up";
    } else if (vote === DOWN) {
      return "down";
    } else if (vote === NOT_SET) {
      return "undecided";
    }
  }
});


//==================================================================
//
//  Template events
//
//==================================================================
Template.mobile.events = {
  'click #vote-up': function(e) {
    voteUp();
    outputDebugging();
  },

  'click #vote-down': function(e) {
    voteDown();
    outputDebugging();
  }
}


//==================================================================
//
//  Regular functions
//
//==================================================================
function voteUp(){
  var upID = Votes.findOne({voteType: 'up'})._id,
      downID = Votes.findOne({voteType: 'down'})._id

  //debugging output
  var upVotes = Votes.findOne({voteType: "up"}).amount
  var downVotes = Votes.findOne({voteType: "down"}).amount
  console.log("total votes before yours was cast: Upvotes = " + upVotes + ", Downvotes = " + downVotes);

  // If there was no previous vote, make "up"+1
  if (Session.get("myVote") == NOT_SET) {
    console.log("previous vote was NOT_SET")
    dbChangeVotes(upID, 1);
    Session.set("myVote", UP);
  }

  // If previous vote was "down", make "up"+1 and "down"-1
  if (Session.get("myVote") == DOWN) {
    console.log("previous vote was DOWN")
    Session.set("myVote", UP);
    dbChangeVotes(upID, 1);
    dbChangeVotes(downID, -1);
  }

  //debugging output
  upVotes = Votes.findOne({voteType: "up"}).amount
  downVotes = Votes.findOne({voteType: "down"}).amount
  console.log("total votes after yours was cast: Upvotes = " + upVotes + ", Downvotes = " + downVotes);
}


function voteDown(){
  var upID = Votes.findOne({voteType: 'up'})._id,
      downID = Votes.findOne({voteType: 'down'})._id

  //debugging output
  var upVotes = Votes.findOne({voteType: "up"}).amount
  var downVotes = Votes.findOne({voteType: "down"}).amount
  console.log("total votes before yours was cast: Upvotes = " + upVotes + ", Downvotes = " + downVotes);

  // If there was no previous vote, make "down"+1
  if (Session.get("myVote") == NOT_SET) {
    console.log("previous vote was NOT_SET")
    dbChangeVotes(downID, 1);
    Session.set("myVote", DOWN);
    // outputDebugging();
    // return
  }

  // If previous vote was "up", make "down"+1 and "up"-1
  if (Session.get("myVote") == UP) {
    console.log("previous vote was UP")
    Session.set("myVote", DOWN);
    dbChangeVotes(downID, 1);
    dbChangeVotes(upID, -1);
    // outputDebugging();
  }

  //debugging output
  upVotes = Votes.findOne({voteType: "up"}).amount
  downVotes = Votes.findOne({voteType: "down"}).amount
  console.log("total votes after yours was cast: Upvotes = " + upVotes + ", Downvotes = " + downVotes);
}


function dbChangeVotes( direction, changeBy ){
  Votes.update(
    {_id: direction}, 
    {$inc: {amount: changeBy}});
}


//Debugging functions
function outputDebugging() {
  console.log("Your vote = " + Session.get("myVote"));
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

