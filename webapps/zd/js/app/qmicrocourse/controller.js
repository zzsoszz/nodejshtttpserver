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

qmicrocourse.controller("editController", function ($rootScope,$http,$location,$scope,$stateParams,qmicrocourseService) {
  $scope.username="edit-"+$stateParams.id;
  $scope.$on("$destroy",function(){
    console.log("edit-destroy",$scope);
  })
  $scope.$on("$init",function(){
    console.log("edit-init",$scope);
  })
  $scope.init=function(){
  	var item={};
  	item.id=$stateParams.id;
  	qmicrocourseService.search(serviceApiUrl+'/course/micro/list',item).then(function(data){
		$scope.item=data.items[0];
	});
  };
  $scope.init();
  $scope.doUpdate=function(form)
  {
       if(form.$valid)
       {
         qmicrocourseService.update(serviceApiUrl+'/course/micro/add',$scope.item);
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
