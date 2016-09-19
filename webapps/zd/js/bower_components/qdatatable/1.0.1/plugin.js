if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.directive('ngRepeatRange', ['$compile', function ($compile) {
	    return {
	        replace: true,
	        scope: { from: '=', to: '=', step: '=' },

	        link: function (scope, element, attrs) {
	            // returns an array with the range of numbers
	            // you can use _.range instead if you use underscore
	            function range(from, to, step) {
	                var array = [];
	                while (from + step <= to)
	                    array[array.length] = from += step;

	                return array;
	            }
	            // prepare range options
	            var from = scope.from || 0;
	            var step = scope.step || 1;
	            var to   = scope.to || attrs.ngRepeatRange;
	            // get range of numbers, convert to the string and add ng-repeat
	            var rangeString = range(from, to + 1, step).join(',');
	            angular.element(element).attr('ng-repeat', 'n in [' + rangeString + ']');
	            angular.element(element).removeAttr('ng-repeat-range');
	            $compile(element)(scope);
	        }
	    };
	}]);
	qui.component('qdatatable', {
	  transclude: true,
	  bindings:{
	    items: '=ngModel',
	    option: '=ngOption'
	  },
	  scope:true,
	  templateUrl:baseUrl+'js/bower_components/qdatatable/1.0.1/plugin.html',
	  controller: function() {
	  	this.$onInit=function()
	  	{
	  		this.items=[{"createtime":"09/05/2016 - 09/13/2016","school":"天津3","major":"河北区3","province":"天津","desc":"aaa","lessons":"qingtian"}];
	  		this.schoolprovinces =provinceCitys.map(function(obj1){
		            obj1.sub=obj1.sub.map(function(obj){
		               return {id:obj.name,name:obj.name};
		            });
		            return {id:obj1.name,name:obj1.name,sub:obj1.sub};
		    });
	  	};
	  	this.showAdd=function()
	  	{
	  		this.isShowPanel=!this.isShowPanel;
	  		this.item={};
	  	};
	  	this.doAdd=function($event,item)
	  	{
	  		console.log(item);
	  		var index =this.items.indexOf(item);
	  		console.log(index);
	  		if(index<0)
	  		{
	  			this.items.push(item);
	  		}
	  		this.isShowPanel=false;
	  	};
	  	this.doDel=function(item)
	  	{
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
		this.doEdit=function(item)
		{
			this.item=item;
			this.isShowPanel=true;
		};

	  }
	});
}