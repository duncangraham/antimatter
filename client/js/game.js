$(function(){ //DOM Ready

  // reminder: database has the schema...
  //      voteType:     amount:
  //      "up"          3
  //      "down"        7


  Template.game.rendered = function() {
	  //still to be completed...  
  }


  //
  // Template.game.users
  // ===================
  // returns the current number of users that have cast their vote
  //
  Template.game.users = function() {
    //get number of users
    numUsers = Votes.findOne({voteType: "up"}).amount 
      + Votes.findOne({voteType: "down"}).amount;
    console.log("numUsers = " + numUsers);
    return numUsers;
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
    numUpVotes = Votes.findOne({voteType: "up"}).amount 
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
  Template.game.voteCount = function() {
    numUpVotes = Votes.findOne({voteType: "up"}).amount 
    numDownVotes = Votes.findOne({voteType: "down"}).amount 

    console.log("voteCount = " + numUpVotes - numDownVotes);
    return numUpVotes - numDownVotes;
  }

});
