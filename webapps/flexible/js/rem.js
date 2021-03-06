function getDpr()
{
	var  dpr = window.devicePixelRatio || 1; 
	console.log("dpr",dpr);
	return dpr;
}

function getHtmlFontSize()
{
	var designWidth=640;
	var deviceWidth=screen.width;
	if(deviceWidth>designWidth){
			deviceWidth=designWidth;
	}
	var  htmlFontSize=100 * (deviceWidth/ designWidth) * getDpr()+ 'px';
	return htmlFontSize;
}


(function (doc, win) {
	var docEl = doc.documentElement;
	var  scale = parseFloat((1 / getDpr()).toFixed(2)); 
	docEl.setAttribute('data-dpr', getDpr());
	console.log("scale:",scale);
	var metaEl;
	if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=3, minimum-scale=' + scale + ', user-scalable=yes');
        doc.getElementsByTagName("head")[0].appendChild(metaEl);
	 }
})(document, window);


(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			docEl.style.fontSize=getHtmlFontSize();
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

