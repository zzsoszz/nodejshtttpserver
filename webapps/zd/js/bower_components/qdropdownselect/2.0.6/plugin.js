
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
		        	
		        	$templateRequest(baseUrl+'js/bower_components/qdropdownselect/2.0.6/plugin.html', false).then(
						function(viewFn) {
						  console.log(scope.initdata);
						  console.log(is.Object(scope.initdata));
						  var v = angular.element(viewFn).attr("id","qdropdownselectEle_"+$.guid).hide().css({
									'position':'absolute',
									'width':element.outerWidth()+'px',
									'top':element.offset().top+element.outerHeight()+"px",
									'left':element.offset().left+"px",
									'box-sizing':'border-box'
						  });
						  scope.qdropdownselectEle=v;
						  scope.ele=element;
						  var initSelectedItem;


						  if(scope.items)
						  {
						  	if(scope.initdata)
						  	{
							  	for (var i = 0; i < scope.items.length; i++) 
							  	{
							  				if(is.Object(scope.initdata))
							                {
							                	if (scope.items[i] === scope.initdata) {
								                    initSelectedItem = scope.items[i];
								                    break;
								                }
							                }else{
							                	if (scope.items[i].id === scope.initdata) {
								                    initSelectedItem = scope.items[i];
								                    break;
								                }
							                }
						          }
					          }
						  }
						  

						  scope.selectVal = function (item) {
						  		scope.bSelectedItem=item;
				                if(element.is("input"))
				                {
				                	 scope.ngModel=item.id;
				                }else{
				               		 scope.ngModel=item;
				                }
				                controller.$setViewValue(scope.ngModel);
					            controller.$render();
				                scope.qdropdownselectEle.hide();
				          };

				          
						  var myfn=$.proxy(function(event){
								if(event.target!=this.ele.get(0) && $(event.target).closest(this.qdropdownselectEle).length  < 1 && $(event.target).closest(this.ele).length  < 1) 
								{
									  this.qdropdownselectEle.hide();
								}
						  },scope);
						  $(document).on("click",myfn);

						  var myfn2=$.proxy(function(event){
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
								$(document).off("click",myfn);
								v.remove();
						  });
						  var initializing = true;
						  if(initSelectedItem)
						  {
						  	scope.selectVal(initSelectedItem);
						  }
						  scope.$watch("items",function(newitems){
						  	scope.ngModel=initSelectedItem;
						  });
						  scope.$watch("initdata",function(newitems){
								if(scope.items)
								{
									if(newitems)
									{
										for (var i = 0; i < scope.items.length; i++)
										{
											if(is.Object(newitems))
											{
												if (scope.items[i] === newitems) {
													initSelectedItem = scope.items[i];
													scope.selectVal(initSelectedItem);
													break;
												}
											}else{
												if (scope.items[i].id === newitems) {
													initSelectedItem = scope.items[i];
													scope.selectVal(initSelectedItem);
													break;
												}
											}
										}
									}
								}
							});


						}
					);
					

		        }



		    };
		}]
	);

	
}




