Template.whatismatter.events = function() {
	// 'mousemove': function () {
	// 	var cursor = document.getElementById("mycursor");
	// 	$('canvas').hover(function(){
	// 		$('canvas').mousemove(function(e){
	// 			cursor.style.display = 'block';
	// 			cursor.style.top = e.pageY*1 + 5 + "px";
	// 		    cursor.style.left = e.pageX*1 + 5 + "px";
	// 		});	
	// 	},function(){
	// 		cursor.style.display = 'none';
	// 	});
 //  }
}


Template.whatismatter.rendered = function ( ) {

	var antiHydrogen = new Atom('antihydrogen', 'light');
	var hydrogen = new Atom('hydrogenAtom', 'dark');

	var cursor = document.getElementById("matter"),
			matter = document.getElementById("matterinfo"),
			atom = document.getElementById("hydrogenAtom"),
			antimatterVid = document.getElementById("antimatter"),
			matterVid = document.getElementById("matterVid"),
			width = $(window).width(),
			percent;

			//TODO: ON RESIZE, RECALC
			
	$('#whatismatter').mousemove(function(e){
			cursor.style.display = 'block';
			cursor.style.right = e.pageX*1 + "px";

			percent = (e.pageX/width*200); 
			percentAtom = (e.pageX/width*100)-48.05;

			if ( percent >= 160 ) {

				matterVid.pause();
				matterVid.style.opacity = 0;

				antimatterVid.play();
				antimatterVid.style.opacity = 1;

			} else if ( percent >= 120  ) {

				matterVid.pause();
				matterVid.style.opacity = 0;

				antimatterVid.style.opacity = (percent-120)/40;

			} else if ( percent <= 40 ) {

				antimatterVid.pause();
				antimatterVid.style.opacity = 0; 

				matterVid.play();
				matterVid.style.opacity = 1;

			} else if (percent <= 80 ) {

				antimatterVid.pause();
				antimatterVid.style.opacity = 0;

				matterVid.style.opacity = Math.abs((percent-80)/40);

			} else {

				antimatterVid.pause();
				antimatterVid.style.opacity = 0;

				matterVid.pause();
				matterVid.style.opacity = 0;

			}

			matter.style.webkitTransform = 'translate(' + percent + '%,' + 0 + 'px)'; 
			atom.style.right = -percentAtom + '%'; 

	});	
}

