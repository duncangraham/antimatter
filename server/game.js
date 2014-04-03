//==================================================================
//
//  Global Variables
//
//==================================================================
//                    Note: inside the database, the server's current
//                    color is saved inside the 
//                    {tag: "database is ready", color: (RED | BLUE)} 
//                    row
//
// RED              = One of the two possible "colors" the server can
//                    have. Every FLIP_INTERVAL ms, the server switches
//                    colors from red to blue (or vice-versa) as a means
//                    of deleting users that have closed their browsers
//                    and are no longer articipating.  When the server
//                    switches colors, it deletes any old users that have
//                    have the color it is about to switch to (since it
//                    means that the users have been around for an entire
//                    interval without updating their color to match the
//                    server's, and are therefore probably no longer
//                    participating).  When the server changes color, the
//                    mobile clients that are active will use the
//                    voteTally function to update their own color to
//                    match that of the server, and thus show that they
//                    are still keeping up with the server's activity.
//
// BLUE             = the other color for the server to be other than red
//
// SERVER_COLOR     = the current color that the server is (either RED, or
//                    BLUE)
// FLIP_INTERVAL    = The number of milliseconds the server will wait
//                    before flipping colors (from RED to BLUE, or
//                    vice-versa). 2000 ms works pretty well without there
//                    being problems.  Smaller values will make sure that
//                    inactive users are kicked out promptly, but also
//                    increases the chance of active users getting kicked
//                    out as well (since they have less time to update
//                    their color values).  Higher values will mean that
//                    users who have quit will stay in the system longer,
//                    but decreases the chance of active users being
//                    deleted
// FIRST_RUN        = Used to mark whether or not it is the first time
//                    that changeColor() is called.  To allow clients time
//                    to set up, nothing will happen the first time that
//                    changeColor() is called.
RED = 1;
BLUE = 0;
SERVER_COLOR = RED;
FLIP_INTERVAL = 2000;
FIRST_RUN = true;

//==================================================================
//
//  The actual code
//
//==================================================================
Meteor.setInterval( function (){ changeColor() }, FLIP_INTERVAL);

function changeColor() {
  if (FIRST_RUN) {
    FIRST_RUN = false;
    return;
  }

  //switch server color
  if (SERVER_COLOR == RED) {
    SERVER_COLOR = BLUE;
  } else {
    SERVER_COLOR = RED
  }

  //remove non-responsive users
  Votes.remove({color: SERVER_COLOR});

  Votes.update({tag: {$exists: true}}, {$set: {color: SERVER_COLOR}});
}
