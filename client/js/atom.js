Atom = function (id, color) {
	var draw = SVG(id).size('45px', '45px');

	if ( color == 'light' ) {
		var antiproton = draw.rect( 15, 15 )
				   	   		 			 .radius( 7.5 )
				       		 			 .fill('#FFF')
				       		 			 .move( 14.5, 14.5 );

		var outline = draw.rect( 40, 40 )
						  				.radius( 20 )
						   				.fill('rgba(0,0,0,0)')
						  				.stroke('#FFF')
						  				.move( 2.5, 2.5 );


		var positron = draw.rect( 5, 5 )
					   .radius( 5 )
					   .fill('#FFF')
					   .move( 18.5, 0 );

	} else {
		var antiproton = draw.rect( 15, 15 )
			   	   		 			 .radius( 7.5 )
			       		 			 .fill('#14081B')
			       		 			 .move( 14.5, 14.5 )

		var outline = draw.rect( 40, 40 )
						  				.radius( 20 )
						   				.fill('rgba(0,0,0,0)')
						  				.stroke('#14081B')
						  				.move( 2.5, 2.5 )


		var positron = draw.rect( 5, 5 )
					   .radius( 5 )
					   .fill('#14081B')
					   .move( 18.5, 0 );
	}


	var newX,
			newY,
			deg = 90;

	if (color == 'light') {
		setInterval(orbit, 10);
	} else {
		setInterval(darkOrbit, 10);
	}
	

	function orbit () {
		newX = (20 * Math.cos(deg*(Math.PI/180)))+20;
		newY = (20 * Math.sin(deg*(Math.PI/180)))+20;
		positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
			if (deg == 0 ) {
				deg = 359;
			} else {
				deg = deg - 1;
			}
		});
	}

	function darkOrbit () {
		newX = (20 * Math.cos(deg*(Math.PI/180)))+20;
		newY = (20 * Math.sin(deg*(Math.PI/180)))+20;
		positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
			if (deg == 360 ) {
				deg = 0;
			} else {
				deg = deg + 1;
			}
		});
	}
};