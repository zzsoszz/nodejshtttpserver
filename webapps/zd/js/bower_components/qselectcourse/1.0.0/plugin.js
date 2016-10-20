var qguestModule=angular.module('qselectcourse',["Ajax"])
qguestModule.service("qselectcourseService",function($http,$ajax){
 return {
          search:function(item){
          	var url=serviceApiUrl + '/course/query';
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
			 return $ajax({type:'post',url:serviceApiUrl + '/course/add',method:"post",data:formdata,processData : false,contentType:false}).then(function (resp){
                if(resp.code=='success')
                {
                    return resp.json;
                }
                return null;
             });
          },
          get:function(item)
          {
          	 var url=serviceApiUrl + '/course/info';
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
          	 var url=serviceApiUrl + '/course/remove';
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
		           url :serviceApiUrl + '/course/modify',
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
             return $.ajax({
		           type : 'post',
		           url :serviceApiUrl + '/',
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




qguestModule.component('qselectcourse', {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
		  onSelect:'&'
	  },
	  templateUrl:baseUrl+'js/bower_components/qselectcourse/1.0.0/plugin.html',
			  controller: ["qselectcourseService",'$scope','$ocLazyLoad','$injector',function(service, $scope,$ocLazyLoad,$injector) {
			  	    var ctrl=this;
			  	    ctrl.qpageroptions = {
				         currentpage: 1,
				         totalpage: 0
				    };
				    ctrl.item={};
				    ctrl.option={};
				    ctrl.option.pageSize=5;
				    ctrl.$onInit=function(){
					    	//ctrl.pagechange(1);
					    	ctrl.items=[];
					    	$(ctrl.ngModel).each(function(index){
					    		service.get({id:this}).then(function(item){
					    			if(item)
					    			{
					    				ctrl.items.push(item);
					    			}
					    		});
					    	});
					    	console.log(ctrl.ngModel);
					    	$ocLazyLoad.load("qmicrocourse").then(function() {
						        var $serviceTest = $injector.get("qmicrocourseService");
						        var task1 = $serviceTest.search(serviceApiUrl + '/web/course/type/list').then(function(data) {
							         ctrl.courseTypeIdArray = data.items;
							    });
						    });
					};
                    ctrl.pagechange = function(page) {
					     var item = $.extend({},{ pageSize: ctrl.option.pageSize, pageNo: page });
					     ctrl.doSearch(item);
      				};
      				ctrl.doSubmit=function(form)
      				{
      					ctrl.doSearch(ctrl.item);
      				};
      				ctrl.doSearch = function(item) {
      					 var itemnew=item;
      					 if( itemnew.pageSize == undefined)
      					 {
      					 	itemnew= $.extend(itemnew,{ pageSize: ctrl.option.pageSize, pageNo: 1});
      					 }
					     service.search(itemnew).then(function(data) {
					     	 if(data && data.items.length>0){
					     	 	 ctrl.items = data.items;
					         	 ctrl.qpageroptions.totalpage = Math.ceil(data.rows / ctrl.option.pageSize);
					     	 }
					     });
					}
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
					 ctrl.showEdit = function(item) {
					 	 ctrl.mode='edit';
					 	 ctrl.show=true;
					 	 ctrl.item=item;
					 }
					 ctrl.haveselectitem={};
					 ctrl.doSelect=function(item)
					 {
					 	 ctrl.haveselectitem=item;
					 	 if(ctrl.ngModel){
					 	 	ctrl.ngModel=item;
					 	 }
					 	 ctrl.onSelect({"item":item});
					 	 ctrl.show=false;
					 }
					 ctrl.showAdd=function(item)
					 {
					 	 ctrl.mode='add';
					 	 ctrl.show=true;
					 	 ctrl.item=item;
					 }
					 ctrl.doCancel=function(){
					 	ctrl.show=false;
					 }
					 ctrl.doSave=function(form)
					 {
					 	var itemnew={};
					 	itemnew=ctrl.item;
					 	if(ctrl.mode=='add')
					 	{
							service.add(itemnew).then(function(item) {
								if(item)
								{
									 	ctrl.items.push(item);
									 	ctrl.ngModel=item;
						       			ctrl.show=false;
								}
						     });
					 	}else if(ctrl.mode=='edit')
					 	{
					 		delete itemnew.createTime;
					 		delete itemnew.updateTime;
							service.update( itemnew).then(function(data) {
						        ctrl.show=false;
						    });
					 	}
					 };
					 $scope.$on('showselect-qselectcourse', function(event,data) {
							ctrl.show=true;
					 });

			}]

	});