var qmicrocourse=angular.module('qmicrocourse',[])

qmicrocourse.service("qmicrocourseService",function(){
  
});

qmicrocourse.controller("searchController", function ($rootScope,$http,$location,$scope) {

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
     enableDefaultAction:false,
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
  $scope.username="add-"+$stateParams.id;
  $scope.$on("$destroy",function(){
    console.log("add-destroy",$scope);
  })
  $scope.$on("$init",function(){
    console.log("add-init",$scope);
  })
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
