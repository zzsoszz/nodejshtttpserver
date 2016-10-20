JSON.flatten = function(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");//
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}
// var data = {
//     article: "article",
//     gender: "gender",
//     brand: "brand",
//     connection: [{
//         type: 0,
//         connected: false
//     }],
//     acceleration: {
//         x: 0,
//         y: 0,
//         z: 0,
//         watchId: 0,
//         hasError: false
//     }
// };
// $(document).ready(function() {
//     console.log("aa",JSON.flatten(data));
// });
// var data = {
//     article: "article",
//     gender: "gender",
//     brand: "brand",
//     connection: {
//         type: 0,
//         connected: false
//     },
//     acceleration: {
//         x: 0,
//         y: 0,
//         z: 0,
//         watchId: 0,
//         hasError: false
//     }
// };
// $(document).ready(function() {
//     console.log(flatten(data));
//     $("body").text(flatten(data));
// });


var qquestion=angular.module('qquestion',["Ajax"])
qquestion.service("qquestionService",function($http,$ajax){
 return {
          search:function(item){
          	var url=serviceApiUrl + '/web/thought/list';
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
             item=JSON.flatten(item);
			 for ( var key in item ) {
			 	 console.log(key,item[key]);
			     formdata.append(key, item[key]);
			 }
			 return $ajax({type:'post',url:serviceApiUrl + '/businesscourse/lesson/add',method:"post",data:formdata,processData : false,contentType:false}).then(function (resp){
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

qquestion.component('qquestion', {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
		  onSelect:'&',
		  daterangeoption:'='
	  },
	  templateUrl:baseUrl+'js/bower_components/qquestion/1.0.0/plugin.html',
			  controller: ["qquestionService",'$scope','$rootScope','$ocLazyLoad','$injector',function(service, $scope,$rootScope,$ocLazyLoad,$injector) {
			  	    var ctrl=this;
			  	    ctrl.qpageroptions = {
				         currentpage: 1,
				         totalpage: 0
				    };
				    ctrl.daterangeoption=window.daterangeoption;
				    ctrl.timepickeroption=window.timepickeroption;
				    ctrl.item={};
				    
				    ctrl.option={};
				    ctrl.option.pageSize=5;
				    ctrl.$onInit=function(){
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
					 $scope.$on('showselect-qselectthought', function(event,data) {
							ctrl.show=true;
					 });

			}]

});

qquestion.component("addQquestion", {
	  transclude: true,
	  scope:true,
	  bindings: {
		  ngModel: '=',
		  onAdd: '&',
	  },
	  templateUrl:baseUrl+'js/bower_components/qquestion/1.0.0/add-qquestion.html',
	  controller: ["qquestionService",'$scope',function(service, $scope) {
	  		var ctrl=this;
	  		ctrl.daterangeoption=window.daterangeoption;
			ctrl.timepickeroption=window.timepickeroption;
	  		ctrl.show=false;
	  		ctrl.item={};
	  		ctrl.item.signins=[];
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
	  		$scope.$on('showadd-qquestion', function(event,data) {
				ctrl.show=true;
			});
			ctrl.showMap=function()
		    {
		          $scope.$broadcast('showselect-qbmap', '公园');
		    }
			ctrl.doCancel=function(){
			 	ctrl.show=false;
			};
	  }]
});
