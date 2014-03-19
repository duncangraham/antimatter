if ( Meteor.isClient ) {
    Votes = new Meteor.Collection("votes");
}


Template.game.rendered = function() {

  Session.set( "upId", Votes.findOne({voteType: 'up'})._id );
  Session.set( "downId", Votes.findOne({voteType: 'down'})._id );

  var middleVid = $('.middle');
  var ml = middleVid.height()/2;

  middleVid.css('margin-top', -ml);

}

// Template.game.users = function () {
//   return Votes.findOne({voteType: 'up'}).amount + Votes.findOne({voteType: 'down'}).amount;
// }

// Template.game.voteCount = function () {
//   return Votes.findOne({voteType: 'up'}).amount - Votes.findOne({voteType: 'down'}).amount;
// }


// Template.game.preserve(['#preserve']);

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

