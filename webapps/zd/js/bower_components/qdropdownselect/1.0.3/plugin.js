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
			this.ele=target;
			this.firstItem;
			this.lastItem;
			this.selectedItem;
			this.dropDownSelectEle;
			this.fresh=function()
			{
				this.dropDownSelectEle.css({
					'width':this.ele.outerWidth()+'px',
					'top':this.ele.offset().top+this.ele.outerHeight()+"px",
					'left':this.ele.offset().left+"px"
				});
			};
			this.init=function(optionsnew)
			{
				this.dropDownSelectEle=optionsnew.dropDownSelectEle.removeClass("qdropdownselectTemp");
				this.dropDownSelectEle.css({
									'position':'absolute',
									'width':this.ele.outerWidth()+'px',
									'top':this.ele.offset().top+this.ele.outerHeight()+"px",
									'left':this.ele.offset().left+"px",
									'box-sizing':'border-box'
				}).attr("id",$.guid+"Qdropdownselect");
				$("body").append(this.dropDownSelectEle);
				this.firstItem=this.dropDownSelectEle.find(".qitem").first();
				this.lastItem=this.dropDownSelectEle.find(".qitem").last();
				var resizeTimer;
				$(document).on("keydown",$.proxy(function(event){
						if(this.ele.get(0)==event.target)
						{
							event.preventDefault();
							if(event.keyCode==37)
							{
								//left
							}else if(event.keyCode==38)
							{
								//top
							   (function(pluginobject)
									   {
											if(resizeTimer){
										   clearTimeout(resizeTimer)
									   }
									   resizeTimer=setTimeout(function(){
										  pluginobject.moveUp();
									   },100);
								})(this);
								
							}else if(event.keyCode==39)
							{
								//right
							}else if(event.keyCode==40)
							{
								//bottom
								(function(pluginobject)
									   {
											if(resizeTimer){
										   clearTimeout(resizeTimer)
									   }
									   resizeTimer=setTimeout(function(){
										  pluginobject.moveDown();
									   },100);
								})(this);

							}else if(event.keyCode==13)
							{
								//bottom
								this.comfirm();
							}
						}
					}
				,this));

				this.ele.on("click",$.proxy(function(event){
					event.preventDefault();
					//console.log("show",this.dropDownSelectEle.attr("id"));
					this.show();
				},this));

				$(document).on("click",$.proxy(function(event){
					//console.log("click",event.target.id);
					if(event.target!=this.ele.get(0) && $(event.target).closest(this.dropDownSelectEle).length  < 1 && $(event.target).closest(".qdropdownselecttarget").length  < 1) 
					{
						  //console.log("hide",this.dropDownSelectEle.attr("id"));
						  this.hide();
					}
				},this));
				this.dropDownSelectEle.on("click",$.proxy(function(event){
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
			this.hide=function()
			{
				this.dropDownSelectEle.hide();
			};
			this.show=function()
			{
				this.fresh();
				this.dropDownSelectEle.show();
			};
			this.setSelected=function(qitemele)
			{
				if(this.selectedItem!=null)
				{
					this.selectedItem.removeClass("active");
				}
				if(qitemele.length>0)
				{
					this.selectedItem=qitemele.addClass("active");
				}else{
					this.selectedItem=null;
				}
			};
			this.setValue=function(val)
			{
				var result=this.dropDownSelectEle.find(".qitem").filter(function()
					{
						if($(this).data("qvalue")==val){
							return true;
						}
					}
				);
				if(result.length>0)
				{
					this.setSelected($(result.get(0)));
				}
			};
			this.comfirm=function()
			{
				var data={
					value:this.selectedItem.data("qvalue"),
					name:this.selectedItem.text()?this.selectedItem.text():"",
				}
				this.ele.trigger("qdropdownselect.change",data);
				this.hide();
			};
			this.moveDown=function(){
				if(this.selectedItem==null)
				{
					this.setSelected(this.firstItem);
				}else{
					this.setSelected(this.selectedItem.next());
				}
			};
			this.moveUp=function()
			{
				if(this.selectedItem==null)
				{
					this.setSelected(this.lastItem);
				}else{
					this.setSelected(this.selectedItem.prev());
				}
			};
		}

})(jQuery);



if(angular && angular.module)
{
	var qui;
	try{
		qui=angular.module("qui")
	}catch(e)
	{
		qui=angular.module("qui",[]);
	}
	//angular.element("body>div.ng-scope").scope().username
	qui.directive('qdropdownselect',[function() {
	    return {
		        restrict: 'A',
		        priority: 100,
		        require: '?ngModel',
		        link: function(scope, element, attrs,controller) {


		        	element.qdropdownselect({dropDownSelectEle:$(attrs['qdropdownselecttemp'])});
		        	element.on("qdropdownselect.change",function(event,val){
			          element.val(val);
			          //attrs.$set('ngModel',val);
			          //attrs['ngModel'] 属性的名字
			          //attrs['ngModel'] 属性的的值
			         
			          scope.$apply(function() {
			          	   //console.log();
		                   scope[attrs['ngModel']]=val;
		                   //controller.$setViewValue(val);
		              });

			        });
			        //console.log("ngMoel",attrs);
				 　　// observe changes to interpolated attribute
				 　 attrs.$observe('ngModel', function(value) {
				     　　var newval=scope[value];
				     　　console.log('ngModel:'+value+' has changed value to ' + newval);
				     	 //element.qdropdownselect("setValue",""+newval);
				     	  if(newval!=undefined)
						  {
							 element.qdropdownselect("setValue",""+newval.value);
						  }
				 　 });


		        }
		    };
		}]
	);

	
}




