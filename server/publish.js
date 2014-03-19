// Votes = new Meteor.Collection("votes");

Meteor.publish('votes', function(){
  return Votes.find();
});
