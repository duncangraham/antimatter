Template.nav.events({
	'click .menu': function() {
		$('.shelf').addClass('open');
	},
	'mouseleave .shelf': function() {
		$('.shelf').removeClass('open');
	},

});