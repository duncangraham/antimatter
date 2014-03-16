Template.landing.rendered = function() {
	drawAntihydrogen();
}

var drawAntihydrogen = function () {
	var draw = SVG('hydrogen').size('100px', '100px');

	var antiproton = draw.rect( 15, 15 )
			   	   		 			 .radius( 7.5 )
			       		 			 .fill('#FFF')
			       		 			 .move( 14.5, 14.5 )

	var outline = draw.rect( 40, 40 )
					  				.radius( 20 )
					   				.fill('rgba(0,0,0,0)')
					  				.stroke('#FFF')
					  				.move( 2.5, 2.5 )


	var positronX = 1,
		positronY = 1,
		directionX = 'up'
		directionY = 'up';



	positron = draw.rect( 5, 5 )
				   .radius( 5 )
				   .fill('#FFF')
				   .move( 18.5, 0 );



	var newX,
		newY
		deg = 90;

	function orbit() {
		newX = (20 * Math.cos(deg*(Math.PI/180)))+20;
		newY = (20 * Math.sin(deg*(Math.PI/180)))+20;
		positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
			//pretty sure i just made a while using if statements. fuck I'm still jet lagged
			if (deg == 0 ) {
				deg = 359;
				orbit();
			} else {
				deg = deg - 1;
				orbit();
			}
		});
	}

	orbit();
};