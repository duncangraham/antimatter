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
	var cursor = document.getElementById("matter");
			
	$('body').mousemove(function(e){
			cursor.style.display = 'block';
			cursor.style.right = e.pageX*1 + 5 + "px";
	});	
}