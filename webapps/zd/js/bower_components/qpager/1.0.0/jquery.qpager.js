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
					var ele=$(this);
					$(this).data("qpager",new QPager(ele,options));
				}
			);
		}
		
		function QPager(target, options)
		{
			var pager=new Pager(options.totalpage);
			
			this.prev=function()
			{
				pager.prev();
				this.render();
			};
			this.next=function()
			{
				pager.next();
				this.render();
			};
			this.turn=function()
			{
				var e = arguments[0] || window.event;
				var target = e.srcElement ? e.srcElement : e.target;
				var page=$(target).closest(".qpager").find(".page");
				pager.go(page.val());
				this.render();
			};
			this.render=function()
			{
				var ulele=$("<ul>");
				for(var i=0;i<pager.pagearray.length;i++)
				{
					var liele=$("<li>");
					if(pager.pagearray[i]==pager.curpage)
					{
						liele.addClass("active");
					}
					if(pager.pagearray[i]==-1)
					{
						liele.text("...") ;
					}else{
						liele.text(pager.pagearray[i]) ;
					}
					ulele.append(liele);
				}
				target.find(".qpagerui").empty().append(ulele);
				
				//notify change
				if(options.pagechange!=undefined)
				{
					options.pagechange.call(this,pager.curpage);
				}
			};
			this.init=function()
			{
				pager.go(options.initpage);
				this.render();
				target.find(".prev").click($.proxy(this.prev,this));
				target.find(".next").click($.proxy(this.next,this));
				target.find(".turn").click($.proxy(this.turn,this));
				target.find(".qpagerui").on('click', 'li',
					function(event)
					{
						var page=$(target).closest(".qpager").find(".page");
						page.val($(event.target).text());
						$(target).closest(".qpager").find(".turn").click();
					}
				);
			};
			this.init();
		}
}
)(jQuery);