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
				this.qquickcontrolEle.hide();
				$(this.playEles).addClass("pause");
			};
			this.onstop=function()
			{
				this.qquickcontrolEle.show();
				$(this.playEles).removeClass("pause");
			};
			this.init=function(optionsnew)
			{
				this.playtargetEle=this.ele.find("video");
				
				this.playtargetEle.on("abort",$.proxy(function(){
					console.log("abort");
				},this));
				this.playtargetEle.on("canplay",$.proxy(function(){
					console.log("canplay");
				},this));
				this.playtargetEle.on("canplaythrough",$.proxy(function(){
					console.log("canplaythrough");
				},this));
				this.playtargetEle.on("durationchange",$.proxy(function(){
					console.log("durationchange");
				},this));
				this.playtargetEle.on("emptied",$.proxy(function(){
					console.log("emptied");
				},this));
				this.playtargetEle.on("ended",$.proxy(function(){
					console.log("ended");
				},this));
				this.playtargetEle.on("error",$.proxy(function(){
					console.log("error");
				},this));
				this.playtargetEle.on("loadeddata",$.proxy(function(){
					console.log("loadeddata");
				},this));
				this.playtargetEle.on("loadedmetadata",$.proxy(function(){
					console.log("loadedmetadata");
				},this));
				this.playtargetEle.on("loadstart",$.proxy(function(){
					console.log("loadstart");
				},this));
				this.playtargetEle.on("pause",$.proxy(function(){
					console.log("pause");
				},this));
				this.playtargetEle.on("play",$.proxy(function(){
					console.log("play");
				},this));
				this.playtargetEle.on("playing",$.proxy(function(){
					console.log("playing");
				},this));
				this.playtargetEle.on("progress",$.proxy(function(){
					console.log("progress");
				},this));
				this.playtargetEle.on("ratechange",$.proxy(function(){
					console.log("ratechange");
				},this));
				this.playtargetEle.on("readystatechange",$.proxy(function(){
					console.log("readystatechange");
				},this));
				this.playtargetEle.on("seeked",$.proxy(function(){
					console.log("seeked");
				},this));
				this.playtargetEle.on("seeking",$.proxy(function(){
					console.log("seeking");
				},this));
				this.playtargetEle.on("stalled",$.proxy(function(){
					console.log("stalled");
				},this));
				this.playtargetEle.on("suspend",$.proxy(function(){
					console.log("suspend");
				},this));
				this.playtargetEle.on("timeupdate",$.proxy(function(){
					console.log("timeupdate");
				},this));
				this.playtargetEle.on("volumechange",$.proxy(function(){
					console.log("volumechange");
				},this));
				this.playtargetEle.on("waiting",$.proxy(function(){
					console.log("waiting");
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