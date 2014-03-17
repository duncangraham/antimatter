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
	  return '/aegis';
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

Template.aegis.created = function ( ) { 
	Template.nav.forwardURL = function () {
	  return '/game';
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

Template.game.created = function ( ) { 
	Template.nav.forwardURL = function () {
	  return '/implications';
	};

	Template.nav.forwardActive = function () {
	  return 'active';
	};

	Template.nav.backwardURL = function () {
	  return '/aegis';
	};

	Template.nav.backwardActive = function () {
	  return 'active';
	};
}

Template.implications.created = function ( ) { 
	Template.nav.forwardURL = function () {
	  return '/';
	};

	Template.nav.forwardActive = function () {
	  return 'inactive';
	};

	Template.nav.backwardURL = function () {
	  return '/game';
	};

	Template.nav.backwardActive = function () {
	  return 'active';
	};
}