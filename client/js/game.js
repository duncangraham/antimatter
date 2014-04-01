// if ( Meteor.isClient ) {
//     Votes = new Meteor.Collection("votes");
// }


//==================================================================
//
//  Session Variables
//
//==================================================================
// dbReady          = will be false as long as the database has not been
//                    loaded. The Template.game.tally() function uses its
//                    reactivity to set this variable as true when the db
//                    is ready to be used
// maxPoints        = the total number of points that are allowed to be on
//                    the graph.
// numPoints        = the number of points in the graph that the
//                    addPoint() function has plotted.  Used to make
//                    sure addPoint() doesn't keep running till infinity
//                    continuing to plot points
Session.set('inc', -1);
Session.set( "dbReady", false );
Session.set( "maxPoints", 5 );
Session.set( "numPoints", 0 );
Session.set( "graphPoints", [] );
// Session.set( "upId", Votes.findOne({voteType: 'up'})._id );
// Session.set( "downId", Votes.findOne({voteType: 'down'})._id );


//==================================================================
//
//  Functions to be called when page is rendered
//
//==================================================================
Template.game.rendered = function() {


  var middleVid = $('.middle');
  var ml = middleVid.height()/2;

  middleVid.css('margin-top', -ml);


  var foil = window.innerWidth*.75;
  var vh = window.innerHeight*.5;
  var inc = -1;

      // var trajectory = Math.floor(Math.random() * 6)-3;

      // console.log(trajectory);

      // if( trajectory == 2 || trajectory == 1 ) {
      //   var inc = 1;
      // } else if( trajectory == -3 || trajectory == -2 ) {
      //   var inc = -1;
      // } else {
      //   var inc = 0;
      // }

}

//==================================================================
//
//  Template helper functions
//
//==================================================================
Template.game.tally = function() {
  if (Votes.findOne() !== undefined ){
    Session.set("dbReady", true);

    return getVoteScore();
  } 
}

Template.game.foil = function () {
  return window.innerWidth*.75;
}

Template.game.vh = function () {
  return window.innerHeight*.5;
}


// Template.game.users = function () {
//   return Votes.findOne({voteType: 'up'}).amount + Votes.findOne({voteType: 'down'}).amount;
// }

// Template.game.voteCount = function () {
//   return Votes.findOne({voteType: 'up'}).amount - Votes.findOne({voteType: 'down'}).amount;
// }


// Template.game.preserve(['#preserve']);


//==================================================================
//
//  Template event functions
//
//==================================================================
Template.game.events = {
  'click .video': function() {
    var vidId = event.currentTarget.id;

    //1. pause current vid
    //2. if other vid is playing, pause and play new vid
    //3. if no other vid is playing, play chosen

    if( Session.get('activeVid') == vidId ) {
      document.getElementById(vidId).pause();
    } else if ( Session.get('activeVid') ) {
      document.getElementById(Session.get('activeVid')).pause();
      document.getElementById(vidId).play();
    } else {
      document.getElementById(vidId).play();
    }

    Session.set('activeVid', vidId);

    // document.getElementById(vidId).play();
    // $('#'+vidId).addClass('active');
    // document.getElementById(vidId).play();

  },

  // 'click .add-point': function() {
  //   console.log( Votes.findOne() );
  //   $("ul.graph-data").append(
  //   '<li>' + Votes.findOne({voteType: "up"}).amount + '</li>');
  // },

  'click .run': function() {
    Session.set("numPoints", 0);
    Session.set("graphPoints", []);
    setTimeout(function() { addPoint() }, 50);
    //make the .run button unuseable, the addPoint() function will make it
    //useable again when the voting period is finished
    //TODO: perhaps make the .run useable again only after the video is
    //finished playing
    $(".start-button").removeClass("run").html("voting in progress");

    clearInterval(particleShoot);
    $('#path svg, #impact svg').remove();

    var foil = Template.game.foil();
    var vh = Template.game.vh();
    var inc = Session.get('inc');

    
    var draw = SVG('path').size('100%', '100%'),
        impact = SVG('impact').size('15', '15');
    var x = 0,
        y = 0,
        newPoint;
    var pointArr = [[0,1]];
    var polyline = draw.polyline(pointArr).fill('none').stroke({ width: 1 });
    
    
    var particleShoot = setInterval(function(){
      // console.log(Template.game.voteCount());
      if ( x >= foil ) {
        $('#impact').css({top: y-7.5, left: x-7.5});
        var impactPoint = impact.rect( 15, 15 )
                           .radius( 7.5 )
                           .fill('#F07C86');
        
        $('.active').removeClass('active');
        if ( inc < -1 ) {
          // alert( 'affected by gravity!' )
          document.getElementById("GAME1").play();
          $("#GAME1").addClass('active');

        } else if ( inc > 1 ) {
          // alert( 'defied gravity!' )
          document.getElementById("GAME3").play();
          $("#GAME3").addClass('active');

        } else {
          // alert('neutral')
          document.getElementById("GAME2").play();
          $("#GAME2").addClass('active');

        }

        clearInterval(particleShoot);
        var i = Session.get('inc');
        Session.set('inc', i+1);
      }
      inc = inc*1.006;
      y = inc+vh
      // y = ((Template.game.voteCount()*(-10))+vh);
      newPoint = [x,y];
      pointArr.push(newPoint);
      polyline = polyline.plot(pointArr);

      x = x + 1;
    }, 1);
  }
}


//==================================================================
//
//  Regular functions
//
//==================================================================

//------------------------------------------------------------------------
// getVoteScore()
// ==============
// returns the amount of upvotes - downvotes.  So if there are, for
// example, 5 upvotes and 3 downvotes, getVoteScore() will return 2.
// If there are 3 upvotes and 7 downvotes, getvotescore() will return -4.
//
// If the database is not ready when this is called, getVoteScore() will
// return null
//------------------------------------------------------------------------
function getVoteScore() {
  if (Session.get("dbReady")) {
    var upVotes = Votes.findOne({voteType: "up"}).amount;
    var downVotes = Votes.findOne({voteType: "down"}).amount;
    console.log("upVotes = " + upVotes);
    console.log("downVotes = " + downVotes);
    return upVotes - downVotes;
  } else {
    return null;
  }
}


//------------------------------------------------------------------------
// addPoint()
// ==========
// Appends the current vote score (as would be returned by getVoteScore())
// to the end of the graphPoints() session variable array. Assuming that
// it has not plotted more points than dictated in the maxPoints session
// variable, it will call itself again after 1 second.
// 
// If this function is called while the database is not ready (i.e., the
// dbReady session variable is not set), it will call itself again after
// 50 ms.
//------------------------------------------------------------------------
function addPoint() {
  var numPoints = Session.get("numPoints");
  numPoints++;
  Session.set("numPoints", numPoints);

  if (numPoints <= Session.get("maxPoints")) {
    console.log("Make plot called");
    var intervalPeriod = 50;

    // if the database is ready, add a point to the graphPoints session
    // variable array and then call addPoint() again in 1 second.  
    // ----
    // else, decrement the numPoints variable (because no point was
    // actually plotted) and call addPoint() again in 50ms.
    if (Session.get("dbReady")){
      intervalPeriod = 1000;
      graphPoints = Session.get("graphPoints");
      graphPoints.push( getVoteScore() );
      Session.set("graphPoints", graphPoints);
      console.log(graphPoints);
    } else {
      Session.set("numPoints", numPoints - 1);
      console.log("db not ready");
    }

    setTimeout(function() { addPoint() }, intervalPeriod);
  } else {
    $(".start-button").addClass("run").html("Restart Voting");
  }
}
