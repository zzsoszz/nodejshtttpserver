(function($){

		var plugname="qbigimage";

		var  defaultoptions = {
			  selector      : this.selector
		};

		$.fn[plugname]=function()
		{
			var isMethodCall=arguments.length>0 && typeof arguments[0] === "string";
			if(isMethodCall)
			{
				var methodname=arguments[0];
				var args = Array.prototype.slice.call(arguments,1);
				this.each(function() {
					var instance = $.data( this,plugname);
					if(instance && $.isFunction( instance[methodname] ))
					{
						var method=instance[methodname];
						method.apply(instance,args);
					}
				});
			}else{
				var inputoptions = arguments;
				$(this).each(
						function ()
						{
							var optionsnew = $.extend( {}, defaultoptions);
							if(inputoptions.length>0)
							{
									optionsnew=$.extend(optionsnew,inputoptions[0]);
							}
							var instance=$(this).data(plugname);
							if(instance)
							{
								instance.init(optionsnew);
							}else
							{
								var target=$(this);
								instance=new PluginObject(target);
								instance.init(optionsnew);
								$(this).data(plugname,instance);
							}
						}
					);
					return this;
			};
		}
		function PluginObject(target)
		{
			this.qbigimageurl;
			this.plugnamecontainer;
			this.init=function()
			{
				this.qbigimageurl=target.data("qbigimageurl");
				target.on("mouseenter",$.proxy(function(event){
					if(!this.plugnamecontainer)
					{
						this.plugnamecontainer=$("<div>").addClass(plugname).css({
							'position':'absolute',
							'width':target.outerWidth()+'px',
							'top':event.pageY+"px",
							'left':event.pageX+"px"
						}).show();
						var img=$("<img>").attr("src",this.qbigimageurl);
						this.plugnamecontainer.append(img);
						$("body").append(this.plugnamecontainer);
					}else{
						this.plugnamecontainer.show();
					}
					console.log("start:"+event.pageY+"px  "+event.pageX+"px");
				},this));
				target.on("mousemove",$.proxy(function(event){
					this.plugnamecontainer.css({
						'top':event.pageY+"px",
						'left':event.pageX+"px"
					});
					console.log("move:"+event.pageY+"px  "+event.pageX+"px");
				},this));
				target.on("mouseout",$.proxy(function(event){
					$("img").attr("src",this.qbigimageurl);
					this.plugnamecontainer.hide();;
					console.log("out:"+event.pageY+"px  "+event.pageX+"px");
				},this));
			}
		}
})(jQuery);