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
			width = $(window).width(),
			percent;
			
	$('body').mousemove(function(e){
			cursor.style.display = 'block';
			cursor.style.right = e.pageX*1 + "px";

			percent = (e.pageX/width*200);
			percentAtom = (e.pageX/width*100)-48.05;

			matter.style.webkitTransform = 'translate(' + percent + '%,' + 0 + 'px)'; 
			atom.style.right = -percentAtom + '%'; 

	});	
}

