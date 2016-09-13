
if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}

	qui.directive('qdaterangepicker',['$templateRequest','$compile',function($templateRequest,$compile) {
	    return {
		        restrict: 'A',
		        priority: 100,
		        require: '?ngModel',
		        scope: {
		            option:'=option',
		            ngModel: '=ngModel'
		        },
		        link: function(scope, element, attrs,controller) {
        		    element.daterangepicker(scope.option,function(start, end, label) {
				         return scope.$apply(function() {
				              return scope.ngModel = scope.option.singleDatePicker ? start.format(scope.option.locale.format) : {
				                startDate: start.format(scope.option.locale.format),
				                endDate: end.format(scope.option.locale.format)
				              };
				         });
				    }).on("cancel.daterangepicker",function(event){
				       	
				    }).val("");
				    var  _picker = element.data('daterangepicker');
				    scope.$on('$destroy', function() {
						return _picker != null ? _picker.remove() : void 0;
					});
		        }
		    };
		}]
	);

	
}




