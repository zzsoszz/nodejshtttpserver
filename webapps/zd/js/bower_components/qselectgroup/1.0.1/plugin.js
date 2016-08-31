if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.directive('qgroupselect',['$templateRequest','$compile',function($templateRequest,$compile) {
	        return {
	            restrict: 'A',
	            priority: 1,
	            require: '?ngModel',
	            controller: function($scope,$element) {
	              $scope.qgroupselectLayerEle;
				  $scope.reponsedata=[];
				  $scope.data={
				  	isVisible:true,
				  	keyWords:"",
				  	startTime:"",
				  	typeId:1,
				  	pageNo:1,
				  	pageSize:5
				  };
				  $scope.addToSelected=function(item){
					  console.log("item",item);
					  $scope.selectedItem=item;
					  $element.controller("ngModel").$setViewValue(item.id);
					  $element.controller("ngModel").$render();
				  };
				  $scope.search=function(form)
			      {
			      		console.log($scope.qgroupselectLayerEle);
				      	var params=$.param($scope.data);
				      	console.log("params:",params);
				      	$.ajax({
				      	 	 type: "POST",
						     url: "http://localhost:8888/group/list",
						     data:params,
						     crossDomain:true,
						     dataType: 'json',
						     success: function(data) 
						     {
						     	$scope.$apply(function()
						     	{
						     		$scope.reponsedata=data.json.list;
						     		console.log($scope.reponsedata);
						     	});
						     }
						});

			       };
				},
				link: function(scope, element, attrs) {

				  $templateRequest("plugin.html", false).then(
					function(viewFn) {

					  var v = angular.element(viewFn).hide();
					  scope.qgroupselectLayerEle=v;
					  scope.ele=element;

					  scope.ele.on("click",$.proxy(function(event){
							event.preventDefault();
							this.qgroupselectLayerEle.show();
					  },scope));

					  $(document).on("click",$.proxy(function(event){
					  		console.log(event.target,$(event.target).closest(".qselectgroup"));
							if(event.target!=this.ele.get(0) && $(event.target).closest(".qselectgroup").length  < 1) 
							{
								  this.qgroupselectLayerEle.hide();
							}
					  },scope));
					  angular.element("body").append(v);
					  $compile(v)(scope);

					}
				  );

				}
	        };
	    }]
    );

}




