if(angular && angular.module)
{
	
	var qui=angular.module("qui",[]);
	qui.directive('qgroupselect',['$templateRequest','$compile',function($templateRequest,$compile) {
	        return {
	            restrict: 'A',
	            priority: 1,
	            require: '?ngModel',
	            controller: function($scope,$element) {
				  $scope.userlist = [{
					username: 'qingtian',
					password: '123456'
				  }];
				  $scope.selectedItem;
				  $scope.add=function(item){
					  $scope.userlist.push({
						username: 'user'+$.guid,
						password: '144'
					  });
				  };
				  $scope.addToSelected=function(item){
					  console.log("item",item);
					  $scope.selectedItem=item;
					  $element.controller("ngModel").$setViewValue(item.username);
					  $element.controller("ngModel").$render();
				  };
				},
				link: function(scope, element, attrs) {
				  
				  $templateRequest("plugin.html", false).then(
					function(viewFn) {
					  var v = angular.element(viewFn);
					  angular.element("body").append(v);
					  $compile(v)(scope);
					}
				  );
				  
				}
	        };
	    }]
    );

}




