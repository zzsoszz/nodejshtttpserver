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
	            scope:true,
	            require: '?ngModel',
	            controller: function($scope,$element,$attrs) {
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
					  //$element.controller("ngModel").$setViewValue(item.id);
					  //$element.controller("ngModel").$render();
					  //$scope.
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
						     url: "http://localhost:3000/zd/js/bower_components/qselectgroup/1.0.1/test.json",
						     data:params,
						     crossDomain:true,
						     dataType: 'json',
						     success: function(data) 
						     {
						     	$scope.$apply(function()
						     	{
						     		$scope.reponsedata=data.json.list;
						     		$scope.qpageroptions.totalpage=Math.ceil(data.json.count/$scope.data.pageSize);
						     		//console.log($scope.reponsedata);
						     	});
						     }
						});
			       };

				},
				link: function(scope, element, attrs) {

				  $templateRequest("js/bower_components/qselectgroup/1.0.1/plugin.html", false).then(
					function(viewFn) {

					  var v = angular.element(viewFn).attr("id","qgroupselectLayerEle_"+$.guid).hide();
					  scope.qgroupselectLayerEle=v;
					  scope.ele=element;
					  scope.ele.on("click",$.proxy(function(event){
							event.preventDefault();
							this.qgroupselectLayerEle.show();
					  },scope));
					  var myfn=$.proxy(function(event){
					  		console.log(event.target,$(event.target).closest(".qselectgroup"));
							if(event.target!=this.ele.get(0) && $(event.target).closest(".qselectgroup").length  < 1 && $(event.target).closest(".qselectgrouptarget").length  < 1) 
							{
								  this.qgroupselectLayerEle.hide();
							}
					  },scope);
					  $(document).on("click",myfn);
					  scope.$on('$destroy', function() {
								console.log(element,"------------destroying");
								$(document).off("click",myfn);
					  });
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




