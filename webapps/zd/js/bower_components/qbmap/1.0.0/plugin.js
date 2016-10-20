if(angular!=undefined  && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.component('qbmap', {
		  transclude: true,
		  scope:true,
		  bindings: {
			  ngModel: '=',
			  onSelect:'&',
			  daterangeoption:'='
		  },
		  templateUrl:baseUrl+'js/bower_components/qbmap/1.0.0/plugin.html',
		  controller: ['$scope','$rootScope','$ocLazyLoad','$injector','$element',function($scope,$rootScope,$ocLazyLoad,$injector,$element) {
		  	    var ctrl=this;
		  	    var local;
		  	    console.log($element);
		  	    $element.appendTo($("body"));
			    ctrl.$onInit=function(){
				    var map = new BMap.Map("l-map");
				    var geoc = new BMap.Geocoder();   
					//map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
					map.enableScrollWheelZoom(true);
					map.setCenter("成都市");
					map.setCurrentCity("成都市"); 


					//  // 设置标注
					var marker = new BMap.Marker(new BMap.Point(116.331398,39.897445));
					marker.enableDragging();
					marker.addEventListener("dragend", function (e) {
			            var pt = e.point;
			            geoc.getLocation(pt, function(rs){
			                console.log(rs.point.lat,rs.point.lng);
			                console.log(rs);
			                $scope.$apply(function(){
			                	ctrl.ngModel=rs.point;
			                });
			            });
			        });
					map.addOverlay(marker);
					var options = {
						onSearchComplete: function(results){
				          	map.centerAndZoom(new BMap.Point(116.331398,39.897445),14);
							// 判断状态是否正确
							if (local.getStatus() == BMAP_STATUS_SUCCESS){
								var s = [];
								for (var i = 0; i < results.getCurrentNumPois(); i ++){
									s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
								}
								document.getElementById("r-result").innerHTML = s.join("<br/>");
							}
						}
					};
					geoc.getPoint("北京市海淀区上地10街", function(point){
						$scope.$apply(function(){
			                	ctrl.ngModel=point;
			            });
						if (point) {
							map.centerAndZoom(point, 16);
							map.addOverlay(new BMap.Marker(point));
						}else{
							alert("您选择地址没有解析到结果!");
						}
					}, "北京市");
					local= new BMap.LocalSearch(map, options);
				};
				ctrl.close=function()
				{
					ctrl.show=false;
				};
				$scope.$on('showselect-qbmap', function(event,data) {
					ctrl.show=true;
					local.search(data);
				});
		  }]
	});
}
