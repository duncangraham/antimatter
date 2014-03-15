if (Meteor.isClient) {
  // Template.hello.greeting = function () {
  //   return "antimatter.";
  // };

  // Template.hello.events({
  //   'click input': function () {
  //   }
  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
