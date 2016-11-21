
if(angular && angular.module)
{

	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}

	function mousewheelzoom(myimage){
		    //添加鼠标滚轮事件处理代码  
		    if (myimage.addEventListener) {
		        // IE9, Chrome, Safari, Opera  
		        myimage.addEventListener("mousewheel", MouseWheelHandler, false);  
		        // Firefox  
		        myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);  
		    }else{
		    	 // IE 6/7/8  
		    	myimage.attachEvent("onmousewheel", MouseWheelHandler);  
		    }
		    //为了让不同浏览器都能支持的处理做法,我们将对Firefox的detail值取反然后返回1或者-1的其中一个  
		    function MouseWheelHandler(e) {  
		        // cross-browser wheel delta  
		        var e = window.event || e; // old IE support  
		        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));  
		        //现在我们直接决定图片的大小范围。以下代码将图片的宽度范围设置在50-800个像素之间  
		        myimage.style.width = Math.max(50, Math.min(800, myimage.width + (30 * delta))) + "px";  
		        // 最后一点，我们在方法中返回false是为了终止标准的鼠标滚轮事件处理，以防它上下滑动网页  
		        return false;  
		    }
	}


	qui.directive('qbigimage',['$templateRequest','$compile',function($templateRequest,$compile) {
	    return {
		        restrict: 'EA',
		        // priority: 100,
		        require: '?ngModel',
		        scope: {
		            ngModel:'=',
		            qbigimageurl:'=',
		            src:'=',
		        },
		        link: function(scope, element, attrs,controller) {
		        	
		        	var  pluginobject={};
		        	pluginobject.qbigimageurl=scope.qbigimageurl;
					pluginobject.plugnamecontainer=$("<div>").addClass("qbigimage-popbox").css({
						'position':'fixed',
						'width':"80%",
						'height':"80%",
						'top':"50%",
						'left':"50%",
						'transform':'translate(-50%,-50%)',
						'overflow':'hidden',
						'text-align':'center'
					}).hide().on("click",$.proxy(function(){
						pluginobject.plugnamecontainer.hide(); 
					},scope));
					var img=$("<img>");
					mousewheelzoom(img.get(0));
					
					pluginobject.imgEle=img;
					pluginobject.plugnamecontainer.append(img);
					$("body").append(pluginobject.plugnamecontainer);

					element.on("click",$.proxy(function(event){
							if(pluginobject.plugnamecontainer.is(":hidden"))
							{
							     pluginobject.plugnamecontainer.show(); 
							}else
							{
							     pluginobject.plugnamecontainer.hide(); 
							}
					},scope));
					
					scope.$watch("qbigimageurl",function(newval,oldval){
						pluginobject.imgEle.attr("src",newval);
					});
					
		        }
		    };
		}]
	);

	
}




