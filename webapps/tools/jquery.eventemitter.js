
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
function Tab(target){
	var self=this;
	this.tab=target;
	this.items=target.find(".item");
	this.items.click(function(e){
		self.items.removeClass("active");
		$(e.currentTarget).addClass("active");
		self.updateValue();
	});
	this.updateValue=function(){
		var qvalue=target.find(".item.active").data("qvalue");
		self.emit('change',qvalue);
	};
}
jQuery.extend(Tab.prototype, jQuery.eventEmitter);

jQuery(document).ready(function() {
	new Tab($(".tab")).on("change",function(e,data){
		alert(data);
	});
});
