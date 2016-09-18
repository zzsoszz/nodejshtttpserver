
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
		        	
		        	console.log(element,".........initialing");
		        	$templateRequest(baseUrl+'js/bower_components/qdropdownselect/2.0.4/plugin.html', false).then(
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
						  			//.id
					                if (scope.items[i] === scope.initdata) {
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
				                controller.$setViewValue(scope.ngModel);
					            controller.$render();
				                //scope[attrs['ngModel']]=item;
				                scope.qdropdownselectEle.hide();
				          };

				          
						  var myfn=$.proxy(function(event){
						  		//console.log(event.target,"document click............");
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
						  },scope);
						  $(document).on("click",myfn);

						  var myfn2=$.proxy(function(event){
						  		//console.log(element,"------------element click");
								this.qdropdownselectEle.css({
											'width':element.outerWidth()+'px',
											'top':element.offset().top+element.outerHeight()+"px",
											'left':element.offset().left+"px"
								}).show();
						  },scope);
				          $(element).on("click",myfn2);
						  

						  
				          angular.element("body").append(v);
						  $compile(v)(scope);

						  scope.$on('$destroy', function() {
								//console.log(element,"------------destroying");
								$(document).off("click",myfn);
								v.remove();
								//$(element).off("click",myfn2);
						  });
						  var initializing = true;
						  if(scope.bSelectedItem)
						  {
						  	scope.selectVal(scope.bSelectedItem);
						  }
						  scope.$watch("items",function(newitems){
						  	//scope.ngModel=null;
						  	scope.ngModel=scope.initdata;
						  	// if(!initializing)
						  	// {
						  	// 	scope.ngModel=null;
						  	// }
						  	// initializing=false;
						  });

						}
					);
					

		        }



		    };
		}]
	);

	
}




