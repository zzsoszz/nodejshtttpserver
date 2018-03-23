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
			self.timeline = new TimelineMax({paused:true});
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
			self.turnNext=function(){
				if(!self.timeline.isActive()){
					self.timeline.kill().clear();
				    var  curPageData=self.pager.getCurrentPageData();
				    console.log(self.pager.currentPage);
				    var  nextPageData=self.pager.next().getCurrentPageData();
				    console.log(self.pager.currentPage);
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
		  		var items=qslideviewboxEle.find(".item");
		  		items.css("transform","translateX(-100%)");
		  		
		  		console.log("width",items.eq(0).outerWidth());//outerWidth
		  		console.log("Height",items.eq(0).outerHeight());

		  		qslideviewboxEle.css("width",items.eq(0).outerWidth()*options.pagesize);
		  		qslideviewboxEle.css("height",items.eq(0).outerHeight());
		  		var pager=new Pager(items.toArray(),options.pagesize,options.infinite);
		  		console.log(self);
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

		  		// 		self.timeline.addCallback(function(){
				//     	self.freshUI();
				// },"+2");


		  	};

		}
})(jQuery);
