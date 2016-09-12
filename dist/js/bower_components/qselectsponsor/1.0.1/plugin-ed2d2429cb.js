if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.directive('qselectsponsor',['$templateRequest','$compile',function($templateRequest,$compile) {
	        return {
	            restrict: 'A',
	            priority: 1,
	            scope:true,
	            require: '?ngModel',
	            controller: function($scope,$element,$attrs) {
	              $scope.qgroupselectLayerEle;
				  $scope.reponsedata=[];
				  $scope.data={
				  	pageNo:1,
				  	pageSize:5
				  };
				  $scope.qpageroptions={
			        totalpage:0,
			        currentpage:1
			      };
			      $scope.$watch("qpageroptions.currentpage",function(newval,oldval)
				  {
					 console.log("pagechange:",newval);
					 $scope.data.pageNo=newval;
					 if($scope.qpageroptions.totalpage!=0)
					 {
					 	$scope.search();
					 }
				  });
				  $scope.addToSelected=function(item){
					  console.log("item",item);
					  $scope.selectedItem=item;
					  $scope[$attrs["ngModel"]]=$scope.selectedItem;
					  console.log("$scope",$scope[$attrs["ngModel"]]);
				  };
				  
				  $scope.search=function(form)
			      {
			      		console.log($scope.qgroupselectLayerEle);
				      	var params=$.param($scope.data);
				      	console.log("params:",params);
				      	$.ajax({
				      	 	 type: "POST",
						     url: "http://localhost:3000/zd/js/bower_components/qselectsponsor/1.0.1/test.json",
						     data:params,
						     crossDomain:true,
						     dataType: 'json',
						     success: function(data) 
						     {
						     	$scope.$apply(function()
						     	{
						     		$scope.reponsedata=data.json.datas;
						     		$scope.qpageroptions.totalpage=Math.ceil(data.json.rows/$scope.data.pageSize);
						     		//console.log($scope.reponsedata);
						     	});
						     }
						});
			       };

				},
				link: function(scope, element, attrs) {

				  $templateRequest("plugin.html", false).then(
					function(viewFn) {

					  var v = angular.element(viewFn).attr("id","qgroupselectLayerEle_"+$.guid).hide();
					  scope.qgroupselectLayerEle=v;
					  scope.ele=element;
					  scope.ele.on("click",$.proxy(function(event){
							event.preventDefault();
							this.qgroupselectLayerEle.show();
					  },scope));
					  $(document).on("click",$.proxy(function(event){
					  		console.log(event.target,$(event.target).closest(".qselectsponsor"));
							if(event.target!=this.ele.get(0) && $(event.target).closest(".qselectsponsor").length  < 1 && $(event.target).closest(".qselectsponsortarget").length  < 1) 
							{
								  this.qgroupselectLayerEle.hide();
							}
					  },scope));
					  angular.element("body").append(v);
					  $compile(v)(scope);

					}
				  );

				  element.on('$destroy', function() {
				  	console("  destroying");
		          });
				  
				}
	        };
	    }]
    );

}




