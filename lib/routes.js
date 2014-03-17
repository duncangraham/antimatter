//not sure about this :/ was added by default
// Router.configure({
//   layoutTemplate: 'layout'
// });

Router.map(function() {
	this.route('landing', {path: '/'});
  this.route('whatismatter', {path: '/whatismatter'});
  this.route('mobile', {path: '/mobile'});
  this.route('aegis', {path: '/aegis'});
  this.route('game', {path: '/game'});
  this.route('implications', {path: '/implications'});
});
