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
       moveDownEnable:true,
       pageEnable:true,
       enableDefaultAction:true,
       searchUrl:serviceApiUrl+'/web/course/type/list',
       updateUrl:serviceApiUrl+'/web/course/type/update',
       deleteUrl:serviceApiUrl+'/web/course/type/delete',
       addUrl:serviceApiUrl+'/web/course/type/add',
       pageSize:3,
       cols:[
        {title:'名称',name:"name",type:"text"},
         {title:'时间',name:"createtime",type:"daterangepicker"},
         {title:'省份',name:"province",type:"muliplyselect",typedata:schoolprovinces},
         {title:'学校',name:"school",type:"muliplyselect",parent:"province"},
         //  {title:'编号',name:"id",type:"text",require:true},
         // {title:'文字',name:"name",type:"text",require:true},
         // {title:'多选',name:"lessons",type:"muliplyselect",typedata:lessonArray},
         {title:'html格式',name:"actions",type:"html"},
       ]
    };
    $scope.qpageroptions={
            currentpage:1
    };
    if(!$scope.items)
    {
      $scope.items=[];
    }
    $scope.items=[ { "name": "123456", "actions": '<a ui-sref=\'basic{module:"qmicrocourse",controller:"add"}\'>添加<a>' } ];
    // $scope.$watch("$$scope.qpageroptions.currentpage",function(currentpage,old){
    //   var item=$.extend($scope.item?$scope.item:{},{pagesize:$scope.tableoption.pageSize,currentpage:currentpage});
    // });
    $scope.showPanel=function(mode)
    {
      $scope.mode=mode;
      $scope.isShowPanel=!$scope.isShowPanel;
      $scope.item={};
      //$scope.go({});
    };
    $scope.doSubmit=function($event,qdatatableForm)
    {
      $event.preventDefault();
      if(qdatatableForm.$valid)
      {
        if($scope.mode=='search')
        {
          $scope.doSearch($scope.item);
        }else{
          $scope.doSave($scope.item);
        }
      }
    };
    $scope.doSearch=function(item)
    {
      qmicrocourseService.search($scope.tableoption.searchUrl,item).then(function(data){
        $scope.items=data;
        $scope.qpageroptions.totalpage=Math.ceil($scope.items.length/$scope.tableoption.pageSize);
      });
      $scope.isShowPanel=false;
    };
    $scope.doSave=function(item)
    {
      console.log(item);
      var index =$scope.items.indexOf(item);
      console.log(index);
      if(index<0)
      {
        $scope.onItemAddBefore({"item":item});
        qmicrocourseService.add($scope.tableoption.addUrl,item).then(function(data){
        var item=data;
        $scope.items.push(item);
        $scope.doSearch({});
      });
      }else{
        $scope.onItemUpdateBefore({"item":item});
        qmicrocourseService.update($scope.tableoption.updateUrl,item).then(function(data){
        var item=data;
        $scope.item=item;
        $scope.doSearch({});
      });
      }
      $scope.isShowPanel=false;
    };
    $scope.doDel=function(item)
    {
      $scope.onItemDelBefore({"item":item});
      qmicrocourseService.delete($scope.tableoption.deleteUrl,item).then(function(data){
        var item=data;
        $scope.doSearch({});
    });
      $scope.items.splice($scope.items.indexOf(item),1);
    };
    $scope.doCancel=function()
    {
      $scope.isShowPanel=false;
    };
    $scope.moveItem = function(item, dir) {
        var index =$scope.items.indexOf(item);
        console.log(index);
        if (dir === 'up') {
          if(index!=0)
          {
        $scope.items.splice(index - 1, 2, item, $scope.items[index - 1]);
          }
        } else {
          if(index!=$scope.items.length-1){
          $scope.items.splice(index, 2, $scope.items[index + 1], item);
          }
        }
    };
    $scope.moveItem = function(item, dir) {
        var index =$scope.items.indexOf(item);
        console.log(index);
        if (dir === 'up') {
          if(index!=0)
          {
        $scope.items.splice(index - 1, 2, item, $scope.items[index - 1]);
          }
        } else {
          if(index!=$scope.items.length-1){
          $scope.items.splice(index, 2, $scope.items[index + 1], item);
          }
        }
    };
    $scope.showEdit=function(item)
    {
      $scope.mode='edit';
      $scope.item=item;
      $scope.isShowPanel=true;
    };
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

qmicrocourse.controller("addController", function ($rootScope,$http,$location,$scope,$stateParams) {
  
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

    
    $scope.model=[
       {title:'编号',name:"id",type:"text"},
       {title:'名称',name:"name",type:"text"},
       {title:'时间',name:"createtime",type:"daterangepicker"},
       {title:'省份',name:"province",type:"muliplyselect",typedata:schoolprovinces},
       {title:'学校',name:"school",type:"muliplyselect",parent:"province"},
       {title:'编号',name:"id",type:"text",require:true},
       {title:'文字',name:"name",type:"text",require:true},
       {title:'多选',name:"lessons",type:"muliplyselect",typedata:lessonArray},
       {title:'html格式',name:"actions",type:"html"},
    ];
    
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
