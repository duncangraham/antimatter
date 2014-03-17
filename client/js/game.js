$(function(){ //DOM Ready

  // reminder: database has the schema...
  //      voteType:     amount:
  //      "up"          3
  //      "down"        7


  Template.game.rendered = function() {
	  
  }

  Template.game.users = function() {
    //get number of users
    numUsers = Votes.findOne({voteType: "up"}).amount 
      + Votes.findOne({voteType: "down"}).amount;
    console.log("numUsers = " + numUsers);
    return numUsers;
  }


  Template.game.upVotes = function() {
    //get number of upvotes
    // return Votes.findOne({voteType: "up"}).amount;
    numUpVotes = Votes.findOne({voteType: "up"}).amount 
    console.log( "numUpVotes = " + numUpVotes );
    return numUpVotes;
  }


  Template.game.voteCount = function() {
    numUpVotes = Votes.findOne({voteType: "up"}).amount 
    numDownVotes = Votes.findOne({voteType: "down"}).amount 

    console.log("voteCount = " + numUpVotes - numDownVotes);
    return numUpVotes - numDownVotes;
  }

});
