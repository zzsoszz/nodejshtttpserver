
if(angular && angular.module)
{

    function getFileUrl(ele) {
        var url;
        if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE 
            url = ele.value;
        } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox 
            url = window.URL.createObjectURL(ele.files.item(0));
        } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome 
            url = window.URL.createObjectURL(ele.files.item(0));
        }
        return url;
    }
    function preImg(fileEle, imgEle) {
        var url = getFileUrl(fileEle);
        var imgPre = imgEle;
        imgPre.src = url;
    }
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.directive('qimgpreview',['$templateRequest','$compile',function($templateRequest,$compile) {
	    return {
		        restrict: 'A',
		        priority: 100,
		        require: '?ngModel',
		        scope: {
		            items:'=dropdowndata',
		            initdata:'=initdata',
		            ngModel: '=ngModel'
		        },
		        link: function(scope, element, attrs,controller) {
		        	var fileinput=$('<input type="file">');
		        	var img=$("<img>");
		        	element.append(fileinput).click(function(){
		        		fileimput.
		        	});
		        }
		    };
		}]
	);

	
}




