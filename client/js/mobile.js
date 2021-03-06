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
//  Global Variables
//
//==================================================================
// UP               = used to mark whether the user has a vote of up or
//                    down
// DOWN             = same as with UP
// NOT_SET          = the session variable myVote will be set to NOT_SET
//                    at page laod to show that the user hasn't yet
//                    submitted a vote
UP = 1;
DOWN = -1;
NOT_SET = 0;

// REGISTERED       = Initially false.  Will be false if the user hasn't
//                    cast a vote yet and thus entered into the Users
//                    collection. Becomes true when the user has been
//                    registered for the very first time after page load
//                    in the Users collection.
// MY_USER_ID       = the ID for this current mobile user.  Set to null at
//                    page load.  When the user first casts a vote, the
//                    system will make a new row in the Users collection.
//                    MY_USER_ID will be set to the database ID (row._id,
//                    in other words). The 'User' column of the User
//                    collection will also be filled in with this id.
REGISTERED = false;
MY_USER_ID = null;

// MY_COLOR         = Used to track whether or not the mobile client has
//                    the same color as the server. See documentation in
//                    server/game.js for more details
// RED              = See documentation in server/game.js
// BLUE             = See documentation in server/game.js
MY_COLOR = undefined;
SERVER_COLOR = undefined;
RED = 1;
BLUE = 0;

//==================================================================
//
//  Session Variables
//
//==================================================================
Session.set("myVote", NOT_SET);
Session.set( "dbReady", false ); //Will remain false until the database is loaded


//==================================================================
//
//  Functions to be loaded when page is finished rendering
//
//==================================================================
Template.mobile.rendered = function() {
  //TODO: test if tilting actually works or not now that the lock is in
  //place
  //TODO: make a voting view for people who do not have tilting supported
  // if (window.DeviceOrientationEvent) {
  //   console.log("Tilting is supported on this device");
  //
  //   // Listen for the event and handle DeviceOrientationEvent object
  //   window.addEventListener('deviceorientation', 
  //                           handleTilting, 
  //                           false);
  // }
  // else {
  //   console.log("Sorry, your device doesn't have tilt recognition");
  // }

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
        vote(UP);
        // voteUp(); // submit a vote of "up"
      } 
      else {
        vote(DOWN);
        // voteDown();// submit a vote of "down"
      }
    }
  }
}

//========================================================================
//
//  Template helper functions
//
//========================================================================
Template.mobile.helpers({
  votes: function () {
    return Votes.find();
  },

//------------------------------------------------------------------------
// voteTally()
// 
// Acts as a watchdog to tell when the server has changed any values. In
// all, it leverages its reactivity as a helper function to:
// 1) Set the dbReady session variable to let other functions know when
//    the database is loaded.
// 2) Register the user if he or she is not already registered
// 3) Update the client's color to match that of the server when the
//    server switches colors (see documentation in server/game.js for info
//    about colors)
//
// voteTally() also outputs the current "score" of the votes (which is
// equal to the number of upvotes minus the number of downvotes)
//------------------------------------------------------------------------
  voteTally: function() {
    if (Votes.findOne() !== undefined ){
      Session.set("dbReady", true);

      SERVER_COLOR = Votes.findOne({tag: {$exists: true}}).color;

      if (!REGISTERED) {
        initialUserRegistration(Session.get("myVote"));
      }

      if (MY_COLOR !== SERVER_COLOR) {
        vote(Session.get("myVote"));
        // Votes.update({_id: MY_USER_ID}, {$set: {color: SERVER_COLOR}});
        MY_COLOR = SERVER_COLOR;
      } 

      var upVotes = Votes.find({vote: UP}).count();
      var downVotes = Votes.find({vote: DOWN}).count();

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
    vote(UP);
  },

  'click #vote-down': function(e) {
    vote(DOWN);
  }
}


//==================================================================
//
//  Regular functions
//
//==================================================================
function getUserVote(userID) {
  //return row that has the user's ID
  return Votes.findOne({user: userID});
}

//------------------------------------------------------------------------
// initialUserRegistration()
//
// Sets REGISTERED to true, inserts the user's vote into the database, and
// sets MY_USER_ID to the inserted row's mongo id
//
// the inserted row will have the following information:
//
//    _id    |   user   |   vote    |     color
// ----------+----------+-----------+---------------
// mongo_id  | mongo_id | voteInput | RED (or BLUE)
//
//------------------------------------------------------------------------
function initialUserRegistration(voteInput) {
  console.log("initialUserRegistration called");
  dbID = Votes.insert({
    user: undefined, 
    vote: voteInput, 
    color: SERVER_COLOR
  });
  Votes.update( {_id: dbID}, {$set: {user: dbID}} );
  REGISTERED = true;
  MY_USER_ID = dbID;
}

//------------------------------------------------------------------------
// vote()
// 
// Registers the passed voteInput in the database as the vote for this
// client. Will return automatically without doing anything if called when
// the database is not ready.
//------------------------------------------------------------------------
function vote(voteInput) {
  //Return automatically if the database isn't ready yet
  if (!Session.get("dbReady")) {
    return;
  }

  //register the user and input vote if the user hasn't registered in the
  //DB yet
  if (!REGISTERED) {
    initialUserRegistration(voteInput);
    Session.set("myVote", voteInput);
    return;
  }

  mySavedVote = getUserVote( MY_USER_ID );

  //If user exists, but the vote was deleted by server, re-insert it
  if (!mySavedVote) {
    Votes.insert({
      user: MY_USER_ID, 
      vote: voteInput, 
      color: SERVER_COLOR
    });
    return;
  }


  //If user and vote exist, update the vote with the user's input
  if (voteInput != Session.get("myVote")) {
    console.log("user and vote exist, updating vote to " + voteInput);
    var dbID = Votes.findOne({user: MY_USER_ID})._id;
    Votes.update( 
        {_id: dbID}, 
        {$set: {
                vote: voteInput, 
                color: SERVER_COLOR
               }
        }
    );
    Session.set("myVote", voteInput);
  }
}
