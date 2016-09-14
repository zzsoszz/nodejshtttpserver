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
	  templateUrl:baseUrl+'plugin.html',
	  controller: function($rootScope) {
	    this.items = {name: 'world'};
	  }
	});
}