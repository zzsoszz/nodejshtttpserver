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
				  $scope.data={
				  	isVisible:"",
				  	keyWords:"",
				  	startTime:"",
				  	typeId:"",
				  	pageNo:1,
				  	pageSize:5
				  };
				  $scope.addToSelected=function(item){
					  console.log("item",item);
					  $scope.selectedItem=item;
					  $element.controller("ngModel").$setViewValue(item.username);
					  $element.controller("ngModel").$render();
					
				  };
				  $scope.search=function(form)
			      {
			      		var json=angular.toJson($scope.data, true);
			      	    console.log(json);
				      	 $.ajax({
				      	 	 type: "POST",
						     url: "http://localhost:8888/group/list",
						     data:json,
						     crossDomain:true,
						     dataType: 'json',
						     success: function(data) {
						        console.log(data);
						     }
						 });
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




