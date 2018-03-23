(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize 
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn) ) : this.trigger(sr); };

})(jQuery,'smartresize');

(function(jQuery) {
  jQuery.eventEmitter = {
    _JQInit: function() {
      this._JQ = jQuery(this);
    },
    emit: function(evt, data) {
      !this._JQ && this._JQInit();
      this._JQ.trigger(evt, data);
    },
    once: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.one(evt, handler);
    },
    on: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.bind(evt, handler);
    },
    off: function(evt, handler) {
      !this._JQ && this._JQInit();
      this._JQ.unbind(evt, handler);
    }
  };
}(jQuery));



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
			self.data;/*原始未分页数据*/
			self.pagesize;/*每一页元素个数*/
			self.pageData=[];
			self.currentPage;/*是否当前页*/
			self.totalPage;/*总页数*/
			self.infinite=infinite;/*是否无线循环*/
			self.prev=function()
			{
				if(self.currentPage>1)
				{
					self.currentPage--;
					self.emit('pageChange',self.currentPage);
				}
				else if(self.infinite && self.currentPage==1){
					 //如果是最后一页,移动到最后
					self.currentPage=self.totalPage;
					self.emit('pageChange',self.currentPage);
				}
				return self;
			};
			self.next=function()
			{
				if(self.currentPage<self.totalPage)
				{
					 self.currentPage++;
					 self.emit('pageChange',self.currentPage);
				}
				else if(self.infinite && self.currentPage==self.totalPage)
				{
					 //如果是最后一页,移动到第一页
					 self.currentPage=1;
					 self.emit('pageChange',self.currentPage);
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
					self.emit('pageChange',self.currentPage);
				}
			};
			self.goEnd=function()
			{
				if(self.havePage())
				{
					self.currentPage=self.totalPage;
					self.emit('pageChange',self.currentPage);
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
			self.getCurrentPage=function(){
				return self.currentPage;
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
				self.emit('pageChange',self.currentPage);
				return self;
			};
			self.setPageSize=function(pagesize)
			{
				self.init(self.data,pagesize);
				self.emit('totalPageChange',self.totalPage);
			};
			self.getPageSize=function()
			{
				return self.pagesize;
			};
			self.init=function(data,pagesize){
				self.pagesize=pagesize;
				self.data=data;
				self.pageData=_.chunk(self.data,self.pagesize);//分页后的数据，每个子数组一页
		  		self.totalPage=self.pageData.length;
		  		self.currentPage=self.havePage()?1:0;
			};
			self.init(data,pagesize);
		};

		$.extend(Pager.prototype, $.eventEmitter);

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
			self.qslideviewboxEle;
			self.items;
			self.options;
			self.viewport;
			self.dots;
			self.timeline = new TimelineMax({paused:true});
			self.turnPage=function(pageIndex)
		    {
		    	if(!self.timeline.isActive()){
					self.timeline.kill().clear();
					var  curPageData=self.pager.getCurrentPageData();
					var  prevPageIndex=self.pager.getCurrentPage();
				    var  nextPageData=self.pager.go(pageIndex).getCurrentPageData();
				    var  nextPageIndex=self.pager.getCurrentPage();
				    var direction;
				    if(prevPageIndex>nextPageIndex)
				    {
				    	direction="right"
				    }else{
				    	direction="left"
				    }
			    	self.transition(direction,curPageData,nextPageData,prevPageIndex,nextPageIndex);
			    }
		    };
		    self.turnNext=function(){
		    	if(!self.timeline.isActive()){
					self.timeline.kill().clear();
					var  curPageData=self.pager.getCurrentPageData();
					var  prevPageIndex=self.pager.getCurrentPage();
					var  nextPageData=self.pager.next().getCurrentPageData();
				    var  nextPageIndex=self.pager.getCurrentPage();
				    console.log(prevPageIndex,nextPageIndex);
				    self.transition("left",curPageData,nextPageData,prevPageIndex,nextPageIndex);
				}
		    };
		    self.turnPrev=function(){
		    	if(!self.timeline.isActive()){
					self.timeline.kill().clear();
				    var  curPageData=self.pager.getCurrentPageData();
					var  prevPageIndex=self.pager.getCurrentPage();
					var  nextPageData=self.pager.prev().getCurrentPageData();
				    var  nextPageIndex=self.pager.getCurrentPage();
				    console.log(prevPageIndex,nextPageIndex);
				    self.transition("right",curPageData,nextPageData,prevPageIndex,nextPageIndex);
				}
		    };
		    self.transition=function(direction,curPageData,nextPageData,prevPageIndex,nextPageIndex){
		    	console.log(direction);
		    	if(direction=="right")
		    	{
		    		//当前页移到最后面隐藏起来
					for(var i=0;i<curPageData.length;i++){
				    	self.timeline.add(TweenLite.to(curPageData[i],self.speed, {
					            x:self.pager.pagesize+"00%"
					    }), "0");
				    };
				    //下一页的移动到可视区域
				    for(var i=0;i<nextPageData.length;i++){
				    	TweenLite.set(nextPageData[i],{
					            x:"-100%"
					    });
				    	self.timeline.add(TweenLite.to(nextPageData[i],self.speed, {
					            x:i+"00%"
					    }), "0");
				    };
		    	}
		    	else if(direction=="left"){
		    		//当前页移到最前面隐藏起来
					for(var i=0;i<curPageData.length;i++){
				    	self.timeline.add(TweenLite.to(curPageData[i],self.speed, {
					            x: "-100%"
					    }), "0");
				    };
				    //下一页的移动到可视区域
				    for(var i=0;i<nextPageData.length;i++){
				    	TweenLite.set(nextPageData[i],{
					            x:self.pager.pagesize+"00%"
					    });
				    	self.timeline.add(TweenLite.to(nextPageData[i],self.speed, {
					            x:i+"00%"
					    }), "0");
				    };
		    	}
			    self.timeline.add(TweenLite.set(self.dots.get(prevPageIndex-1), {
				            className:"-=active"
				}), "0");
			    self.timeline.add(TweenLite.set(self.dots.get(nextPageIndex-1), {
				            className:"+=active"
				}), "0");
			    self.timeline.play();
			    self.freshPager();
		    };
			self.startAutorun=function()
			{
				window.clearInterval(self.autorunFn);
				self.autorunFn=setInterval(function(){
		  			self.turnNext();
		  		},1000);
			};
			self.stopAutorun=function()
			{
				window.clearInterval(self.autorunFn);
			};
			self.resizeComponent=function()
			{
				self.viewport={
					width:$(window).width(),
					height:$(window).height()
				};
				console.log(self.viewport);
				self.renderALL();
			};
			self.resetData=function(){
				self.items.css("transform","translateX(-100%)");
			};
			self.renderALL=function()
			{
				self.resetData();
				self.renderPager();
				self.renderChildren();
			};
			self.freshPager=function(){
				if(self.viewport.width < 900)
				{
					self.prevEle.addClass("disable");
					self.nextEle.addClass("disable");
					return;
				}
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
			self.renderPager=function()
			{
				if(self.viewport.width  <= 600){
					self.pager.setPageSize(1);
				}else if(self.viewport.width > 600 && self.viewport.width <= 900 ){
					self.pager.setPageSize(2);
				}else if(self.viewport.width > 900 && self.viewport.width <= 1200 ){
					self.pager.setPageSize(3);
				}else if(self.viewport.width > 1200){
					self.pager.setPageSize(4);
				}
		  		var  curPageData=self.pager.getCurrentPageData();
		  		for(var i=0;i<curPageData.length;i++)
		  		{
		  			$(curPageData[i]).css("transform","translateX("+(i*100)+"%)");
		  		};
		  		self.freshPager();
			};
			self.renderChildren=function()
			{
		  		self.items.css("width",target.width()/self.pager.getPageSize());
			};
		  	self.init=function(options){
		  		
		  		self.options=options;
		  		self.speed=self.options.speed;
		  		self.qslideviewboxEle=target.find(".qslideviewbox");
		  		self.prevEle=target.find(".prev");
		  		self.nextEle=target.find(".next");
		  		self.dotslistEle=target.find(".dotslist");
		  		self.items=self.qslideviewboxEle.find(".item");
		  		self.items.css("transform","translateX(-100%)");
		  		var pager=new Pager(self.items.toArray(),self.options.pagesize,self.options.infinite);
		  		self.pager=pager;
		  		self.pager.on("pageChange",function(e,val){
		  			self.freshPager();
		  		});
		  		self.pager.on("totalPageChange",function(e,val){
		  			self.dotslistEle.empty();
		  			for(var i=0;i<val;i++)
		  			{
		  				var dot=$("<div>").addClass("dot");
		  				self.dotslistEle.append(dot);
		  			}
		  			self.dots=self.dotslistEle.find(".dot");
		  		});
		  		self.pager.emit('totalPageChange',self.options.pagesize);
		  		self.prevEle.on("click",function(){
		  			self.turnPrev();
		  		});
		  		self.nextEle.on("click",function(){
		  			self.turnNext();
		  		});
		  		self.dotslistEle.on("click",function(event){
			      	self.turnPage(self.dots.get().indexOf(event.target)+1);
			    });
		  		if(self.options.autorun)
		  		{
		  			target.on("mouseenter",function(){
			  			self.stopAutorun();
			  		});
			  		target.on("mouseleave",function(){
			  			self.startAutorun();
			  		});
			  		self.startAutorun();
		  		};
		  		$(window).smartresize(function(){
		  			self.resizeComponent();
				});
		  		$(window).trigger("resize");

		  		/**/
		  		target.on("swiperight",function(e){
		  			e.preventDefault();
					self.turnPrev();
				});
				target.on("swipeleft",function(e){
					e.preventDefault();
					self.turnNext();
				});
				


		  	};

		}
})(jQuery);
