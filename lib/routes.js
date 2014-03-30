//not sure about this :/ was added by default
// Router.configure({
//   layoutTemplate: 'layout'
// });
Router.configure({
  waitOn: function () {
    return Meteor.subscribe('votes');
  },
  loadingTemplate: 'loading'
});


Router.map(function() {
	this.route('landing', {path: '/'});
  this.route('whatismatter', {path: '/whatismatter'});
  this.route('mobile', {
  	        path: '/mobile'}); //TODO: delete this after debugging
            // TODO: UNCOMMENT THIS AFTER DEBUGGING!!!!
  					// path: '/mobile',
  					// waitOn: function () {  // wait for the subscription to be ready; see below
				    //   return Meteor.subscribe('votes');
				    // },
				    // before: function () {
				    //   var post = this.getData();
				    // }});
  this.route('aegis', {path: '/aegis'});
  this.route('game', {
				  	path: '/game',
				  	waitOn: function () {  // wait for the subscription to be ready; see below
				      return Meteor.subscribe('votes');
				    },
				    // data: {
				    //   users: Votes.findOne({voteType: 'up'}).amount + Votes.findOne({voteType: 'down'}).amount,
				    //   voteCount: Votes.findOne({voteType: "up"}).amount - Votes.findOne({voteType: "down"}).amount
				    // },
				    onBeforeAction: function () {
				      var game = this.getData();
				    }

				  });
  this.route('implications', {path: '/implications'});
});
