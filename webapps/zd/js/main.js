var baseUrl="/zd/";

var mainApp=angular.module("mainApp",
  ["ui.router","oc.lazyLoad",'ui.date','daterangepicker','qui',
  // 'qguestModule',
  'qcoursegroupModule'
  ]
);


(function($) {
  function Ajax($rootScope, $dfd) {
    var ajax = jQuery.ajax;
    return function(options) {
      var promise = ajax(options),
          dfd = $dfd();
      promise.done(function(data) {
        $rootScope.$apply(function() {
          dfd.resolve(data);
        });
      }).fail(function() {
        var failArgs = arguments;

        $rootScope.$apply(function() {
          dfd.reject.apply(dfd, failArgs);
        });
      });

      return dfd.promise();
    };
  }
  angular.module("Ajax", [])  
  Ajax.$inject = ['$rootScope', '$dfd'];
  angular.module("Ajax")
    .provider("$ajax", function() {
      this.defaults = {};

      this.setOptions = function() {
        $.ajaxSetup(this.defaults = options);
      };

      this.getOptions = function() {
        return this.defaults;
      };

      this.$get = Ajax;
    });
}(jQuery));

(function($) {
  function Dfd() {
    return function() {
      return jQuery.Deferred();
    };
  }
  angular.module("Ajax")
    .factory("$dfd", Dfd);
}(jQuery));




mainApp.config(function($provide){
    $provide.decorator('ngShowDirective', ['$delegate', function($delegate) {
        $delegate.shift();
        return $delegate;
    }]);
});
mainApp.config(['$httpProvider', function($httpProvider) {
       $httpProvider.defaults.useXDomain = true;
       // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
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



// alert(is.Array([])); // true
// alert(is.Date(new Date)); // true
// alert(is.RegExp(/reg/ig)); // true
// mainApp.config(function ($stateProvider,$urlRouterProvider) {
//       $urlRouterProvider.when("","").otherwise("");
//       $stateProvider.state("basic",{
//           url:"/{module}/{controller}",
//           // templateUrl:baseUrl+"/js/bower_components/qdatatable/2.0.1/search.html",
//           templateUrl: function ($stateParams){
//             var tempurl=baseUrl+'/js/app/' +$stateParams.module+'/'+$stateParams.controller+'.html';
//             console.log(tempurl);
//             return tempurl;
//           },
//           controllerProvider: function($stateParams) {
//               var ctrlName =  $stateParams.controller+"Controller";
//               console.log(ctrlName);
//               return ctrlName;
//           },
//           resolve: {
//               loadMyCtrl: ['$ocLazyLoad','$stateParams', function ($ocLazyLoad,$stateParams) {
//                   var controllerjs=baseUrl+'/js/app/' +$stateParams.module+'/controller.js';
//                   console.log(controllerjs);
//                   return $ocLazyLoad.load({
//                       files: [controllerjs]
//                   })
//               }]
//           }
//       });
      
//       $stateProvider.state("detail",{
//           url:"/{module}/{controller}/{id}",
//           // templateUrl:baseUrl+"/js/bower_components/qdatatable/2.0.1/search.html",
//           templateUrl: function ($stateParams){
//             var tempurl=baseUrl+'/js/app/' +$stateParams.module+'/'+$stateParams.controller+'.html';
//             console.log(tempurl);
//             return tempurl;
//           },
//           controllerProvider: function($stateParams) {
//               var ctrlName =  $stateParams.controller+"Controller";
//               console.log(ctrlName);
//               return ctrlName;
//           },
//           resolve: {
//               loadMyCtrl: ['$ocLazyLoad','$stateParams', function ($ocLazyLoad,$stateParams) {
//                   var controllerjs=baseUrl+'/js/app/' +$stateParams.module+'/controller.js';
//                   console.log(controllerjs);
//                   return $ocLazyLoad.load({
//                       files: [controllerjs]
//                   })
//               }]
//           }
//       });
// });





// mainApp.service("qmicrocourseService",function(){
//   this.haha=function(){
//   };
// });
// mainApp.run(function($injector){
//  // console.log($injector.get("qmicrocourseService"));
// });

//http://localhost:8888/index.html#/qmicrocourse/search


var is ={
 types : ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
};
for(var i = 0, c; c = is.types[i ++ ]; ){
    is[c] = (function(type){
        return function(obj){
           return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    })(c);
}
mainApp.config(function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider.when("","").otherwise("");
      $stateProvider.state("go",{
            url:"/{module}/{controller}",
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
                loadMyCtrl: ['$ocLazyLoad','$stateParams','$injector', function ($ocLazyLoad,$stateParams,$injector) {
                    //console.log($injector);
                    var controllerjs=baseUrl+'/js/app/' +$stateParams.module+'/controller.js';
                   // console.log(controllerjs);
                    return $ocLazyLoad.load({
                        files: [controllerjs]
                    }).then(function(data) {
                      // var module= angular.module(data)
                      // var com=module.controller("searchController");
                      // var service = $injector.get("qmicrocourseService");
                    });
                }]
            }
      });
      $stateProvider.state("detail",{
            url:"/{module}/{controller}/{id}",
            templateUrl: function ($stateParams){
              var tempurl=baseUrl+'/js/app/' +$stateParams.module+'/'+$stateParams.controller+'.html';
              console.log(tempurl);
              return tempurl;
            }
            ,
            controllerProvider: function($stateParams) {
                var ctrlName =  $stateParams.controller+"Controller";
                console.log(ctrlName);
                return ctrlName;
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad','$stateParams','$injector', function ($ocLazyLoad,$stateParams,$injector) {
                    var controllerjs=baseUrl+'/js/app/' +$stateParams.module+'/controller.js';
                    return $ocLazyLoad.load({
                        files: [controllerjs]
                    }).then(function(data) {
                    });
                }]
            }
        });

});


