var module=angular.module('qcoursegroup',["Ajax","qselectcourse","qarticle","qselectthought"])
module.service("qcoursegroupService",function($http,$ajax){
 return {
          search:function(item){
          	var url=serviceApiUrl + '/businesscourse/list';
            var param=$.param(item?item:"");
              return $http.post(url+"?"+param).then(function(resp){
                  if(resp.data.code=='success')
	              {
                    var items=resp.data.json.list||resp.data.json.datas;
                    var rows=resp.data.json.count||resp.data.json.rows;
                    return {rows:rows,items:items};
	              }
              });
          },
          add:function(item)
          {
             var formdata = new FormData();
			 for ( var key in item ) {
			     formdata.append(key, item[key]);
			 }
			 return $ajax({type:'post',url:serviceApiUrl + '/businesscourse/schedule/add',method:"post",data:formdata,processData : false,contentType:false}).then(function (resp){
                if(resp.code=='success')
                {
                    return resp.json;
                }
                return null;
             });
          },
          get:function(item)
          {
          	 var url=serviceApiUrl + '/guest/info';
             var param=$.param(item);
             return $http.get(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return resp.data.json;
                }
                return null;
             });
          },
          delete:function(item)
          {
          	 var url=serviceApiUrl + '/guest/remove';
             var param=$.param(item);
             return $http.post(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return item;
                }
                return null;
             });
          },
          update:function(item)
          {
             var formdata = new FormData();
			 for ( var key in item ) {
			     formdata.append(key, item[key]);
			 }
             return $ajax({
		           type : 'post',
		           url :serviceApiUrl + '/guest/modify',
		           data : formdata,
		           cache : false,
		           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
		           contentType : false, // 不设置Content-type请求头
		           success : function(data){
		           		return data;
		           },
		           error : function(error){
		           		console.log(error);
		           		return null;
		           }
			});
          },
          sort:function(item)
          {
             var formdata = new FormData();
			 for ( var key in item ) {
			     formdata.append(key, item[key]);
			 }
             return $ajax({
		           type : 'post',
		           url :serviceApiUrl + '/guest/order',
		           data : formdata,
		           cache : false,
		           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
		           contentType : false, // 不设置Content-type请求头
		           success : function(data){
		           		return data;
		           },
		           error : function(error){
		           		console.log(error);
		           		return null;
		           }
			});
          }
  };
});
module.component('qcoursegroup', {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
	  },
	  templateUrl:baseUrl+'js/bower_components/qcoursegroup/1.0.0/plugin.html',
	  controller: ["qcoursegroupService",'$scope','$ocLazyLoad',function(service, $scope,$ocLazyLoad) {
			  		var aaa=$scope;
			  	    var ctrl=this;
			  	    ctrl.qpageroptions = {
				         currentpage: 1,
				         totalpage: 0
				    };
				    ctrl.option={};
				    ctrl.option.pageSize=10;
				    ctrl.$onInit=function(){
					    	ctrl.items=[];
					    	$(ctrl.ngModel).each(function(index){
					    		service.get({id:this}).then(function(item){
					    			if(item)
					    			{
					    				ctrl.items.push(item);
					    			}
					    		});
					    	});;
					    	console.log(ctrl.ngModel);
					    	/*
					    	$ocLazyLoad.load(["qselectcourse","qarticle","qselectthought"]).then(function(){
					    		console.log("module loaded");
					    	});
					    	*/
					};
                    ctrl.pagechange = function(page) {
					     var item = $.extend({},{ pageSize: ctrl.option.pageSize, pageNo: page });
					     ctrl.doSearch(item);
      				};
      				ctrl.doSearch = function(item) {
					     service.search( item).then(function(data) {
					     	 if(data && data.items.length>0){
					     	 	 ctrl.items = data.items;
					         	 ctrl.qpageroptions.totalpage = Math.ceil(data.rows / ctrl.option.pageSize);
					     	 }
					     });
					};
					ctrl.moveUp = function(item) {
					     var itemnew={
					        id:item.id,
					        order:1
					     };
					     service.sort(itemnew).then(function(data) {

					     });
					}
					ctrl.moveDown = function(item) {
					     var itemnew={
					        id:item.id,
					        order:2
					     };
					     service.update(itemnew).then(function(data) {
					     	
					     });
					 }
					 ctrl.doDel = function(item) {
					     var itemnew={
					        id:item.id
					     };
				         service.delete(itemnew).then(function(data) {
				         	ctrl.ngModel.splice(ctrl.ngModel.indexOf(data.id),1);
				         	ctrl.items.splice(ctrl.items.indexOf(data),1);
				         });
					 }
					 ctrl.doCancel=function(){
					 	ctrl.isShowPanel=false;
					 };
					 ctrl.showAddArticle=function(){
					 	 $scope.$broadcast('add-article', '');
					 };
					 ctrl.showSelectCourse=function(){
					 	 $scope.$broadcast('showselect-qselectcourse', '');
					 };
					 ctrl.showSelectCourseReview=function(){
					 	 $scope.$broadcast('showselect-qselectcourse', 'review');
					 };
					 ctrl.showSelectThough=function(){
					 	 $scope.$broadcast('showselect-qselectthought', '');
					 };
					 ctrl.addArticle=function(item){

					 	var scheduleitem={};
						scheduleitem.itemType="1";//文章
						scheduleitem.itemId=item.id;
						scheduleitem.stageType=1;
					 	service.add(scheduleitem).then(function(scheduleitemresult) {
							if(scheduleitemresult)
							{
								 	ctrl.items.push(scheduleitemresult);
								 	ctrl.ngModel.push(scheduleitemresult.id);
							}
						});

					 };
					 ctrl.addCourse=function(item)
					 {
					 	var scheduleitem={};
						scheduleitem.itemType="1";//文章
						scheduleitem.itemId=item.id;
						scheduleitem.stageType=1;
					 	service.add(scheduleitem).then(function(scheduleitemresult) {
							if(scheduleitemresult)
							{
								 	ctrl.items.push(scheduleitemresult);
								 	ctrl.ngModel.push(scheduleitemresult.id);
							}
						});
					 };
					 ctrl.addThought=function(item){
					 	
						var scheduleitem={};
						scheduleitem.itemType="1";//文章
						scheduleitem.itemId=item.id;
						scheduleitem.stageType=1;
					 	service.add(scheduleitem).then(function(scheduleitemresult) {
							if(scheduleitemresult)
							{
								 	ctrl.items.push(scheduleitemresult);
								 	ctrl.ngModel.push(scheduleitemresult.id);
							}
						});
					 	
					 };
			}]

	});

module.directive('qcoursegroupdirective',[function() {
	    return {
		        restrict: 'E',
		        priority: 100,
		        require: '?ngModel',
		        scope:{},
		        templateUrl:baseUrl+'js/bower_components/qpager/1.0.2/plugin.html',
		        link: function(scope, element, attrs,ngModelController) {
		        	console.log("init qcoursegroupdirective");
		        }
		    };
		}
]);