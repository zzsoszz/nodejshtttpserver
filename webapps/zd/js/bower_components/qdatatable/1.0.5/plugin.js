if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
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
	  templateUrl:baseUrl+'js/bower_components/qdatatable/1.0.5/plugin.html',
	  controller: function() {
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
	  	this.showAdd=function()
	  	{
	  		this.isShowPanel=!this.isShowPanel;
	  		this.item={};
	  	};
	  	this.doSave=function($event,item)
	  	{
	  		var index =this.items.indexOf(item);
	  		if(index<0)
	  		{
	  			if(this.option.enableEvent){
	  				item=this.onItemAddBefore({"item":item});
	  			}
	  			this.items.push(item);
	  		}else{
	  			if(this.option.enableEvent)
	  			{
	  				item=ctrl.onItemUpdateBefore({"item":item});
	  			}
	  		}
	  		this.isShowPanel=false;
	  	};
	  	this.doDel=function(item)
	  	{
	  		if(this.option.enableEvent){
	  			item=this.onItemDelBefore({"item":item});
	  		}
	  		this.items.splice(this.items.indexOf(item),1);
	  	};
	  	this.doCancel=function()
	  	{
	  		this.isShowPanel=false;
	  	};
		this.moveItem = function(item, dir) {
		    var index =this.items.indexOf(item);
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

	  }
	});
}