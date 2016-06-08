(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var designSize=640;
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if(clientWidth>=designSize){
				docEl.style.fontSize = '100px';
			}
			else
			{
				docEl.style.fontSize = 100 * (clientWidth / designSize) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);