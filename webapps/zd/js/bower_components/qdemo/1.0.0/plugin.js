var qdemoModule=angular.module('qdemoModule',[])
qdemoModule.service("qdemoService",function($http){
 return {
          search:function(url,item){
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
          add:function(url,item)
          {
             var formdata = new FormData();
			 for ( var key in item ) {
			     formdata.append(key, item[key]);
			 }
             // return $http({url:url,method:"post",data:form_data,processData : false,contentType : false}).then(function (resp){
             //    if(resp.data.code=='success')
             //    {
             //        return resp.data.json;
             //    }
             //    return null;
             // });
            return $.ajax({
		           type : 'post',
		           url :url,
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
             return $http.post(url+"?"+param).then(function (resp){
                if(resp.data.code=='success')
                {
                    return item;
                }
                return null;
             });
          },
          update:function(url,item)
          {
             // var param=$.param(item);
             // return $http.post(url+"?"+param).then(function (resp){
             //    if(resp.data.code=='success')
             //    {
             //        return item;
             //    }
             //    return null;
             // });
             var formdata = new FormData();
			 for ( var key in item ) {
			     formdata.append(key, item[key]);
			 }
             return $.ajax({
		           type : 'post',
		           url :url,
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
qdemoModule.component('qdemo', {
	  transclude: true,
	  scope:true,
	  templateUrl:baseUrl+'js/bower_components/qdemo/1.0.0/plugin.html',
			  controller: ["qdemoService",function(service) {
			  		 
			  	    var ctrl=this;
			  	    ctrl.qpageroptions = {
				         currentpage: 1,
				         totalpage: 0
				    };
				    ctrl.option={};
				    ctrl.option.pageSize=10;

				    ctrl.$onInit=function(){
					    	ctrl.pagechange(1);
					};
                    ctrl.pagechange = function(page) {
					     var item = $.extend({},{ pageSize: ctrl.option.pageSize, pageNo: page });
					     ctrl.doSearch(item);
      				};
      				ctrl.doSearch = function(item) {
					     service.search(serviceApiUrl + '/guest/list', item).then(function(data) {
					     	 if(data && data.items.length>0){
					     	 	 // data.items=data.items.map(function(obj){
					     	 	 // 	obj.avatar="/images/"+obj.avatar;
					     	 	 // 	return obj;
					     	 	 // });
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
					     service.update(serviceApiUrl + '/guest/order', itemnew).then(function(data) {
					        ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
					     });
					 }
					 ctrl.moveDown = function(item) {
					     var itemnew={
					        id:item.id,
					        order:2
					     };
					     service.update(serviceApiUrl + '/guest/order', itemnew).then(function(data) {
					        ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
					     });
					 }
					 ctrl.doDel = function(item) {
					     var itemnew={
					        id:item.id
					     };
				         service.delete(serviceApiUrl + '/guest/remove', itemnew).then(function(data) {
				             ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
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
							service.add(serviceApiUrl + '/guest/add', itemnew).then(function(data) {
						        ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
						        ctrl.isShowPanel=false;
						     });
					 	}else if(ctrl.mode=='edit')
					 	{
					 		delete itemnew.createTime;
					 		delete itemnew.updateTime;
							service.update(serviceApiUrl + '/guest/modify', itemnew).then(function(data) {
						        ctrl.doSearch({pageSize: ctrl.option.pageSize, pageNo: ctrl.qpageroptions.currentpage});
						        ctrl.isShowPanel=false;
						     });
					 	}
					 };

			}]

	});