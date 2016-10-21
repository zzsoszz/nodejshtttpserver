var app = angular.module('myApp', []);
app.controller('mainCtrl', function($scope) {
  $scope.values = [1, 2, 3];
  $scope.handleSubmit = function(i) {
    console.log(i);
  }
});