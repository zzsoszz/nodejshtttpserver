(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var designSize=720;
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if(clientWidth>=designSize){
				docEl.style.fontSize = '100px';
			}else{
				docEl.style.fontSize = 100 * (clientWidth / designSize) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


(function (doc, win) {
  
	function addClass(element, value) {
	    if (!element.className) {
	        element.className = value;
	    } else {
	        newClassName = element.className;
	        newClassName += " ";
	        newClassName += value;
	        element.className = newClassName;
	    }
	}
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    var dpr;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    addClass(document.documentElement,"dpr"+dpr);
    doc.documentElement.setAttribute('data-dpr', dpr);
})(document, window);


