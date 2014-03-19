

Meteor.startup(function () {
	//populate DB if it's empty
if(Meteor.isServer) {
	Votes = new Meteor.Collection('votes');
	
	if (Votes.find().count() == 0) {
  	var voteTypes = ["up", "down"];

    for (var i = 0; i < voteTypes.length; i++) {
      Votes.insert({voteType: voteTypes[i], amount: 0});
    }
  } else {
  	Votes.update(
    {_id: Votes.findOne({voteType: 'up'})._id}, 
    {$set: {amount: 0}});

  	Votes.update(
  	{_id: Votes.findOne({voteType: 'down'})._id}, 
    {$set: {amount: 0}});
	}
}

// if(Meteor.isClient && Votes.findOne() ) {
//   Session.set( "upId", Votes.findOne({voteType: 'up'})._id );
//   Session.set( "downId", Votes.findOne({voteType: 'down'})._id );
// }
 });