(function($)
{
		
		var  defaultoptions = {
              selector      : this.selector
   		};
		

		function Pager(totalpage)
		{
			//当前页
			this.curpage=1;
			//每页多少个元素
			this.totalpage=totalpage;
			//总页数
			this.pagearray=[];
			
			this.go=function(page)
			{
				if(page>totalpage)
				{
					return;
				}
				this.pagearray=[];
				if(totalpage>9)
				{
					var leftsize=(page-2)>=3?3:(page-2);//左边显示多少个
					var rightsize=(this.totalpage-page-1)>=3?3:(this.totalpage-page-1);//右边显示多少个
					var allsize=leftsize+rightsize+1;//总共显示多少个
					var start=page-leftsize;
					
					this.pagearray.push(1);
					if(leftsize==3)
					{
						this.pagearray.push(-1);//按照顺序排列
					}
					for(var i=0;i<allsize;i++)
					{
						this.pagearray.push(start++);//按照顺序排列
					}
					if(rightsize==3)
					{
						this.pagearray.push(-1);//按照顺序排列
					}
					this.pagearray.push(totalpage);
				}else{
					var start=1;
					for(var i=0;i<totalpage;i++)
					{
						this.pagearray[i]=start++;//按照顺序排列
					}
				}
				this.curpage=page;
			};
			this.isHead=function()
			{
				if(this.curpage==1)
				{
					return true;
				}else{
					return false;
				}
			};
			this.prev=function()
			{
				if(this.isHead())
				{
					return 1;
				}else{
					this.curpage--;
				}
				this.go(this.curpage);
				return this.curpage;
			};
			this.next=function()
			{
				if(!this.isEnd())
				{
					this.curpage++;
				}
				this.go(this.curpage);
				return this.curpage;
			};
			this.isEnd=function()
			{
				if(this.curpage==this.totalpage)
				{
					return true;
				}else{
					return false;
				}
			};
			this.moveToHead=function()
			{
				this.curpage=1;
				return this.curpage;
			};
			this.moveToEnd=function()
			{
				this.curpage=this.totalpage;
				return this.curpage;
			};
			this.init=function()
			{
				this.go(1);
			};
			this.init();
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
			this.prev=function(event)
			{
				event.stopPropagation();
				this.pager.prev();
				this.render();
				//notify change
				if(this.options.pagechange!=undefined)
				{
					this.options.pagechange.call(this,parseInt(this.pager.curpage));
				}
			};
			this.next=function(event)
			{
				event.stopPropagation();
				this.pager.next();
				this.render();
				//notify change
				if(this.options.pagechange!=undefined)
				{
					this.options.pagechange.call(this,parseInt(this.pager.curpage));
				}
			};
			this.turn=function(event)
			{
				event.stopPropagation();
				var page=$(event.target).closest(".qpager").find(".page");
				this.pager.go(page.val());
				this.render();
				//notify change
				if(this.options.pagechange!=undefined)
				{
					this.options.pagechange.call(this,parseInt(this.pager.curpage));
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
				this.options=$.extend({},this.options,initoptions);
				this.pager=new Pager(this.options.totalpage);
				this.pager.go(this.options.currentpage);
				this.render();
				target.find(".prev").off().click($.proxy(this.prev,this));
				target.find(".next").off().click($.proxy(this.next,this));
				target.find(".turn").off().click($.proxy(this.turn,this));
				target.find(".qpagerui").off().on('click', 'li',
					function(event)
					{
						event.stopPropagation();
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
		        templateUrl:'http://localhost:3000/zd/js/bower_components/qpager/1.0.1/plugin.html',
		        link: function(scope, element, attrs,ngModelController) {
		        	var qpageroptions=scope[attrs["ngModel"]];
		        	element.qpager(
						{
							totalpage:qpageroptions.totalpage,initpage:qpageroptions.currentpage,
							pagechange:function(page)
							{
								console.log(page);
								scope.$apply(function() {
									qpageroptions.currentpage=page;
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
					scope.$watchCollection(attrs["ngModel"],function(newval,oldval)
					{
						console.log("qpageroptions:",newval);
						element.qpager(newval);
					});
					/*
		        	attrs.$observe('ngModel', function(value) {
				     　　var newval=scope[value];
				     　　console.log('qpager ngModel:'+value+' has changed value to ', newval);
				     	 element.qpager(newval);
				 　 });
		        	console.log("qpageroptions",qpageroptions);
		        	*/
		        }
		    };
		}]
	);
}
