//stack overflow code
function reset_animation(id) {
	//id without #
	var el = document.getElementById(id);
	el.style.animation = 'none';
	el.offsetHeight; /* trigger reflow */
	el.style.animation = null; 
}