//not sure about this :/ was added by default
// Router.configure({
//   layoutTemplate: 'layout'
// });

Router.map(function() {
	this.route('landing', {path: '/'});
  this.route('whatismatter', {path: '/whatismatter'});
  this.route('game', {path: '/game'});
});