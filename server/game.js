Meteor.publish('default_db_data', function(){
  return Votes.find({});
});
