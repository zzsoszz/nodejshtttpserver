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
			this.video;
			this.stopEle;
			this.playEles;
			this.qprogressbar;
			this.willsetcurrenttime;
			this.play=function()
			{
				this.playtargetEle.get(0).play();
			};
			this.pause=function()
			{
				this.playtargetEle.get(0).pause();
			};
			this.onplay=function(){
				this.qstatusbox.hide();
				$(this.playEles).addClass("pause");
			};
			this.onstop=function()
			{
				this.qstatusbox.show();
				$(this.playEles).removeClass("pause");
			};
			this.log=function(){
				// var video=this.playtargetEle.get(0);
				// console.log("video.buffered:",video.buffered);
				// console.log("video.currentTime:",video.currentTime);
				// console.log("video.duration:",video.duration);
				// console.log("video.ended:",video.ended);
				// console.log("video.readyState:",video.readyState);
				// console.log("video.seeking:",video.seeking);
				// console.log("video.startDate:",video.startDate);
				// console.log("video.buffered:",video.buffered);
				// console.log("video.paused:",video.paused);
				// for(var i=0;i<video.buffered.length;i++)
				// {
				// 		console.log("buffer-start-"+i,video.buffered.start(i));
				// 		console.log("buffer-end-"+i,video.buffered.end(i));
				// }
				// console.log("video.seekable:",video.seekable);
				// for(var i=0;i<video.seekable.length;i++)
				// {
				// 		console.log("seek-start-"+i,video.seekable.start(i));
				// 		console.log("seek-end-"+i,video.seekable.end(i));
				// }
			};
			this.init=function(optionsnew)
			{
				this.playtargetEle=this.ele.find("video");
				this.video=this.playtargetEle.get(0);
				this.qstatusbox=this.ele.find(".qstatusbox");
				this.qprogressbar=this.ele.find(".qprogressbar");
				this.qloadprogress=this.ele.find(".qloadprogress");
				this.qplayprogresss=this.ele.find(".qplayprogresss");
				// this.qstatusbox=this.ele.find(".qquickcontrol");
				// this.qplaycontrolEle=this.ele.find(".qcontrolbar");
				// this.playEles=this.qstatusbox.find(".qplay").add(this.qplaycontrolEle.find(".qplay"));
				// this.playEles.on("click",$.proxy(function(e){
				// 	if(!$(e.target).hasClass("pause"))
				// 	{
				// 		this.play();
				// 	}
				// 	else
				// 	{
				// 		this.pause();
				// 	}
				// },this));
				this.ele.on("click",$.proxy(function(){
					if(this.video.paused)
					{
						this.video.play();
					}
					else
					{
						this.video.pause();
					}
				},this));
				this.qprogressbar.on("mousemove",$.proxy(function(e){
					//e.preventDefault();
					e.stopPropagation();
					 // if($(e.target).hasClass("qloadprogress"))
					 // {
						console.log(e.target.className);
						//var percent=e.offsetX/$(e.target).width();
						var percent=(e.pageX-this.qprogressbar.offset().left)/this.qprogressbar.width();
						console.log("percent:",percent);
						this.willsetcurrenttime=Math.floor(percent*this.video.duration);
						console.log("widthpercent:",this.willsetcurrenttime);
					// }
					
				},this));


				this.qprogressbar.on("click",$.proxy(function(e){
					e.stopPropagation();
					console.log("now set currenttime",this.willsetcurrenttime);
					this.video.currentTime=this.willsetcurrenttime;
				},this));
				this.playtargetEle.on("abort",$.proxy(function(){
					console.log("abort");
					this.log();
				},this));
				this.playtargetEle.on("canplay",$.proxy(function(){
					console.log("canplay");
					this.log();
				},this));
				this.playtargetEle.on("canplaythrough",$.proxy(function(){
					console.log("canplaythrough");
					this.log();
				},this));
				this.playtargetEle.on("durationchange",$.proxy(function(){
					console.log("durationchange");
					this.log();
				},this));
				this.playtargetEle.on("emptied",$.proxy(function(){
					console.log("emptied");
					this.log();
				},this));
				this.playtargetEle.on("ended",$.proxy(function(){
					console.log("ended");
					this.log();
				},this));
				this.playtargetEle.on("error",$.proxy(function(){
					console.log("error");
					this.log();
				},this));
				this.playtargetEle.on("loadeddata",$.proxy(function(){
					console.log("loadeddata");
					this.log();
				},this));
				this.playtargetEle.on("loadedmetadata",$.proxy(function(){
					console.log("loadedmetadata");
					this.log();
				},this));
				this.playtargetEle.on("loadstart",$.proxy(function(){
					console.log("loadstart");
					this.log();
				},this));
				this.playtargetEle.on("pause",$.proxy(function(){
					console.log("pause");
					this.qstatusbox.show();
					this.log();
				},this));
				this.playtargetEle.on("play",$.proxy(function(){
					console.log("play");
					this.qstatusbox.hide();
					this.log();
				},this));
				this.playtargetEle.on("playing",$.proxy(function(){
					console.log("playing");
					this.log();
				},this));
				this.playtargetEle.on("progress",$.proxy(function(){
					console.log("progress");
					this.log();
					if(this.video.buffered.length>0)
					{
						var percent=(this.video.buffered.end(0)/this.video.duration)*100;
						this.qloadprogress.css({width:percent+"%"});
					}
				},this));
				this.playtargetEle.on("ratechange",$.proxy(function(){
					console.log("ratechange");
					this.log();
				},this));
				this.playtargetEle.on("readystatechange",$.proxy(function(){
					console.log("readystatechange");
					this.log();
				},this));
				this.playtargetEle.on("seeked",$.proxy(function(){
					console.log("seeked");
					this.log();
				},this));
				this.playtargetEle.on("seeking",$.proxy(function(){
					console.log("seeking");
					this.log();
				},this));
				this.playtargetEle.on("stalled",$.proxy(function(){
					console.log("stalled");
					this.log();
				},this));
				this.playtargetEle.on("suspend",$.proxy(function(){
					console.log("suspend");
					this.log();
				},this));
				this.playtargetEle.on("timeupdate",$.proxy(function(){
					var percent=(this.video.currentTime/this.video.duration)*100;
					this.qplayprogresss.css({width:percent+"%"});
					console.log("timeupdate");
					this.log();
				},this));
				this.playtargetEle.on("volumechange",$.proxy(function(){
					console.log("volumechange");
					this.log();
				},this));
				this.playtargetEle.on("waiting",$.proxy(function(){
					console.log("waiting");
					this.log();
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