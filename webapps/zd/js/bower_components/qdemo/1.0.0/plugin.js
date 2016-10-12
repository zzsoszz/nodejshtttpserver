var qdemoModule=angular.module('qdemoModule',[])
qdemoModule.service("qdemoService",function($http){
 return {
          search:function(url,item){
            var param=$.param(item?item:"");
              return $http.get(url+"?"+param,{cache:false}).then(function(resp){
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
                    return item;
                }
                return null;
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
					    	ctrl.tableoption=
						     {
						     	 title:"教育经历",
						     	 deleteEnable:false,
						     	 editEnable:true,
						     	 moveUpEnable:false,
						     	 moveDownEnable:false,
						     	 enableEvent:true,
						     	 enableDefaultAction:false,
						     	 daterangeoption:ctrl.daterangeoption,
						     	 cols:[
							        {title:'名字',name:"name",type:"text"}
						     	 ]
						    };
					};
                    ctrl.pagechange = function(page) {
					     var item = $.extend(ctrl.item ? ctrl.item : {}, { pageSize: ctrl.option.pageSize, pageNo: page });
					     ctrl.doSearch(item);
      				};
      				ctrl.doSearch = function(item) {
					     service.search(serviceApiUrl + '/course/micro/list', item).then(function(data) {
					         ctrl.items = data.items;
					         ctrl.qpageroptions.totalpage = Math.ceil(data.rows / ctrl.option.pageSize);
					     });
					 }
					 ctrl.moveUp = function(item) {
					     var itemnew={
					        id:item.id,
					        order:1
					     };
					     service.update(serviceApiUrl + '/course/micro/order', itemnew).then(function(data) {
					        ctrl.doSearch({});
					     });
					 }
					 ctrl.moveDown = function(item) {
					     var itemnew={
					        id:item.id,
					        order:2
					     };
					     service.update(serviceApiUrl + '/course/micro/order', itemnew).then(function(data) {
					        ctrl.doSearch({});
					     });
					 }
					 ctrl.doDel = function(item) {
					     var itemnew={
					        id:item.id
					     };
				         service.update(serviceApiUrl + '/course/micro/delete', itemnew).then(function(data) {
				             ctrl.doSearch({});
				         });
					 }
					 ctrl.showEdit = function(item) {
					     //$state.go("qmicrocourse/edit",{id:item.id});
					 }
					 ctrl.showAdd=function()
					 {
					     //$state.go("qmicrocourse/add");
					 }


			}]

	});