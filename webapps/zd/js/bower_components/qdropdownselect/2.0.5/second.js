  var mainApp=angular.module("secondApp",[]);
  mainApp.controller("secondController", function ($scope,$rootScope,$http,$location, $state, $stateParams) {
			console.log("state:",$state);	
			console.log("stateParams:",$stateParams);	
			$scope.aaaa="qingtian"
  })