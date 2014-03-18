$(function(){ //DOM Ready

  // reminder: database has the schema...
  //      voteType:     amount:
  //      "up"          3
  //      "down"        7

  //Call addGraphPoint every second
  // if (document.URL.match(/game/)) {
  //   setInterval( function(){addGraphPoint()}, 1000 )
  // }


  //Start the page with data_loaded = false
  Meteor.startup(function() {
     Session.set('data_loaded', false); 
  }); 


  Meteor.subscribe('default_db_data', function(){
    //Set the session var as true to indicate that the data has
    //been loaded
    Session.set('data_loaded', true); 

    resetVotes();
  });



  //
  // addGraphPoint()
  // ===============
  // Takes the current voteCount, puts it in <li> tags, and appends it to
  // ul.graph-data
  //
  function addGraphPoint() {
    $("ul.graph-data").append(
        '<li>' + Template.game.voteCount() + '</li>');
  }

    
  //
  // resetVotes()
  // ============
  // sets the "amount" of both upvotes and downvotes to 0
  //
  function resetVotes() {
    var voteTypes = ["up", "down"];
    for (var i = 0; i < voteTypes.length; i++){
      Votes.update(
        {_id: Votes.findOne({voteType: voteTypes[i]})._id}, 
        {$set: {amount: 0}});
    }
  }

  //
  // Template.game.users
  // ===================
  // returns the current number of users that have cast their vote
  //
  Template.game.users = function() {
    //NOTE: there's a weird error here where if you visit the page
    //directly, it'll give an error saying that the Votes.findOne each
    //return undefined.  But if you refresh the page, it'll load
    //everything just fine.  Not sure why.
    if(Session.get('data_loaded')){
      numUsers = Votes.findOne({voteType: "up"}).amount 
        + Votes.findOne({voteType: "down"}).amount;
      console.log("numUsers = " + numUsers);
      return numUsers;
    }
  }


  //
  // Template.game.upVotes
  // ===================
  // returns the current number of votes received for "up" (i.e. - how
  // many people think that anti-matter will fall upward)
  //
  Template.game.upVotes = function() {
    //get number of upvotes
    // return Votes.findOne({voteType: "up"}).amount;
    if(Session.get('data_loaded')){
      numUpVotes = Votes.findOne({voteType: "up"}).amount 
      console.log( "numUpVotes = " + numUpVotes );
      return numUpVotes;
    }
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
  Template.game.voteCount = function() {
    if(Session.get('data_loaded')){
      numUpVotes = Votes.findOne({voteType: "up"}).amount 
      numDownVotes = Votes.findOne({voteType: "down"}).amount 

      console.log("voteCount = " + numUpVotes - numDownVotes);
      return numUpVotes - numDownVotes;
    }
  }

});
