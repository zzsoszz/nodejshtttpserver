if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.component('qcoursetype', {
	  transclude: true,
	  scope:true,
	  templateUrl:baseUrl+'js/bower_components/qcoursetype/1.0.1/plugin.html',
			  controller: ["qcoursetypeService",function(qcoursetypeService) {
			  	console.log(qcoursetypeService);
			  	var ctrl=this;
			  	ctrl.loadAll=function(){
			  		qcoursetypeService.getAll().then(function(data){
			    		ctrl.result=data;
			    	});
			  	};
			    ctrl.$onInit=function(){
			    	ctrl.tableoption=
				     {
				     	 title:"教育经历",
				     	 deleteEnable:false,
				     	 editEnable:true,
				     	 moveUpEnable:false,
				     	 moveDownEnable:false,
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
			    	qcoursetypeService.update(item);
			        console.log("onItemUpdateBefore:",item);
			    };
			    ctrl.onItemAddBefore=function(item)
			    {
			        //item.id=$.guid;
			        qcoursetypeService.add(item).then(function(data){
			        	 ctrl.loadAll();
			        });
			        console.log("onItemAddBefore:",item);
			        return item;
			    };
			    ctrl.onItemDelBefore=function(item)
			    {
			    	qcoursetypeService.delete(item).then(function(data){
			        	 ctrl.loadAll();
			        });
			        console.log("onItemDelBefore:",item);
			    };
			}]

	});
}