
if(angular && angular.module)
{

	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
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
		        	
		        	var 
			        this.qbigimageurl=target.data("qbigimageurl");
					target.on("click",$.proxy(function(event){
						if(!this.plugnamecontainer)
						{
							this.plugnamecontainer=$("<div>").addClass(plugname).css({
								'position':'fixed',
								'width':"80%",
								'height':"80%",
								'top':"50%",
								'left':"50%",
								'transform':'translate(-50%,-50%)',
								'overflow':'hidden',
								'text-align':'center'
							}).show().on("dblclick",$.proxy(function(){
								this.plugnamecontainer.hide(); 
							},this));
							var img=$("<img>").attr("src",this.qbigimageurl);
							this.plugnamecontainer.append(img);
							$("body").append(this.plugnamecontainer);
							console.log(img.height());
							console.log(img.width());
						}else{
							if(this.plugnamecontainer.is(":hidden"))
							{
							     this.plugnamecontainer.show(); 
							}else
							{
							     this.plugnamecontainer.hide(); 
							}
						}
					},this));




		        }
		    };
		}]
	);

	
}




