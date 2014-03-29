Template.landing.rendered = function() {
	$('.bgvid')[0].play();

	var bottomCenter = $('.bottom-center');
	var margin = bottomCenter.width()/2;
	bottomCenter.css('margin-left', -margin);
}