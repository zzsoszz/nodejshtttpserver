(function($)
{
		var  defaultoptions = {
			  selector      : this.selector
		};
		
		var plugname="qmultiplyfilter";
		
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
		
		/*
		*负责filteritem标签的dom操作处理,以及和filterset交互
		*/
		function FilterItem(target)
		{
			var self=this;
			this.type;//single:单选 ,multiple:多选
			this.name;//String
			this.values=[];//Array
			var itemvalElements=target.find(".itemval");
			this.setValues=function(newValue)
			{
				//console.log("setValues");
				this.values=newValue;
				this.freshUI();
				//console.log("setValues end");
			};
			this.freshUI=function()
			{
				//console.log("freshUI");
				itemvalElements.each(
					function()
					{
						if($.inArray($(this).data("itemval")+"",self.values)>-1)
						{
							$(this).addClass("active");
							//console.log("acitve id:"+$(this).attr("id"));
						}
					}
				);
				//console.log("freshUI end");
			};
			this.init=function()
			{
				this.type=target.data("type");
				this.name=target.data("itemname");
				
				
				
				
				target.on("click",".itemval",$.proxy(function(event){
						if($(event.target).hasClass("itemval"))
						{
							var filterItemEle=$(event.target).closest(".filteritem");
							var type=filterItemEle.data("type");
							var itemname=filterItemEle.data("itemname");
							if($(event.target).hasClass("active"))
							{
								$(event.target).removeClass("active");
							}
							else
							{
								if(type=="single")
								{
									filterItemEle.find(".itemval").removeClass("active");;
								}
								$(event.target).addClass("active");
							};
							var all=filterItemEle.find(".active");
							var result=all.map(
								function(){
									return $(this).data("itemval")+"";
								}
							);
							this.type=type;
							this.name=itemname;
							this.values=result.get();
							setTimeout(function(){
									$(event.target).trigger("itemchanged");
							},1);
							
							
						}
				},this));
				
				
				
				
			};
			this.init();
		}
		
		/*
		*0.根据已经有的值初始化选项
		*
		*/
		function PluginObject(target)
		{
				var self=this;
				self.filteritemlmap={};
				self.options;
				self.filterSetChanged=function()
				{
					if(self.options.onchanged)
					{
						var list=[];
						for(var key in self.filteritemlmap)
						{
							list.push(self.filteritemlmap[key]);
						}
						self.options.onchanged.call(self,list);
					}
				};
				this.createAllFilteritem=function()
				{
					//console.log("createAllFilteritem");
					//点击选项事件处理
					target.find(".filteritem").each(
						function()
						{
							var ele=$(this);
							var item=new FilterItem(ele);
							ele.on("itemchanged",function(){
								self.filterSetChanged();
							});
							self.filteritemlmap[item.name]=item;
						}
					);
				};
				this.loadOldData=function()
				{
					//console.log("loadOldData");
					$(self.options.val).each(
						function()
						{
							self.filteritemlmap[this.name].setValues(this.values);
						}
					);
				};
				self.init=function(initoptions)
				{
					//console.log("init");
					self.options=initoptions;
					this.createAllFilteritem();
					this.loadOldData();
				};
		}
}
)(jQuery)


/*
模拟hashmap操作
var map = {}; // Map map = new HashMap();
map[key] = value; // map.put(key, value);
var value = map[key]; // Object value = map.get(key);
var has = key in map; // boolean has = map.containsKey(key);
delete map[key]; // map.remove(key); 
*/
