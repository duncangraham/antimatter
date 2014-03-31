Meteor.startup(function () {
	//Reset database when meteor is started up
  if(Meteor.isServer) {
	  Votes = new Meteor.Collection('votes');
	  
    Votes.remove({});
  	var voteTypes = ["up", "down"];

    for (var i = 0; i < voteTypes.length; i++) {
      Votes.insert({voteType: voteTypes[i], amount: 0});
    }
   //  } else {
   //  	Votes.update(
   //    {_id: Votes.findOne({voteType: 'up'})._id}, 
   //    {$set: {amount: 0}});

   //  	Votes.update(
   //  	{_id: Votes.findOne({voteType: 'down'})._id}, 
   //    {$set: {amount: 0}});
	  // }
  }

  // if(Meteor.isClient && Votes.findOne() ) {
  //   Session.set( "upId", Votes.findOne({voteType: 'up'})._id );
  //   Session.set( "downId", Votes.findOne({voteType: 'down'})._id );
  // }
 });
