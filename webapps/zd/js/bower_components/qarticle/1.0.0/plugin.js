var  moduleName="qarticle";
var module=angular.module(moduleName,["Ajax"])
module.service(moduleName+"Service",function($http,$ajax){
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
			 return $ajax({type:'post',url:serviceApiUrl + '/businesscourse/article/add',method:"post",data:formdata,processData : false,contentType:false}).then(function (resp){
                if(resp.code=='success')
                {
                    return resp.json;
                }
                return null;
             });
          },
          get:function(item)
          {
          	 var url=serviceApiUrl + '/businesscourse/lesson/'+item.id;
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
          	 var url=serviceApiUrl + '/businesscourse/lesson/del?id='+item.id;
             return $http.post(url).then(function (resp){
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
		           url :serviceApiUrl + '/businesscourse/lesson/modify',
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
module.component("addQarticle", {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
		  onAdd: '&',
	  },
	  templateUrl:baseUrl+'js/bower_components/'+moduleName+'/1.0.0/add-'+moduleName+'.html',
	  controller: [moduleName+"Service",'$scope',function(service, $scope) {
	  		var ctrl=this;
	  		ctrl.show=false;
	  		ctrl.doSave=function(form)
			{
			 	var itemnew={};
			 	itemnew=ctrl.item;
		 		delete itemnew.createTime;
		 		delete itemnew.updateTime;
				service.add(itemnew).then(function(item) {
					if(item)
					{
		       			ctrl.show=false;
		       			ctrl.onAdd({"item":item});
					}
			     });
			};
	  		$scope.$on('add-article', function(event,data) {
				ctrl.show=true;
			});
			ctrl.doCancel=function(){
			 	ctrl.show=false;
			};
	  }]
});
module.component("listQarticle", {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
	  },
	  templateUrl:baseUrl+'js/bower_components/'+moduleName+'/1.0.0/plugin.html',
	  controller: [moduleName+"Service",'$scope',function(service, $scope) {
	  		var ctrl=this;
	  		
	  }]
});

