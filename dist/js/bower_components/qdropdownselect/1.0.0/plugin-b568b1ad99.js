(function($){

		var plugname="qdropdownselect";

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
			self=this;
			self.firstItem;
			self.lastItem;
			self.selectedItem;
			self.dropDownSelectEle;
			self.init=function(optionsnew)
			{
				self.dropDownSelectEle=optionsnew.dropDownSelectEle.clone().removeClass("qdropdownselectTemp");
				self.dropDownSelectEle.css({
									'position':'absolute',
									'width':target.outerWidth()+'px',
									'top':target.offset().top+target.outerHeight()+"px",
									'left':target.offset().left+"px",
									'box-sizing':'border-box'
				}).attr("id",target.attr("id")+"Qdropdownselect");
				$("body").append(self.dropDownSelectEle);
				self.firstItem=self.dropDownSelectEle.find(".qitem").first();
				self.lastItem=self.dropDownSelectEle.find(".qitem").last();
				var resizeTimer;
				$(document).on("keydown",function(event){
					event.preventDefault();
					console.log(event.keyCode);
					if(event.keyCode==37)
					{
						//left
					}else if(event.keyCode==38)
					{
						//top
					   
					   if(resizeTimer){
						   clearTimeout(resizeTimer)
					   }
					   resizeTimer=setTimeout(function(){
						  self.moveUp();
					   },100);

					}else if(event.keyCode==39)
					{
						//right
					}else if(event.keyCode==40)
					{
						//bottom
					   if(resizeTimer){
						   clearTimeout(resizeTimer)
					   }
					   resizeTimer=setTimeout(function(){
						  self.moveDown();
					   },100);
					}else if(event.keyCode==13)
					{
						//bottom
						self.comfirm();
					}
				});
				target.on("click",$.proxy(function(event){
					event.preventDefault();
					console.log("show",this.dropDownSelectEle.attr("id"));
					this.dropDownSelectEle.show();
				},this));
				/*
				target.on("focus",function(event){
					
				});
				*/
				$(document).on("click",$.proxy(function(event){
					console.log("click",event.target.id);
					if(event.target!=target.get(0) && $(event.target).closest(self.dropDownSelectEle).length  < 1) 
					{
						  console.log("hide",this.dropDownSelectEle.attr("id"));
						  this.dropDownSelectEle.hide();
					}
				},this));
				self.dropDownSelectEle.on("click",$.proxy(function(event){
					var v=$(event.target).closest(".qitem");
					if(v.length > 0) 
					{
						  this.setSelected(v);
						  this.comfirm();
					}
				},this));
				/*
				$(document).bind('mousewheel', function(event, delta) {
					var dir = delta > 0 ? 'Up' : 'Down';
					console.log(dir);
					return false;
				});
				*/
			};
			self.hide=function()
			{
				self.dropDownSelectEle.hide();
			};
			self.show=function()
			{
				self.dropDownSelectEle.show();
			};
			self.setSelected=function(qitemele)
			{
				if(self.selectedItem!=null)
				{
					self.selectedItem.removeClass("active");
				}
				if(qitemele.length>0)
				{
					self.selectedItem=qitemele.addClass("active");
				}else{
					self.selectedItem=null;
				}
			};
			self.setValue=function(val)
			{
				var result=self.dropDownSelectEle.find(".qitem").filter(function()
					{
						if($(this).data("qvalue")==val){
							return true;
						}
					}
				);
				if(result.length>0)
				{
					self.setSelected($(result.get(0)));
				}
			};
			self.comfirm=function()
			{
				target.trigger("qdropdownselect.change",self.selectedItem.data("qvalue"));
				self.hide();
			};
			self.moveDown=function(){
				if(self.selectedItem==null)
				{
					self.setSelected(self.firstItem);
				}else{
					self.setSelected(self.selectedItem.next());
				}
			};
			self.moveUp=function()
			{
				if(self.selectedItem==null)
				{
					self.setSelected(self.lastItem);
				}else{
					self.setSelected(self.selectedItem.prev());
				}
			};
		}
		/*
		PluginObject.prototype={
			init:function()
			{
				this.ele.on("keydown",function(event){
					console.log(event.keyCode);
				}
			},
			hide:function()
			{
				
			},
			show:function()
			{
				
			}
		}
		*/

})(jQuery);