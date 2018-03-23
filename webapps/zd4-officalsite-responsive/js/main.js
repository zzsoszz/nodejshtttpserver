$(document).ready(function(){
	console.log();
	$(".nav>.menu>.item").filter(function(obj){
		if( window.location.pathname==$(this).attr("href") ){
			$(this).addClass("active");
		}
	});
	
	// var prevWidth = element.style.width
	// element.style.width = 'auto'
	// var endWidth = getComputedStyle(element).width
	// element.style.width = prevWidth
	// element.offsetWidth // force repaint
	// element.style.transition = 'width .5s ease-in-out'
	// element.style.width = endWidth
	// element.addEventListener('transitionend', function transitionEnd(event) {
	// 	if (event.propertyName == 'width') {
	// 		element.style.transition = ''
	// 		element.style.width = 'auto'
	// 		element.removeEventListener('transitionend', transitionEnd, false)
	// 	}
	// }, false)
	

});
