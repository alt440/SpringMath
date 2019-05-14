//stack overflow code. Does not work with my animation, but worked on a different one.
function reset_animation(id) {
	//id without #
	var el = document.getElementById(id);
	el.style.animation = 'none';
	el.offsetHeight; /* trigger reflow */
	el.style.animation = null; 
}

//for my animation in the timed game, I had to replace my animation by a clone
//because for some reason when you try to reset with method 3 below it only works
//when more than 50% of the animation is done.
function reset_animation2(id){
	      
	var elm = document.getElementById(id);
	var newone = elm.cloneNode(true);
	elm.parentNode.replaceChild(newone, elm);

}

function reset_animation3(id, className){
	$("#"+id).removeClass(className);
	setTimeout(function(){
		$("#"+id).addClass(className);
	},1);
}