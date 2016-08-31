(function($)
{
		
		var  defaultoptions = {
              selector      : this.selector
   		};
		
		$.fn.qpager=function(options)
		{
			var options = $.extend( {}, defaultoptions, options );
			
			$(this).each(
				function ()
				{
					var instance=$(this).data("qpager");
					if(instance)
					{
						instance.init(options);
					}else
					{
						var target=$(this);
						instance=new QPager(target);
						instance.init(options);
						$(this).data("qpager",instance);
					}
				}
			);
		}
		function QPager(target)
		{
			this.pager;
			this.options;
			this.prev=function()
			{
				this.pager.prev();
				this.render();
				
				//notify change
				if(this.options.pagechange!=undefined)
				{
					this.options.pagechange.call(this,this.pager.curpage);
				}
			};
			this.next=function()
			{
				this.pager.next();
				this.render();
				
				//notify change
				if(this.options.pagechange!=undefined)
				{
					this.options.pagechange.call(this,this.pager.curpage);
				}
			};
			this.turn=function()
			{
				var e = arguments[0] || window.event;
				var target = e.srcElement ? e.srcElement : e.target;
				var page=$(target).closest(".qpager").find(".page");
				this.pager.go(page.val());
				this.render();
				
				//notify change
				if(this.options.pagechange!=undefined)
				{
					this.options.pagechange.call(this,this.pager.curpage);
				}
			};
			this.render=function()
			{
				var ulele=$("<ul>");
				for(var i=0;i<this.pager.pagearray.length;i++)
				{
					var liele=$("<li>");
					if(this.pager.pagearray[i]==this.pager.curpage)
					{
						liele.addClass("active");
					}
					if(this.pager.pagearray[i]==-1)
					{
						liele.text("...") ;
					}else{
						liele.text(this.pager.pagearray[i]) ;
					}
					ulele.append(liele);
				}
				ulele.addClass("pagination");
				target.find(".qpagerui").empty().append(ulele);
			};
			this.init=function(initoptions)
			{
				this.options=initoptions;
				this.pager=new Pager(this.options.totalpage);
				this.pager.go(this.options.initpage);
				this.render();
				target.find(".prev").off().click($.proxy(this.prev,this));
				target.find(".next").off().click($.proxy(this.next,this));
				target.find(".turn").off().click($.proxy(this.turn,this));
				target.find(".qpagerui").off().on('click', 'li',
					function(event)
					{
						var page=$(event.target).closest(".qpager").find(".page");
						page.val($(event.target).text());
						$(event.target).closest(".qpager").find(".turn").click();
					}
				);
			};
		}
}
)(jQuery);




if(angular!=undefined  && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	qui.directive('qpager',[function() {
	    return {
		        restrict: 'A',
		        priority: 100,
		        require: '?ngModel',
		        templateUrl:'plugin.html',
		        link: function(scope, element, attrs,ngModelController) {
		        	var qpageroptions=scope[attrs["ngModel"]];
		        	element.qpager(
						{
							totalpage:qpageroptions.totalPage,initpage:qpageroptions.initPage,
							pagechange:function(page)
							{
								console.log(page);
								scope.$apply(function() {
									qpageroptions.currentPage=page;
								});
								/*
								scope.$apply(function() {
					                   controller.$setViewValue(val);
					                   controller.$render();
					            });
					            */
							}
						}
					);
		        	attrs.$observe('ngModel', function(value) {
				     　　var newval=scope[value];
				     　　console.log('qpager ngModel:'+value+' has changed value to ', newval);
				 　 });
		        	console.log("qpageroptions",qpageroptions);
		        }
		    };
		}]
	);
}
