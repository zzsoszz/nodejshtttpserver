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
	        search:function(url){
	            return $http.get(url,{cache:false}).then(function(resp){
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
	           return $http.get(url+"?"+param).then(function (resp){
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
		  templateUrl:baseUrl+'js/bower_components/qdatatable/1.0.6/plugin.html',
		  controller: ["qdatatableService",function(qdatatableService) {
			  	var ctrl=this;
			  	this.qpageroptions={
				  		totalpage:5,
						currentpage:1
				};
			  	this.$onInit=function()
			  	{
			  		if(!this.items)
					{
						this.items=[];
					}
			  		//this.items=[{"createtime":"1980-01-01 - 1980-01-10","school":"天津3","major":"河北区3","province":"北京","desc":"aaa","lessons":1,"gender":"女"}];
			  	};
			  	this.showPanel=function(mode)
			  	{
			  		this.mode=mode;
			  		this.isShowPanel=!this.isShowPanel;
			  		this.item={};
			  	};
			  	this.doSearch=function(item)
			  	{
			  		qdatatableService.search(this.option.searchUrl,item);
			  		this.isShowPanel=false;
			  	};
			  	this.doSave=function($event,item)
			  	{
			  		console.log(item);
			  		var index =this.items.indexOf(item);
			  		console.log(index);
			  		if(index<0)
			  		{
			  			var itemnew=this.onItemAddBefore({"item":item});
			  			qdatatableService.add(this.option.addUrl,item);
			  			console.log("itemnew:",itemnew);
			  			this.items.push(itemnew);
			  		}else{
			  			qdatatableService.update(this.option.updateUrl,item);
			  			ctrl.onItemUpdateBefore({"item":item});
			  		}
			  		this.isShowPanel=false;
			  	};
			  	this.doDel=function(item)
			  	{
			  		this.onItemDelBefore({"item":item});
			  		qdatatableService.add(this.option.deleteUrl,item);
			  		this.items.splice(this.items.indexOf(item),1);
			  	};
			  	this.doCancel=function()
			  	{
			  		this.isShowPanel=false;
			  	};
				this.moveItem = function(item, dir) {
				    var index =this.items.indexOf(item);
				    console.log(index);
			    	if (dir === 'up') {
			    	  if(index!=0)
			    	  {
		 				this.items.splice(index - 1, 2, item, this.items[index - 1]);
			    	  }
				    } else {
				      if(index!=this.items.length-1){
				    	this.items.splice(index, 2, this.items[index + 1], item);
				      }
				    }
				};
				this.moveItem = function(item, dir) {
				    var index =this.items.indexOf(item);
				    console.log(index);
			    	if (dir === 'up') {
			    	  if(index!=0)
			    	  {
		 				this.items.splice(index - 1, 2, item, this.items[index - 1]);
			    	  }
				    } else {
				      if(index!=this.items.length-1){
				    	this.items.splice(index, 2, this.items[index + 1], item);
				      }
				    }
				};
				this.showEdit=function(item)
				{
					this.item=item;
					this.isShowPanel=true;
				};

		 }]
		
	});
}