mainApp.controller("mainController", function ($rootScope,$http,$location,$scope) {
   $rootScope.daterangeoption={
        maxDate:new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+1)),
        alwaysShowCalendars:true,
        autoApply:true,
        "ranges": {
            '不限时间': ["1900-01-01","2050-01-01"],
            '今天': [moment(), moment()],
            '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '这周': [moment().startOf('week'), moment()],
            '最近7天': [moment().subtract(6, 'days'), moment()],
            '最近30天': [moment().subtract(29, 'days'), moment()],
            '当月': [moment().startOf('month'), moment().endOf('month')],
            '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale : {
            format : 'YYYY-MM-DD',
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        },
        autoUpdateInput:true,
        singleDatePicker:false,
        startDate:'1980-01-01',
        endDate:'2050-01-01',
        showDropdowns : true
    };
    $rootScope.singledateoption={
        alwaysShowCalendars:true,
        autoApply:true,
        locale : {
            format : 'YYYY-MM-DD',
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        },
        autoUpdateInput:true,
        singleDatePicker:true,
        startDate:moment(),
        endDate:'2050-01-01',
        showDropdowns : true
    };
    $rootScope.timepickeroption={
        //maxDate:new Date(new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+(new Date().getDate()+1)),
        alwaysShowCalendars:true,
        autoApply:true,
        locale : {
            format : 'YYYY-MM-DD HH:mm:ss',
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        },
        timePicker:true,
        timePicker24Hour:true,
        autoUpdateInput:true,
        singleDatePicker:true,
        showDropdowns : true
    };
    $rootScope.provinceArray =provinceCitys.map(function(obj1){
                obj1.sub=obj1.sub.map(function(obj){
                   return {id:obj.name,name:obj.name};
                });
                return {id:obj1.name,name:obj1.name,sub:obj1.sub};
    });
    $rootScope.lessonArray =[{id:1,name:"qingtian"},{id:2,name:"qingtian1"}];
    $rootScope.genderArray =[{id:'1',name:"男"},{id:'2',name:"女"}];
    $rootScope.freeArray =[{id:'1',name:"付费"},{id:'2',name:"免费"}];
    $rootScope.typeArray =[{id:'1',name:"文章"},{id:'2',name:"视频"}];



});
