  var mainApp=angular.module("addGroupApp",[]);
  mainApp.controller("addGroupController", function ($scope,$rootScope,$http,$location, $state, $stateParams) {
			console.log("state:",$state);	
			console.log("stateParams:",$stateParams);	
			$scope.aaaa="qingtian"
  })