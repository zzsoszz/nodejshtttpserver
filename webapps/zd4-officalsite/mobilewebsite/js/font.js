/**
 * Created by Administrator on 2016/4/15.
 */
//!(function(win, doc){
//    function setFontSize() {
//        var winWidth =  window.innerWidth;
//        doc.documentElement.style.fontSize = (winWidth / 750) * 100 + 'px' ;
//    }
//
//    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
//
//    var timer = null;
//
//    win.addEventListener(evt, function () {
//        clearTimeout(timer);
//
//        timer = setTimeout(setFontSize, 300);
//    }, false);
//
//    win.addEventListener("pageshow", function(e) {
//        if (e.persisted) {
//            clearTimeout(timer);
//
//            timer = setTimeout(setFontSize, 300);
//        }
//    }, false);
//    setFontSize();
//}(window, document));

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);