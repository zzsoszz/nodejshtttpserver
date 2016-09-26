var qmicrocourse=angular.module('qmicrocourse',[])

qmicrocourse.service("qmicrocourseService",function($http){
 return {
          search:function(url,item){
            var param=$.param(item?item:"");
              return $http.get(url+"?"+param,{cache:false}).then(function(resp){
                if(resp.data.code=='success')
                {
                    return resp.data.json.datas;
                }
              });
          },
          add:function(url,item)
          {
             var param=$.param(item);
             return $http.get(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return item;
                }
                return null;
             });
          },
          delete:function(url,item)
          {
             var param=$.param(item);
             return $http.get(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return item;
                }
                return null;
             });
          },
          update:function(url,item)
          {
             var param=$.param(item);
             return $http.get(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return item;
                }
                return null;
             });
          }
  };
});
qmicrocourse.filter(  
    'to_trusted', ['$sce', function ($sce) {  
        return function (text) {  
            return $sce.trustAsHtml(text);  
        }  
    }]  
);
qmicrocourse.directive('ngHtmlCompile', function($compile) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
      scope.$watch(attrs.ngHtmlCompile, function(newValue, oldValue) {
          element.html(newValue);
          $compile(element.contents())(scope);
      });
      }
  }
});
qmicrocourse.component('people', {
  bindings: { people: '<' },
  template: '<h3>Some people:</h3>' +
            '<ul>' +
            '  <li ng-repeat="person in $$scope.people">' +
            '    <a ui-sref="person({ personId: person.id })">' +
            '      {{person.name}}' +
            '    </a>' +
            '  </li>' +
            '</ul>'
});
qmicrocourse.controller("searchController", function ($rootScope,$http,$location,$scope,qmicrocourseService) {
   $scope.daterangeoption={
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
    var schoolprovinces =provinceCitys.map(function(obj1){
                obj1.sub=obj1.sub.map(function(obj){
                   return {id:obj.name,name:obj.name};
                });
                return {id:obj1.name,name:obj1.name,sub:obj1.sub};
    });
    var lessonArray =[{id:1,name:"qingtian"},{id:2,name:"qingtian1"}];
    var genderArray =[{id:'1',name:"男"},{id:'2',name:"女"}];
    $scope.tableoption=
     {
       title:"微课堂",
       daterangeoption:$scope.daterangeoption,
       deleteEnable:true,
       editEnable:true,
       moveUpEnable:true,
       addEnable:true,
       moveDownEnable:true,
       detailEnable:true,
       pageEnable:true,
       enableDefaultAction:true,
       searchUrl:serviceApiUrl+'/course/micro/list',
       updateUrl:serviceApiUrl+'/course/micro/update',
       deleteUrl:serviceApiUrl+'/course/micro/delete',
       addUrl:serviceApiUrl+'/course/micro/add',
       addlink:'<a  class="actionbtn" ui-sref=\'go({module:"qmicrocourse",controller:"add"})\'>添加</a>',
       editlink:'<a class="update" ng-if="item.name==item.name" ui-sref=\'detail({module:"qmicrocourse",controller:"edit",id:item.id})\'></a>',
       detaillink:'<a class="detail" ng-if="item.name==item.name" ui-sref=\'detail({module:"qmicrocourse",controller:"detail",id:item.id})\'></a>',
       pageSize:10,
       cols:[
         {title:'关键词',name:"word",type:"text",addEnable:true,searchEnable:true,editEnable:true,detailEnable:true,listEnable:false},
         {title:'编号',name:"id",type:"text",addEnable:false,searchEnable:false,editEnable:false,detailEnable:false,listEnable:false},
         {title:'名称',name:"mainTitle",type:"text",addEnable:true,searchEnable:true,editEnable:true,detailEnable:true,listEnable:true},
         {title:'内容',name:"content",type:"text",addEnable:true,searchEnable:true,editEnable:true,detailEnable:true,listEnable:true},
         {title:'封面',name:"courseCover",type:"text",addEnable:true,searchEnable:true,editEnable:true,detailEnable:true,listEnable:true},
         {title:'课程类型',name:"province",type:"muliplyselect",typedata:schoolprovinces,addEnable:true,searchEnable:true,editEnable:true,detailEnable:true,listEnable:true},
       ]
     };
     $scope.onItemUpdateBefore=function(item)
     {
        console.log("onItemUpdateBefore:",item);
     };
     $scope.onItemAddBefore=function(item)
     {
        console.log("onItemAddBefore:",item);
        return item;
     };
     $scope.onItemDelBefore=function(item)
     {
        console.log("onItemDelBefore:",item);
     };
     // $scope.result=[ {
     //  "id": "1", 
     //    "name": "123456", 
     //    "actions": '<a ng-if="item.name==123456" ui-sref=\'go({module:"qmicrocourse",controller:"add"})\'>添加<a> <a ng-if="item.name==123456" ui-sref=\'detail({module:"qmicrocourse",controller:"edit",id:item.id})\'>编辑<a> '
     //  }];
});

qmicrocourse.controller("editController", function ($rootScope,$http,$location,$scope,$stateParams) {
  
  $scope.username="edit-"+$stateParams.id;
  $scope.$on("$destroy",function(){
    console.log("edit-destroy",$scope);
  })
  $scope.$on("$init",function(){
    console.log("edit-init",$scope);
  })
  
});

qmicrocourse.controller("addController", function ($rootScope,$http,$location,$scope,$stateParams,qmicrocourseService) {
   
   $scope.$on("$destroy",function(){
      console.log("add-destroy",$scope);
   })
   $scope.$on("$init",function(){
      console.log("add-init",$scope);
   })
   $scope.daterangeoption={
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
    var schoolprovinces =provinceCitys.map(function(obj1){
                obj1.sub=obj1.sub.map(function(obj){
                   return {id:obj.name,name:obj.name};
                });
                return {id:obj1.name,name:obj1.name,sub:obj1.sub};
    });
    var lessonArray =[{id:1,name:"qingtian"},{id:2,name:"qingtian1"}];
    var genderArray =[{id:'1',name:"男"},{id:'2',name:"女"}];
    $scope.doAdd=function(form)
    {
       if(form.$valid)
       {
         qmicrocourseService.add($scope.item);
       }else{
          alert("数据有错！");
       }
       
    }
});


qmicrocourse.controller("detailController", function ($rootScope,$http,$location,$scope,$stateParams) {
  $scope.username="detail-"+$stateParams.id;
  $scope.$on("$destroy",function(){
    console.log("detail-destroy",$scope);
  })
  $scope.$on("$init",function(){
    console.log("detail-init",$scope);
  })
});
