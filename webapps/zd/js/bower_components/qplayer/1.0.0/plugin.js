(function($){

		var plugname="qplayer";

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
			this.ele=target;
			this.playtargetEle;
			this.qplaycontrolEle;
			this.stopEle;
			this.playEles;
			this.play=function()
			{
				this.playtargetEle.get(0).play();
			};
			this.pause=function()
			{
				this.playtargetEle.get(0).pause();
			};
			this.onplay=function(){
				$(this.playEles).addClass("pause");
			};
			this.onstop=function()
			{
				$(this.playEles).removeClass("pause");
			};
			this.init=function(optionsnew)
			{
				this.playtargetEle=this.ele.find("video");
				

				this.playtargetEle.on("playing",$.proxy(function(){
					this.onplay();
				},this));
				this.playtargetEle.on("ended",$.proxy(function(){
					this.onstop();
				},this));
				
				
				this.qquickcontrolEle=this.ele.find(".qquickcontrol");
				this.qplaycontrolEle=this.ele.find(".qcontrolbar");
				this.playEles=this.qquickcontrolEle.find(".qplay").add(this.qplaycontrolEle.find(".qplay"));
				this.playEles.on("click",$.proxy(function(e){
					if(!$(e.target).hasClass("pause"))
					{
						this.play();
					}
					else
					{
						this.pause();
					}
				},this));


			};
		}

})(jQuery);

// if(angular && angular.module)
// {

// 	var qui=angular.module("qui",[]);
// 	qui.directive('qplayer',[function() {
// 	    return {
// 		        restrict: 'A',
// 		        priority: 100,
// 		        require: '?ngModel',
// 		        link: function(scope, element, attrs,controller) {

// 		        }
// 		    };
// 		}]
// 	);
	
// }