  // Meteor.startup(function () {
  // if (Session.get('data_loaded', true)) {
  //   Template.game.resetVotes();
  // }
  //  }); 


if ( Meteor.isClient ) {
    Votes = new Meteor.Collection("votes");

    // Deps.autorun(function() {
      // Meteor.subscribe('votes');
      // console.log('There are ' + Votes.find().count() + ' posts');

    
      // Template.game.users = function() {
      //     return Votes.findOne({voteType: "up"}).amount + Votes.findOne({voteType: "down"}).amount;
      // }

      // Template.game.voteCount = function() {
      //     return Votes.findOne({voteType: "up"}).amount - Votes.findOne({voteType: "down"}).amount;
      // }
    // }); //END Deps.autorun(function() {
}


Template.game.rendered = function() {


  Session.set( "upId", Votes.findOne({voteType: 'up'})._id );
  Session.set( "downId", Votes.findOne({voteType: 'down'})._id );

  var middleVid = $('.middle');
  var ml = middleVid.height()/2;

  middleVid.css('margin-top', -ml);

  // Template.game.users = function() {
  //   return Votes.findOne({_id: Session.get('upId')}).amount;
  // }

  // Template.game.voteCount = function() {
  //   return Votes.findOne({_id: Session.get('upId')}).amount - Votes.findOne({_id: Session.get('downId')}).amount;
  // }




  // reminder: database has the schema...
  //      voteType:     amount:
  //      "up"          3
  //      "down"        7

  //Call addGraphPoint every second
  // if (document.URL.match(/game/)) {
  //   setInterval( function(){addGraphPoint()}, 1000 )
  // }


  // Meteor.subscribe('votes', function(){
  //   //Set the session var as true to indicate that the data has
  //   //been loaded
  //   Session.set('data_loaded', true); 
  //   var Votes = 
  // });



  // Template.game.resetVotes();



  //
  // addGraphPoint()
  // ===============
  // Takes the current voteCount, puts it in <li> tags, and appends it to
  // ul.graph-data

    
  //
  // resetVotes()
  // ============
  // sets the "amount" of both upvotes and downvotes to 0
  //
  // function resetVotes() {
  //   var voteTypes = ["up", "down"];
  //   for (var i = 0; i < voteTypes.length; i++){
  //     Votes.update(
  //       {_id: Votes.findOne({voteType: voteTypes[i]})._id}, 
  //       {$set: {amount: 0}});
  //   }
  // }


  //
  // Template.game.upVotes
  // ===================
  // returns the current number of votes received for "up" (i.e. - how
  // many people think that anti-matter will fall upward)
  //
  Template.game.upVotes = function() {
    //get number of upvotes
    // return Votes.findOne({voteType: "up"}).amount;
      var numUpVotes = Votes.findOne({voteType: "up"}).amount;
      console.log( "numUpVotes = " + numUpVotes );
      return numUpVotes;
  }


  //
  // Template.game.voteCount
  // ===================
  // Returns a positive or negative number, depending on whether or not
  // the majority of the audience voted for antimatter falling up or down.
  //
  // Example: If 10 people vote it will fall "up" and 17 people vote that
  // it will fall "down", this function will return -7
  //
  // Example 2: if 10 people vote "up" and 4 people vote "down", this
  // function will return 6
  // 



}

// Template.game.resetVotes = function () {
//     if (Votes.findOne()) {
//       Votes.update(
//         {_id: Session.get('upId')}, 
//         {$set: {amount: 0}});

//       Votes.update(
//         {_id: Session.get('down')}, 
//         {$set: {amount: 0}});
//     }
// };

Template.game.runExperiment = function () {
  //get the current vote count
  var num = Math.random()*100-50; //-50 - 0 - 50

  var line = draw.line(0, 0, 100, 150).stroke({ width: 1 })

  line.plot(50, 30, 100, 150)

};

Template.game.users = function () {
  return Votes.findOne({voteType: 'up'}).amount + Votes.findOne({voteType: 'down'}).amount;
}

Template.game.voteCount = function () {
  return Votes.findOne({voteType: 'up'}).amount - Votes.findOne({voteType: 'down'}).amount;
}


// Template.game.preserve(['#preserve']);


  Template.game.events = {
    'click video': function() {
      var vidId = event.currentTarget.id;

      if( $('#'+vidId).hasClass('active') ) {
        document.getElementById(vidId).pause();
        $('#'+vidId).removeClass('active');
      } else {
        $("video.active").removeClass('active');
        document.getElementById("GAME1").pause();
        document.getElementById("GAME2").pause();
        document.getElementById("GAME3").pause();
        document.getElementById(vidId).play();
        $('#'+vidId).addClass('active');
      }
    },
    'click .add-point': function() {
      console.log( Votes.findOne() );
      $("ul.graph-data").append(
      '<li>' + Votes.findOne({voteType: "up"}).amount + '</li>');
    },

    'click .run': function() {
      var foil = window.innerWidth*.75;
      var vh = window.innerHeight*.5;

      var trajectory = Math.floor(Math.random() * 6)-3;

      console.log(trajectory);

      if( trajectory == 2 || trajectory == 1 ) {
        var inc = 1;
      } else if( trajectory == -3 || trajectory == -2 ) {
        var inc = -1;
      } else {
        var inc = 0;
      }

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

