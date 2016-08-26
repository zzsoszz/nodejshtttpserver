if(angular && angular.module)
{
	
	var qui=angular.module("qui",[]);
	//angular.element("body>div.ng-scope").scope().username
	qui.directive('qgroupselect',[function() {
	        return {
	            restrict: 'A',
	            priority: 1,
	            templateUrl: 'plugin.html',
	            require: '?ngModel',
	            scope:{},
	            replace: false,
	            transclude:false,
	            controller:function()
	            {

	            },
	            link: function(scope, element, attrs,controller) {

	            }
	        };
	    }]
    );

}




