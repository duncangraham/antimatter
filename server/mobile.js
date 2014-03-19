// database has the schema:
//   voteType:     amount:
//   "up"          3
//   "down"        7

Meteor.startup(function () {
  // Votes = new Meteor.Collection("votes");

  if (Votes.find().count() === 0) {
    var voteTypes = ["up", "down"];

    for (var i = 0; i < voteTypes.length; i++)
      Votes.insert({voteType: voteTypes[i], amount: 0});
  }
});

