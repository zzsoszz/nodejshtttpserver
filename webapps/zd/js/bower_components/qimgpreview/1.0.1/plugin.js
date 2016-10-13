
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
		        restrict: 'EA',
		        // priority: 100,
		        require: '?ngModel',
		        scope: {
		            ngModel:'=',
		            ngName:'=',
		            ngOption:'=',
		            ngDefault:'='
		        },
		        link: function(scope, element, attrs,controller) {

		        	var imgEle=$('<img width="100%"  height="100%" >');
		        	var fileEle=$('<input type="file" >').attr("name",scope.ngName).hide();//multiple
		        	fileEle.on("change",function(e){
		        		if(scope.ngOption!=null && scope.ngOption.remote && e.target.files[0])
		        		{
		        			var formdata=new FormData(); 
							formdata.append("upfile" ,e.target.files[0]);
							formdata.append("action","uploadimage");
							 $.ajax({
					           type : 'post',
					           url :serviceApiUrl+'/article/editor/action',
					           data : formdata,
					           cache : false,
					           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
					           contentType : false, // 不设置Content-type请求头
					           success : function(data){
					           		var finalurl=serviceApiUrl+data.url;
					           		scope.ngModel=finalurl;
		        					controller.$setViewValue(scope.ngModel);
			   						controller.$render();
			   						imgEle.get(0).src=finalurl;
					           },
					           error : function(error){
					           		console.log(error);
					           }
					        });
		        		}
		        		else
		        		{
	        			  		preImg(fileEle.get(0),imgEle.get(0));
				        		scope.ngModel=fileEle.val();
				        		controller.$setViewValue(scope.ngModel);
						   		controller.$render();
		        		}
		        	}).on("click",function(event){
		        		event.stopPropagation();
		        	});
		        	scope.$watch("ngDefault",function(newval,oldval){
		        		imgEle.attr("src",newval);
		        	});
		        	element.append(fileEle).append(imgEle);
		        	element.click(function(){
		        		fileEle.trigger("click");
		        	});
		        }
		    };
		}]
	);

	
}




