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
				target.on("click",$.proxy(function(event){
					if(!this.plugnamecontainer)
					{
						this.plugnamecontainer=$("<div>").addClass(plugname).css({
							'position':'fixed',
							'width':"80%",
							'height':"80%",
							'top':"50%",
							'left':"50%",
							'transform':'translate(-50%,-50%)',
							'overflow':'hidden',
							'text-align':'center'
						}).show().on("dblclick",$.proxy(function(){
							this.plugnamecontainer.hide(); 
						},this));
						var img=$("<img>").attr("src",this.qbigimageurl);
						this.plugnamecontainer.append(img);
						$("body").append(this.plugnamecontainer);
						console.log(img.height());
						console.log(img.width());
					}else{
						if(this.plugnamecontainer.is(":hidden"))
						{
						     this.plugnamecontainer.show(); 
						}else
						{
						     this.plugnamecontainer.hide(); 
						}
					}
				},this));



			}
		}
})(jQuery);