$(function(){ //DOM Ready
	
}

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
    console.log("users = " + users);
    return users;
  }


});
