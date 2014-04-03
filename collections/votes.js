//See documentation in server/game.js about RED and BLUE
RED = 1;
BLUE = 0;

Votes = new Meteor.Collection('votes');

//Reset database when meteor first starts up
if (Meteor.isServer) {
  Meteor.startup(function () {
    Votes.remove({});
    Votes.insert({tag: "database is ready", color: RED});
  });
}
