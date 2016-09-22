if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.factory("qmicrocourseService",function($http) {
	    return {
	        getAll:function(){
	            return $http.get(serviceApiUrl+'/web/course/type/list',{cache:false}).then(function(resp){
	              if(resp.data.code=='success')
	              {
	                  return resp.data.json.datas;
	              }
	            });
	        },
	        add:function(item)
	        {
	           return $http.get(serviceApiUrl+'/web/course/type/add?name='+item.name).then(function (resp){
	              if(resp.data.code=='success')
	              {
	                  return item;
	              }
	              return null;
	           });
	        },
	        delete:function(item)
	        {
	           return $http.get(serviceApiUrl+'/web/course/type/delete?id='+item.id).then(function (resp){
	              if(resp.data.code=='success')
	              {
	                  return item;
	              }
	              return null;
	           });
	        },
	        update:function(item)
	        {
	           var param=$.param(item);
	           return $http.get(serviceApiUrl+'/web/course/type/update?'+param).then(function (resp){
	              if(resp.data.code=='success')
	              {
	                  return item;
	              }
	              return null;
	           });
	        }
	    }
	});
	qui.component('qmicrocourse', {
	  transclude: true,
	  scope:true,
	  templateUrl:baseUrl+'js/bower_components/qmicrocourse/1.0.0/plugin.html',
			  controller: ["qmicrocourseService",function(service) {
			  	console.log(service);
			  	var ctrl=this;
			  	ctrl.loadAll=function(){
			  		service.getAll().then(function(data){
			    		ctrl.result=data;
			    	});
			  	};
			    ctrl.$onInit=function(){
			    	ctrl.tableoption=
				     {
				     	 title:"教育经历",
				     	 deleteEnable:true,
				     	 editEnable:true,
				     	 moveUpEnable:true,
				     	 moveDownEnable:true,
				     	 enableEvent:true,
				     	 enableDefaultAction:false,
				     	 daterangeoption:ctrl.daterangeoption,
				     	 cols:[
					        {title:'名字',name:"name",type:"text"}
				     	 ]
				    };
				    ctrl.loadAll();
			    	console.log(ctrl.result);
			    };
			  	ctrl.onItemUpdateBefore=function(item)
			    {
			    	service.update(item);
			        console.log("onItemUpdateBefore:",item);
			    };
			    ctrl.onItemAddBefore=function(item)
			    {
			        //item.id=$.guid;
			        service.add(item).then(function(data){
			        	 ctrl.loadAll();
			        });
			        console.log("onItemAddBefore:",item);
			        return item;
			    };
			    ctrl.onItemDelBefore=function(item)
			    {
			    	service.delete(item).then(function(data){
			        	 ctrl.loadAll();
			        });
			        console.log("onItemDelBefore:",item);
			    };
			}]

	});
}