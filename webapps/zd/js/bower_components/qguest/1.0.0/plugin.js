var qguestModule=angular.module('qguestModule',[])
qguestModule.service("qguestService",function($http){
 return {
          search:function(item){
          	var url=serviceApiUrl + '/guest/list';
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
             return $.ajax({
		           type : 'post',
		           url :serviceApiUrl + '/guest/add',
		           data : formdata,
		           cache : false,
		           processData : false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
		           contentType : false, // 不设置Content-type请求头
		           // success : function(data){
		           // 		return data.json;
		           // },
		           // error : function(error){
		           // 		console.log(error);
		           // 		return null;
		           // }
			}).then(function(data)
			{
				return data.json;
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
             return $.ajax({
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
             return $.ajax({
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
qguestModule.component('qguest', {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
	  },
	  templateUrl:baseUrl+'js/bower_components/qguest/1.0.0/plugin.html',
			  controller: ["qguestService",'$scope',function(service, $scope) {
			  		var aaa=$scope;
			  	    var ctrl=this;
			  	    ctrl.qpageroptions = {
				         currentpage: 1,
				         totalpage: 0
				    };
				    ctrl.option={};
				    ctrl.option.pageSize=10;
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
					    	});;
					    	console.log(ctrl.ngModel);
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
					}
					ctrl.moveUp = function(item) {
					     var itemnew={
					        id:item.id,
					        order:1
					     };
					     service.sort(itemnew).then(function(data) {
					        //ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
					     });
					}
					ctrl.moveDown = function(item) {
					     var itemnew={
					        id:item.id,
					        order:2
					     };
					     service.update(itemnew).then(function(data) {
					        //ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
					     });
					 }
					 ctrl.doDel = function(item) {
					     var itemnew={
					        id:item.id
					     };
				         service.delete(itemnew).then(function(data) {
				         	ctrl.items.splice(ctrl.items.indexOf(item),1);
				             //ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
				         });
					 }
					 ctrl.showEdit = function(item) {
					 	 ctrl.mode='edit';
					 	 ctrl.isShowPanel=true;
					 	 ctrl.item=item;
					     //$state.go("qmicrocourse/edit",{id:item.id});
					 }
					 ctrl.showAdd=function(item)
					 {
					 	 ctrl.mode='add';
					 	 ctrl.isShowPanel=true;
					 	 ctrl.item=item;
					     //$state.go("qmicrocourse/add");
					 }
					 ctrl.doCancel=function(){
					 	ctrl.isShowPanel=false;
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
									 $scope.$apply(function(){
									 	ctrl.items.push(item);
						       			ctrl.isShowPanel=false;
									 });
								}
						     });
					 	}else if(ctrl.mode=='edit')
					 	{
					 		delete itemnew.createTime;
					 		delete itemnew.updateTime;
							service.update( itemnew).then(function(data) {
						        ctrl.isShowPanel=false;
						    });
					 	}
					 };

			}]

	});