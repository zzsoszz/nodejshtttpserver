var qmicrocourse=angular.module('qmicrocourse',[])

qmicrocourse.service("qmicrocourseService",function($http){
 return {
          search:function(url,item){
            var param=$.param(item?item:"");
              return $http.get(url+"?"+param,{cache:false}).then(function(resp){
                  if(resp.data.code=='success')
	              {
	                  return {rows:resp.data.json.rows,items:resp.data.json.datas};
	              }
              });
          },
          add:function(url,item)
          {
             var param=$.param(item);
             return $http.get(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return resp.data.json;
                }
                return null;
             });
          },
          get:function(url,item)
          {
             var param=$.param(item);
             return $http.get(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return resp.data.json;
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
             return $http.post(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return item.data.json;
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
qmicrocourse.controller("searchController", function ($rootScope,$http,$location,$scope,qmicrocourseService,$q) {
    $scope.init=function(){
      var task1=qmicrocourseService.search(serviceApiUrl+'/web/course/type/list').then(function(data){
          $scope.courseTypeIdArray=data.items;
      });
      $q.all([task1]).then(function(){
       
       $scope.tableoption=
       {
           title:"微课堂",
           daterangeoption:$rootScope.daterangeoption,
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
                    {
               title:'编号',
               name:"id",type:"text",
               
               
               addEnable:false,
               searchEnable:false,
               editEnable:false,
               detailEnable:false,
               listEnable:false,
             },
             {
               title:'课程标题',
               name:"mainTitle",type:"text",
               
               
               addEnable:true,
               searchEnable:true,
               editEnable:true,
               detailEnable:true,
               listEnable:true,
             },
             {
               title:'是否付费',
               name:"free",type:"muliplyselect",
               typedata:$rootScope.freeArray,
               
               addEnable:false,
               searchEnable:false,
               editEnable:false,
               detailEnable:false,
               listEnable:true,
             },
             {
               title:'课程类型',
               name:"courseTypeId",type:"muliplyselect",
               typedata:$scope.courseTypeIdArray,
               
               addEnable:true,
               searchEnable:true,
               editEnable:true,
               detailEnable:true,
               listEnable:true,
             },
             {
               title:'课程内容',
               name:"content",type:"richtext",
               
               
               addEnable:true,
               searchEnable:true,
               editEnable:true,
               detailEnable:true,
               listEnable:true,
             },
             {
               title:'封面',
               name:"courseCover",type:"img",
               
               
               addEnable:true,
               searchEnable:true,
               editEnable:true,
               detailEnable:true,
               listEnable:true,
             },
           ]
         };

      });
     
     }
     $scope.init();
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

qmicrocourse.controller("editController", function ($rootScope,$http,$location,$scope,$stateParams,qmicrocourseService) {
  $scope.username="edit-"+$stateParams.id;
  $scope.$on("$destroy",function(){
    console.log("edit-destroy",$scope);
  });
  $scope.$on("$init",function(){
    console.log("edit-init",$scope);
  });
  $scope.init=function(){
    	var item={};
    	item.id=$stateParams.id;
    	qmicrocourseService.get(serviceApiUrl+'/course/info',item).then(function(data){
  		    $scope.item=data;
  	  });
      var task1=qmicrocourseService.search(serviceApiUrl+'/web/course/type/list').then(function(data){
          $scope.courseTypeIdArray=data.items;
      });
  };
  $scope.init();
  $scope.doUpdate=function(form)
  {
       if(form.$valid)
       {
         var options={
            dataType:'json',
            success: function (data) {
                void 0;
                if(data.code=='success'){
                    $scope.$apply(function () {
                        alert("添加成功");
                    })
                }else{
                    alert("添加失败");
                }
            }
         };
         $('#addForm').attr("action",serviceApiUrl+'/course/micro/add');
         $('#addForm').ajaxForm(options).ajaxSubmit(options);
         //qmicrocourseService.update(serviceApiUrl+'/course/micro/add',$scope.item);
       }else{
          alert("数据有错！");
       }
  }
});

qmicrocourse.controller("addController", function ($rootScope,$http,$location,$scope,$stateParams,qmicrocourseService) {
    $scope.$on("$destroy",function(){
      console.log("add-destroy",$scope);
    })
    $scope.$on("$init",function(){
      console.log("add-init",$scope);
    })
    $scope.doAdd=function(form)
    {
       if(form.$valid)
       {
         qmicrocourseService.add(serviceApiUrl+'/course/micro/add',$scope.item);
       }
       else
       {
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
