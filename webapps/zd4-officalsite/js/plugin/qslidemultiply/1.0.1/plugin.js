(function($){

		 var defaultoptions={};
		 var plugname = "qslidemultiply";
		 $.fn[plugname] = function() {
		    var isMethodCall = arguments.length > 0 && typeof arguments[0] === "string";
		    if (isMethodCall) {

		      var methodname = arguments[0];
		      var args = Array.prototype.slice.call(arguments, 1);
		      this.each(function() {
		        var instance = $.data(this, plugname);
		        if (instance && $.isFunction(instance[methodname])) {
		          var method = instance[methodname];
		          method.apply(instance, args);
		        }
		      });
		    } else {
		      var inputoptions = arguments;
		      $(this).each(
		        function() {
		          var optionsnew = $.extend({}, defaultoptions);
		          if (inputoptions.length > 0) {
		            optionsnew = $.extend(optionsnew, inputoptions[0]);
		          }
		          var instance = $(this).data(plugname);
		          if (instance) {
		            instance.init(optionsnew);
		          } else {
		            var target = $(this);
		            instance = new PluginObject(target);
		            instance.init(optionsnew);
		            $(this).data(plugname, instance);
		          }
		        }
		      );
		      return this;
		    };
		}

		function Pager(data,pagesize,infinite){
			var self=this;
			self.values;
			self.pagesize;
			self.pageData=[];
			self.currentPage;
			self.infinite=infinite;
			self.prev=function()
			{
				if(self.currentPage>1)
				{
					self.currentPage--;
				}
				else if(self.infinite && self.currentPage==1){
					 //如果是最后一页,移动到最后
					self.currentPage=self.totalPage;
				}
				return self;
			};
			self.next=function()
			{
				if(self.currentPage<self.totalPage)
				{
					 self.currentPage++;
				}
				else if(self.infinite && self.currentPage==self.totalPage)
				{
					 //如果是最后一页,移动到第一页
					 self.currentPage=1;
				}
				return self;
			};
			self.isHead=function()
			{
				return self.currentPage==1;
			};
			self.goHead=function()
			{
				if(self.havePage())
				{
					self.currentPage=1;
				}
			};
			self.goEnd=function()
			{
				if(self.havePage())
				{
					self.currentPage=self.totalPage;
				}
			};
			self.isEnd=function()
			{
				return self.currentPage==self.totalPage;
			};
			self.getCurrentPageData=function()
			{
				return self.pageData[self.currentPage-1]||[];
			};
			self.havePage=function(){
				return self.totalPage>0;
			};
			self.go=function(page){
				if(self.havePage())
				{
					if(page<1)
					{
						self.goHead();
					}else if(page>self.totalPage){
						self.goEnd();
					}
					self.currentPage=page;
				}
				return self;
			};
			self.init=function(data,pagesize){
				self.pagesize=pagesize;
				self.data=data;
				self.pageData=_.chunk(self.data,self.pagesize);
		  		self.totalPage=self.pageData.length;
		  		self.currentPage=self.havePage()?1:0;
			};
			self.init(data,pagesize);
		};
		/*
		 *1.定时执行动画
		 *2.鼠标移动到dot上，清除定时器
		 *3.移动开添加定时器
		 */
		function PluginObject(target) {
			var self=this;
			self.imgEles;
			self.default="images/none.png";
			self.nextEle;
			self.prevEle;
			self.speed=1;
			self.pager;
			self.infinite;
			self.autorunFn;
			self.timeline = new TimelineMax({paused:true});

			self.pageWidth;
			self.pageHeight;
			self.scaleX;
			self.scaleY;
			self.scale;
			self.compoentWidth;
		  	self.compoentHeight;
			self.freshUI=function(){
				if(!self.infinite)
				{
					if(self.pager.isHead())
					{
						self.prevEle.addClass("disable");
					}else{
						self.prevEle.removeClass("disable");
					}
					if(self.pager.isEnd()){
						self.nextEle.addClass("disable");
					}else{
						self.nextEle.removeClass("disable");
					}
				}
			};
			self.turnPrev=function(){
				if(!self.timeline.isActive()){
					self.timeline.kill().clear();
					//当前页面的往右移动
				    var  curPageData=self.pager.getCurrentPageData();

				    var  prevPageData=self.pager.prev().getCurrentPageData();
				    
				    for(var i=0;i<curPageData.length;i++){
				    	self.timeline.add(TweenLite.to(curPageData[i],self.speed, {
					            x:self.pager.pagesize+"00%"
					    }), "0");
				    };
				    //前一页的移动到可视区域
				    for(var i=0;i<prevPageData.length;i++){
				    	TweenLite.set(prevPageData[i],{
					            x:"-100%"
					    });
				    	self.timeline.add(TweenLite.to(prevPageData[i],self.speed, {
					            x:i+"00%"
					    }), "0");
				    };
				    self.timeline.play();
				}
			};
			self.startAutorun=function()
			{
				window.clearInterval(self.autorunFn);
				self.autorunFn=setInterval(function(){
		  			self.turnNext();
		  			self.freshUI();
		  		},1000);
			};
			self.stopAutorun=function()
			{
				window.clearInterval(self.autorunFn);
			};
			self.turnNext=function(){
				if(!self.timeline.isActive()){
					self.timeline.kill().clear();
				    var  curPageData=self.pager.getCurrentPageData();
				    var  nextPageData=self.pager.next().getCurrentPageData();
				    for(var i=0;i<curPageData.length;i++){
				    	self.timeline.add(TweenLite.to(curPageData[i],self.speed, {
					            x: "-100%"
					    }), "0");
				    };
				    for(var i=0;i<nextPageData.length;i++){
				    	TweenLite.set(nextPageData[i],{
					            x:self.pager.pagesize+"00%"
					    });
				    	self.timeline.add(TweenLite.to(nextPageData[i],self.speed, {
					            x:i+"00%"
					    }), "0");
				    };
				    self.timeline.play();
				}
			};
		  	self.init=function(options){
		  		self.speed=options.speed;
		  		var qslideviewboxEle=target.find(".qslideviewbox");
		  		self.prevEle=target.find(".prev");
		  		self.nextEle=target.find(".next");
		  		self.infinite=options.infinite;
		  		self.autorun=options.autorun;
		  		var items=qslideviewboxEle.find(".item");
		  		items.css("transform","translateX(-100%)");
		  		var compoentWidth=items.eq(0).outerWidth()*options.pagesize;
		  		var compoentHeight=items.eq(0).outerHeight();
		  		self.compoentWidth=compoentWidth;
		  		self.compoentHeight=compoentHeight;
		  		qslideviewboxEle.css("width",compoentWidth);
		  		qslideviewboxEle.css("height",compoentHeight);
		  		target.css("width",compoentWidth);
		  		target.css("height",compoentHeight);
		  		var pager=new Pager(items.toArray(),options.pagesize,options.infinite);
		  		self.pager=pager;
		  		var  curPageData=self.pager.getCurrentPageData();
		  		for(var i=0;i<curPageData.length;i++)
		  		{
		  			$(curPageData[i]).css("transform","translateX("+(i*100)+"%)");
		  		};
		  		self.prevEle.on("click",function(){
		  			self.turnPrev();
		  			self.freshUI();
		  		});
		  		self.nextEle.on("click",function(){
		  			self.turnNext();
		  			self.freshUI();
		  		});
		  		if(self.autorun)
		  		{
		  			target.on("mouseenter",function(){
			  			self.stopAutorun();
			  		});
			  		target.on("mouseleave",function(){
			  			self.startAutorun();
			  		});
			  		self.startAutorun();
		  		}


		  		self.pageWidth=$(window).width();
				self.pageHeight=$(window).height();
				self.scaleX=1;
				self.scaleY=1;
				self.scale=1;

		  		$(window).resize(_.debounce(function () {
		  		  	scaleComponent(target,$(window).width(),$(window).height());
				}, 150));
				function scaleComponent(ele, maxWidth, maxHeight) {   
					console.log(maxWidth,self.compoentWidth);    
					console.log(maxHeight,self.compoentHeight);      
				    var scaleX = 1, scaleY = 1;     
				    scaleX = maxWidth /self.compoentWidth;
				    scaleY = maxHeight /self.compoentHeight;
				    self.scaleX = scaleX;
				    self.scaleY = scaleY;
				    self.scale = scaleX;//(scaleX > scaleY) ? scaleY : scaleX;
				    ele.attr('style', '-webkit-transform:scale(' + self.scale*detectZoom() + ')');

				    console.log(detectZoom())
				}
				
				function detectZoom (){
				  var ratio = 0,
				    screen = window.screen,
				    ua = navigator.userAgent.toLowerCase();
				 
				   if (window.devicePixelRatio !== undefined) {
				      ratio = window.devicePixelRatio;
				  }
				  else if (~ua.indexOf('msie')) {  
				    if (screen.deviceXDPI && screen.logicalXDPI) {
				      ratio = screen.deviceXDPI / screen.logicalXDPI;
				    }
				  }
				  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
				    ratio = window.outerWidth / window.innerWidth;
				  }
				   if (ratio){
				    ratio =ratio; Math.round(ratio * 100);
				   }
				   return ratio;
				};

		  	};

		}
})(jQuery);
