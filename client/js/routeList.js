Template.landing.created = function ( ) { 
	Template.nav.forwardURL = function () {
	  return '/whatismatter';
	};

	Template.nav.forwardActive = function () {
	  return 'active';
	};

	Template.nav.backwardURL = function () {
	  return '/';
	};

	Template.nav.backwardActive = function () {
	  return 'inactive';
	};
}

Template.whatismatter.created = function ( ) { 
	Template.nav.forwardURL = function () {
	  return '/game';
	};

	Template.nav.forwardActive = function () {
	  return 'active';
	};

	Template.nav.backwardURL = function () {
	  return '/';
	};

	Template.nav.backwardActive = function () {
	  return 'active';
	};
}

Template.game.created = function ( ) { 
	Template.nav.forwardURL = function () {
	  return '/crowdcrafting';
	};

	Template.nav.forwardActive = function () {
	  return 'active';
	};

	Template.nav.backwardURL = function () {
	  return '/whatismatter';
	};

	Template.nav.backwardActive = function () {
	  return 'active';
	};
}