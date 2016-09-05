
if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}

	qui.directive('qdropdownselect',['$templateRequest','$compile',function($templateRequest,$compile) {
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
		        	
		        	$templateRequest("plugin.html", false).then(
						function(viewFn) {

						  var v = angular.element(viewFn).attr("id","qdropdownselectEle_"+$.guid).hide().css({
									'position':'absolute',
									'width':element.outerWidth()+'px',
									'top':element.offset().top+element.outerHeight()+"px",
									'left':element.offset().left+"px",
									'box-sizing':'border-box'
						  });
						  scope.qdropdownselectEle=v;
						  scope.ele=element;
						  if(scope.items)
						  {
						  	for (var i = 0; i < scope.items.length; i++) {
					                if (scope.items[i].id === scope.initdata) {
					                    scope.bSelectedItem = scope.items[i];
					                    break;
					                }
					          }
						  }
						  scope.selectVal = function (item) {
						  		scope.bSelectedItem=item;
				                //scope.selecteditem=item;
				                if(element.is("input"))
				                {
				                	 scope.ngModel=item.id;
				                }else{
				               		 scope.ngModel=item;
				                }
				                //scope[attrs['ngModel']]=item;
				                scope.qdropdownselectEle.hide();
				          };

				          $(element).on("click",$.proxy(function(event){
								this.qdropdownselectEle.show();
						  },scope));
						  
						  $(document).on("click",$.proxy(function(event){
						  		/*
						  		console.log(this.ele.attr("id"));
						  		console.log(this.qdropdownselectEle.attr("id"));
						  		console.log($(event.target).closest(this.qdropdownselectEle).length);
						  		console.log($(event.target).closest(".qdropdownselecttarget").length);
						  		*/
								if(event.target!=this.ele.get(0) && $(event.target).closest(this.qdropdownselectEle).length  < 1 && $(event.target).closest(this.ele).length  < 1) 
								{
									  this.qdropdownselectEle.hide();
								}
						  },scope));

				          scope.selectVal(scope.bSelectedItem);
				          angular.element("body").append(v);
						  $compile(v)(scope);


						}
					);
					

		        }



		    };
		}]
	);

	
}




