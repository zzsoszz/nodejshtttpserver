var qmicrocourse=angular.module('qmicrocourse',[])

qmicrocourse.service("qmicrocourseService",function($http){
 return {
          search:function(url,item){
            var param=$.param(item?item:"");
              return $http.get(url+"?"+param,{cache:false}).then(function(resp){
                  if(resp.data.code=='success')
	              {
	                 // return {rows:resp.data.json.rows,items:resp.data.json.datas};
                    var items=resp.data.json.list||resp.data.json.datas;
                    var rows=resp.data.json.count||resp.data.json.rows;
                    return {rows:rows,items:items};
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
                    //return item.data.json;
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
qmicrocourse.controller("searchController", function ($rootScope,$http,$location,$scope,qmicrocourseService,$q,$state) {
 $scope.init = function() {
     $scope.qpageroptions = {
         currentpage: 1,
         totalpage: 0
     };
     $scope.option={};
     $scope.option.pageSize=10;
     var task1 = qmicrocourseService.search(serviceApiUrl + '/web/course/type/list').then(function(data) {
         $scope.courseTypeIdArray = data.items;
     });
     $q.all([task1]).then(function() {
        $scope.doSearch({});
     });
 }
 $scope.init();
 $scope.pagechange = function(page) {
     var item = $.extend($scope.item ? $scope.item : {}, { pageSize: $scope.option.pageSize, pageNo: page });
     $scope.doSearch(item);
 }
 $scope.doSearch = function(item) {
     qmicrocourseService.search(serviceApiUrl + '/course/micro/list', item).then(function(data) {
         $scope.items = data.items;
         $scope.qpageroptions.totalpage = Math.ceil(data.rows / $scope.option.pageSize);
     });
 }
 $scope.moveUp = function(item) {
     var itemnew={
        id:item.id,
        order:1
     };
     qmicrocourseService.update(serviceApiUrl + '/course/micro/order', itemnew).then(function(data) {
        $scope.doSearch({});
     });
 }
 $scope.moveDown = function(item) {
     var itemnew={
        id:item.id,
        order:2
     };
     qmicrocourseService.update(serviceApiUrl + '/course/micro/order', itemnew).then(function(data) {
        $scope.doSearch({});
     });
 }
 $scope.doDel = function(item) {
     var itemnew={
        id:item.id
     };
     qmicrocourseService.update(serviceApiUrl + '/course/micro/delete', itemnew).then(function(data) {
        $scope.doSearch({});
     });
 }
 $scope.showEdit = function(item) {
     $state.go("detail",{module:"qmicrocourse",controller:"edit",id:item.id});//,
 }
 $scope.showAdd=function()
 {
     $state.go("go",{module:"qmicrocourse",controller:"add"});//,
 }
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
          $scope.item.courseTypeId_desc=data.courseTypeName;
          $scope.item.imageUrl=$scope.item.imageUrl||"css/images/uploadMerFile.png";
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
            type:'POST',
            dataType:'json',
            success: function (data) {
                void 0;
                if(data.code=='success'){
                    $scope.$apply(function () {
                        alert("操作成功");
                    })
                }else{
                    alert("操作失败");
                }
            }
         };
         $('#editForm').attr("action",serviceApiUrl+'/course/micro/update');
         //$('#editForm').submit();//
         $('#editForm').ajaxForm(options).ajaxSubmit(options);
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
    $scope.doSearch = function(item) {
         qmicrocourseService.search(serviceApiUrl + '/course/list', item).then(function(data) {
             $scope.items = data.items;
             $scope.qpageroptions.totalpage = Math.ceil(data.rows / $scope.option.pageSize);
         });
    }
    $scope.pagechange = function(page) {
       var item = $.extend($scope.item ? $scope.item : {}, { pageSize: $scope.option.pageSize, pageNo: page });
       $scope.doSearch(item);
    }
    $scope.init=function(){
         $scope.type=1;
         $scope.qpageroptions = {
           currentpage: 1,
           totalpage: 0
         };
         $scope.option={};
         $scope.option.pageSize=5;
        var task1=qmicrocourseService.search(serviceApiUrl+'/web/course/type/list').then(function(data){
            $scope.courseTypeIdArray=data.items;
        });
        $scope.doSearch({});
    };
    $scope.init();
    $scope.doAdd=function(form)
    {
       if(form.$valid)
       {
          var options={
            type:'POST',
            dataType:'json',
            success: function (data) {
                void 0;
                if(data.code=='success'){
                    $scope.$apply(function () {
                        alert("操作成功");
                    })
                }else{
                    alert("操作失败");
                }
            }
         };
         $('#addForm').attr("action",serviceApiUrl+'/course/micro/add');
         $('#addForm').ajaxForm(options).ajaxSubmit(options);
       }
       else
       {
          alert("数据有错！");
       }
    }

    $scope.doAddVideo=function(form)
    {
       if(form.$valid)
       {

          var courseIds=$scope.items.filter(function(obj){
            if(obj.micro)
            {
              return obj;
            }
          }).map(function(obj){
              return obj.id;
          }).join(",");
          $("#courseIds").val(courseIds);
          var options={
            type:'POST',
            dataType:'json',
            success: function (data) {
                void 0;
                if(data.code=='success'){
                    $scope.$apply(function () {
                        alert("操作成功");
                    })
                }else{
                    alert("操作失败");
                }
            }
         };
         $('#addForm2').attr("action",serviceApiUrl+'/course/micro/add');
         $('#addForm2').ajaxForm(options).ajaxSubmit(options);
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
