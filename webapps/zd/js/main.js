var baseUrl="/zd/";

var mainApp=angular.module("mainApp",["ui.router","oc.lazyLoad",'ui.date','daterangepicker','qui']);
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
mainApp.directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){
      //change event is fired when file is selected
      el.bind('change',function(){
        scope.$apply(function(){
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        });
      });
    }
  }
});

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

mainApp.config(function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider.when("","basic");
      $stateProvider.state("basic",{
          url:"/{module}/{controller}",
          // templateUrl:baseUrl+"/js/bower_components/qdatatable/2.0.1/search.html",
          templateUrl: function ($stateParams){
            var tempurl=baseUrl+'/js/app/' +$stateParams.module+'/'+$stateParams.controller+'.html';
            console.log(tempurl);
            return tempurl;
          },
          controllerProvider: function($stateParams) {
              var ctrlName =  $stateParams.controller+"Controller";
              console.log(ctrlName);
              return ctrlName;
          },
          resolve: {
              loadMyCtrl: ['$ocLazyLoad','$stateParams', function ($ocLazyLoad,$stateParams) {
                  var controllerjs=baseUrl+'/js/app/' +$stateParams.module+'/controller.js';
                  console.log(controllerjs);
                  return $ocLazyLoad.load({
                      files: [controllerjs]
                  })
              }]
          }
      });
      
      $stateProvider.state("detail",{
          url:"/{module}/{controller}/{id}",
          // templateUrl:baseUrl+"/js/bower_components/qdatatable/2.0.1/search.html",
          templateUrl: function ($stateParams){
            var tempurl=baseUrl+'/js/app/' +$stateParams.module+'/'+$stateParams.controller+'.html';
            console.log(tempurl);
            return tempurl;
          },
          controllerProvider: function($stateParams) {
              var ctrlName =  $stateParams.controller+"Controller";
              console.log(ctrlName);
              return ctrlName;
          },
          resolve: {
              loadMyCtrl: ['$ocLazyLoad','$stateParams', function ($ocLazyLoad,$stateParams) {
                  var controllerjs=baseUrl+'/js/app/' +$stateParams.module+'/controller.js';
                  console.log(controllerjs);
                  return $ocLazyLoad.load({
                      files: [controllerjs]
                  })
              }]
          }
      });
});