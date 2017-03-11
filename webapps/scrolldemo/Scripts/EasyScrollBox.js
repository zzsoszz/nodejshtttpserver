/*
* 作者:chenhongjin
* 2016/10/17
* http://www.cnblogs.com/easywebfactory
*/

(function ($) {
    function EasyScrollBox(target, param) {
        var _this = this;
        $.each(param, function (options, value) {
            _this.defaults[options] = value;
        });
    }

    EasyScrollBox.prototype.defaults = {
        fontSize: 32,
        fontFamily: '',
        color: '#000',
        width: 150,
        height: 150,
        lineHeight: 1.5,
        spaceRows: 2,
        value: 0,
        data: [],
        textFiled: '', //当data[i]为对象时，textFiled,valueFiled必填
        valueFiled: '',
        onSelected: function (index, value) { }
    };

    EasyScrollBox.prototype.buildHtml = function (target) {
        var mheight, mwidth, theight, bheight, iheight;
        iheight = parseInt(this.defaults.fontSize * this.defaults.lineHeight);
        theight = iheight * this.defaults.spaceRows;
        bheight = theight;
        mheight = theight + bheight + iheight;
        mwidth = this.defaults.width;

        var bttop = -mheight;
        var bmtop = iheight;
        var selectedIndex = 0;
        var isFindDefault = false;
        var fontStyle = "";

        if (this.defaults.fontFamily.length > 1) {
            fontStyle += "font-family:" + this.defaults.fontFamily + ";";
        }
        if (this.defaults.fontSize > 5) {
            fontStyle += "font-size:" + this.defaults.fontSize + "px;";
        }

        var _body = '<div style="width:100%;height:' + mheight + 'px;overflow:hidden;">';
        _body += '<div id="scroller-EasyScrollBox" style="width:100%;height:' + mheight + 'px;padding-right:20px; -webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;display:block;overflow:scroll;overflow-x: hidden;z-index:2">';
        _body += '<ul id="ul-EasyScrollBox"  style=" margin-top:' + theight + 'px; margin-bottom:' + bheight + 'px;padding: 0px; width: 100%;z-index:1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;">';
        var _text = "";
        var _value = "";
        for (var d in this.defaults.data) {
            if (typeof (this.defaults.data[d]) == "object") {
                _text = this.defaults.data[d][this.defaults.textFiled];
                _value = this.defaults.data[d][this.defaults.valueFiled];
            } else {
                _text = this.defaults.data[d];
                _value = _text;
            }
            if (isFindDefault == false && _value == this.defaults.value) {
                isFindDefault = true;
            }
            else if (isFindDefault == false) {
                selectedIndex++;
            }

            _body += '<li style="margin:0;padding:0;text-align:center;height:' + iheight + 'px; line-height:' + iheight + 'px;overflow:hidden; ' + fontStyle + '">' + _text + '</li>';
        }
        _body += '</ul>';
        _body += '</div>';
        _body += '<div id="cover_top_EasyScrollBox" style="height: ' + theight + 'px; background-color: #fff; width: 100%; margin-top: ' + bttop + 'px; z-index: 3;opacity:0.6;border-bottom:2px solid red;pointer-events:none;-ms-touch-action:none;"></div>';
        _body += '<div id="cover_bottom_EasyScrollBox" style="height: ' + bheight + 'px; background-color: #fff; width: 100%; margin-top: ' + bmtop + 'px; z-index: 3;opacity:0.6;border-top:2px solid red;pointer-events:none;-ms-touch-action:none;"></div>';
        _body += '</div>';
        target.html(_body);
        var _h = iheight;
        var u = document.getElementById("ul-EasyScrollBox");
        var s = document.getElementById("scroller-EasyScrollBox");
        var lis = u.getElementsByTagName("LI")
        var seli = 0;
        var v = 0;
        var prev = 0;
        var _this = this;
        var _hasSetDefault=false;
        var _setDefaultVal = setInterval(function () {
            if (lis.length > 0 && _hasSetDefault==false) {
                if (isFindDefault == true) {
                    s.scrollTop = selectedIndex * iheight;
                }
                if (selectedIndex >= lis.length) {
                    selectedIndex = 0;
                }
                _this.defaults.onSelected(selectedIndex, _this.defaults.data[selectedIndex]);
            }
        }, 20);


        var _start = 0;
        s.onmousedown = function (e) {
            _start = e.pageY;
        }
        s.onmousemove = function (e) {
            if (_start > 0) {
                s.scrollTop -= e.pageY - _start;
                _start = e.pageY;
            }
        }
        s.onmouseup = function (e) {
            _start = 0;
        }
        s.onscroll = function () {
            v = s.scrollTop / _h;
            if (v == v.toFixed(0)) {
                var tv = Math.round(v);
                if (tv >= 0 && tv < lis.length) {
                    _hasSetDefault=true;
                    clearInterval(_setDefaultVal);
                    lis[seli].style.fontWeight = 100;
                    seli = tv;
                    lis[tv].style.fontWeight = 900;
                    _this.defaults.onSelected(tv, _this.defaults.data[tv]);
                }
            } else {
                if (prev > v) {
                    s.scrollTop -= 1;
                } else {
                    s.scrollTop += 1;
                }
            }
            prev = v;
        }
    }

    $.fn.EasyScrollBox = function (param) {
        var box = new EasyScrollBox(this, param);
        box.buildHtml(this);
        return box;
    }

})(jQuery);