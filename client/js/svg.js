//svg creation & rotation
$(function(){

	var draw = SVG('hydrogen');

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

	// function XY() {
	// 	newX = positron.attr('x') + 1;
	// 	newY = positron.attr('y') + 1;
	// 	console.log(newX);
	// 	positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
	// 		//pretty sure i just made a while using if statements. fuck I'm still jet lagged
	// 		if (i == 20 ) {
	// 			i = 0;
	// 			xY();
	// 		} else {
	// 			i = i + 1;
	// 			XY();
	// 		}
	// 	});
	// }

	// function xY() {
	// 	newX = positron.attr('x') - 1;
	// 	newY = positron.attr('y') + 1;
	// 	positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
	// 		if (i == 20 ) {
	// 			i = 0;
	// 			xy();
	// 		} else {
	// 			i = i + 1;
	// 			xY();
	// 		}
	// 	});
	// }

	// function xy() {
	// 	newX = positron.attr('x') - 1;
	// 	newY = positron.attr('y') - 1;
	// 	positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
	// 		if (i == 20 ) {
	// 			i = 0;
	// 			Xy();
	// 		} else {
	// 			i = i + 1;
	// 			xy();
	// 		}
	// 	});
	// }

	// function Xy() {
	// 	newX = positron.attr('x') + 1;
	// 	newY = positron.attr('y') - 1;
	// 	positron.animate(1).attr('x', newX).attr('y', newY).after(function() {
	// 		if (i == 20 ) {
	// 			i = 0;
	// 			XY();
	// 		} else {
	// 			i = i + 1;
	// 			Xy();
	// 		}
	// 	});
	// }


	// XY();

});