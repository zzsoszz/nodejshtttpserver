if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}


	qui.factory("qdatatableService",function($http) {
	    return {
	        search:function(url,item){
	        	var param=$.param(item?item:"");
	            return $http.get(url+"?"+param,{cache:false}).then(function(resp){
	              if(resp.data.code=='success')
	              {
	                  return resp.data.json.datas;
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
	    }
	});
/*
<input   qdaterangepicker class="form-control date-picker"  type="text"  ng-model="aaaa"/>
*/
	qui.filter(  
	    'to_trusted', ['$sce', function ($sce) {  
	        return function (text) {  
	            return $sce.trustAsHtml(text);  
	        }  
	    }]  
	);
    qui.directive('ngHtmlCompile', function($compile) {
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
	qui.component('qdatatable', {
		  transclude: true,
		  bindings:{
		    items: '=ngModel',
		    option: '=ngOption',
		    onItemUpdateBefore:'&',
		    onItemAddBefore:'&',
		    onItemDelBefore:'&'
		  },
		  scope:true,
		  templateUrl:baseUrl+'js/bower_components/qdatatable/2.0.1/plugin.html',
		  controller: ["qdatatableService","$scope",function(qdatatableService,$scope) {
			  	var ctrl=this;
			  	ctrl.qpageroptions={
						currentpage:1
				};
				$scope.$watch("$ctrl.qpageroptions.currentpage",function(currentpage,old){
					var item=$.extend(ctrl.item?ctrl.item:{},{pagesize:ctrl.option.pageSize,currentpage:currentpage});
					//ctrl.doSearch(item);
				});
			  	ctrl.$onInit=function()
			  	{
			  		if(!ctrl.items)
					{
						ctrl.items=[];
					}
					ctrl.items=[ { "name": "123456", "actions": '<a  ui-sref=\'module({type:'+'"edit"'+'})\'>添加<a>' } ];
					//ctrl.doSearch(ctrl.item);
			  		//ctrl.items=[{"createtime":"1980-01-01 - 1980-01-10","school":"天津3","major":"河北区3","province":"北京","desc":"aaa","lessons":1,"gender":"女"}];
			  	};
			  	ctrl.showPanel=function(mode)
			  	{
			  		ctrl.mode=mode;
			  		ctrl.isShowPanel=!ctrl.isShowPanel;
			  		ctrl.item={};
			  	};
			  	ctrl.doSubmit=function($event,qdatatableForm)
			  	{
			  		$event.preventDefault();
			  		if(qdatatableForm.$valid)
			  		{
			  			if(ctrl.mode=='search')
				  		{
				  			ctrl.doSearch(ctrl.item);
				  		}else{
				  			ctrl.doSave(ctrl.item);
				  		}
			  		}
			  	};
			  	ctrl.doSearch=function(item)
			  	{
					qdatatableService.search(ctrl.option.searchUrl,item).then(function(data){
						ctrl.items=data;
						ctrl.qpageroptions.totalpage=Math.ceil(ctrl.items.length/ctrl.option.pageSize);
					});
					ctrl.isShowPanel=false;
			  	};
			  	ctrl.doSave=function(item)
			  	{
			  		console.log(item);
			  		var index =ctrl.items.indexOf(item);
			  		console.log(index);
			  		if(index<0)
			  		{
			  			ctrl.onItemAddBefore({"item":item});
			  			qdatatableService.add(ctrl.option.addUrl,item).then(function(data){
							var item=data;
							ctrl.items.push(item);
							ctrl.doSearch({});
						});
			  		}else{
			  			ctrl.onItemUpdateBefore({"item":item});
			  			qdatatableService.update(ctrl.option.updateUrl,item).then(function(data){
							var item=data;
							ctrl.item=item;
							ctrl.doSearch({});
						});
			  		}
			  		ctrl.isShowPanel=false;
			  	};
			  	ctrl.doDel=function(item)
			  	{
			  		ctrl.onItemDelBefore({"item":item});
			  		qdatatableService.delete(ctrl.option.deleteUrl,item).then(function(data){
							var item=data;
							ctrl.doSearch({});
					});
			  		ctrl.items.splice(ctrl.items.indexOf(item),1);
			  	};
			  	ctrl.doCancel=function()
			  	{
			  		ctrl.isShowPanel=false;
			  	};
				ctrl.moveItem = function(item, dir) {
				    var index =ctrl.items.indexOf(item);
				    console.log(index);
			    	if (dir === 'up') {
			    	  if(index!=0)
			    	  {
		 				ctrl.items.splice(index - 1, 2, item, ctrl.items[index - 1]);
			    	  }
				    } else {
				      if(index!=ctrl.items.length-1){
				    	ctrl.items.splice(index, 2, ctrl.items[index + 1], item);
				      }
				    }
				};
				ctrl.moveItem = function(item, dir) {
				    var index =ctrl.items.indexOf(item);
				    console.log(index);
			    	if (dir === 'up') {
			    	  if(index!=0)
			    	  {
		 				ctrl.items.splice(index - 1, 2, item, ctrl.items[index - 1]);
			    	  }
				    } else {
				      if(index!=ctrl.items.length-1){
				    	ctrl.items.splice(index, 2, ctrl.items[index + 1], item);
				      }
				    }
				};
				ctrl.showEdit=function(item)
				{
					ctrl.mode='edit';
					ctrl.item=item;
					ctrl.isShowPanel=true;
				};

		 }]
		
	});
}