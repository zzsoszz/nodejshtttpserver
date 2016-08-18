var mainApp=angular.module("mainApp",["ui.router","oc.lazyLoad"]);
mainApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when("","/index");
    $stateProvider.state("index",{
        url:"/index",
        templateUrl:"/homepage/index.html"
    });
});
mainApp.controller("ParentController", function ($scope,$rootScope,$location) {
	$scope.name="i am parent!!";
	$scope.$on('transfername', function(event, data) {  
         $scope.name = data;
         console.log($scope.name);
     });
    $scope.$watch("name",function(newValue, oldValue)
    {
        $scope.$broadcast("transfernameToChild",newValue);
    });
});
mainApp.controller("ChildController", function ($scope,$rootScope,$location) {
    $scope.$watch("childname",function(newValue, oldValue)
    {
        $scope.$emit("transfername",newValue);
    });

    $scope.$on('transfernameToChild', function(event, data) {  
         $scope.childname = data;
     });
});



/*
var debugscript=$("<script>").attr("src","http://192.168.1.213:8080/target/target-script-min.js#anonymous");
$("body").css("-webkit-text-size-adjust","100%");
$("head").append(debugscript);
*/

