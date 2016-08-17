var mainApp=angular.module("mainApp",["ui.router","oc.lazyLoad"]);
mainApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when("","/index");
    $stateProvider.state("index",{
        url:"/index",
        templateUrl:"/homepage/index.html"
    });
});
mainApp.controller("parentController", function ($scope,$rootScope,$location) {
	$scope.name="i am parent!!";
	$scope.$on('transfername', function(event, data) {  
         $scope.name = data;
         console.log($scope.name);
     });
});
mainApp.controller("childController", function ($scope,$rootScope,$location) {
	$watch();
	$scope.$emit("transfername",$scope.childname);
});



/*
var debugscript=$("<script>").attr("src","http://192.168.1.213:8080/target/target-script-min.js#anonymous");
$("body").css("-webkit-text-size-adjust","100%");
$("head").append(debugscript);
*/

