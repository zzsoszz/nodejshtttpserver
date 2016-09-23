if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.filter(  
	    'to_trusted', ['$sce', function ($sce) {  
	        return function (text) {  
	            return $sce.trustAsHtml(text);  
	        }  
	    }]  
	);
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
	  templateUrl:baseUrl+'js/bower_components/qdatatable/1.0.7/plugin.html',
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
	  		this.items.splice(this.items.indexOf(item)-1,1);
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