var mainApp=angular.module("mainApp",["ui.router","oc.lazyLoad",'ui.date','daterangepicker']);
mainApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when("","/index");
    $stateProvider.state("index",{
        url:"/index",
        templateUrl:"child.html"
    });
});

mainApp.config(function($provide){
    $provide.decorator('ngShowDirective', ['$delegate', function($delegate) {
        $delegate.shift();
        return $delegate;
    }]);
});

mainApp.directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        console.log(ctrl);
        var firstPassword = '#' + attrs.pwCheck;
        elem.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
}]);


var NG_HIDE_CLASS = 'ng-hide';
var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';
mainApp.directive('ngShow',['$animate', function($animate) {
  return {
    restrict: 'A',
    multiElement: true,
    priority: 100,
    link: function(scope, element, attr) {
      scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
        if(value=="true")
        {
            value=true;
        }
         if(value=="false")
        {
            value=false;
        }
        $animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
          tempClasses: NG_HIDE_IN_PROGRESS_CLASS
        });
      });
    }
  };
}]);

mainApp.controller("ParentController", function ($scope,$rootScope,$location,$timeout) {
	$scope.name="i am parent!!";
    $scope.ishow=true;
	$scope.ishow2;
	$scope.$watch("ishow",function(oldval,newval)
	{
		console.log("oldval",oldval);
		console.log("newval",newval);
		$scope.ishow2=newval;
	});
	
	$scope.fullname;
	$scope.firstname;
	$scope.lastname;
	$scope.$watch(
		function (scope){
			return {firstname:scope.firstname,lastname:scope.lastname};
		}
		,function(obj, oldObj)
		{
			$timeout(function () {
				//$timeout used to safely include the asignation inside the angular digest processs
				console.log(obj);
				$scope.fullname = obj.firstname + obj.lastname;
			});
		}
		,true
	);
	
    $scope.datePicker = {startDate: null, endDate: null};
	$scope.$on('transfername', function(event, data) {  
         $scope.name = data;
         console.log($scope.name);
     });
    $scope.$watch("name",function(newValue, oldValue)
    {
        $scope.$broadcast("transfernameToChild",newValue);
    });
    $scope.submitForm=function(flag)
    {
        console.log("submit",flag);
    };
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

