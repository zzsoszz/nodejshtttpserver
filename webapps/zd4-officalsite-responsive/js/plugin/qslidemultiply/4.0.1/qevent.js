/*
	https://learn.jquery.com/events/event-extensions/
	http://benalman.com/news/2010/03/jquery-special-events/#api-setup
*/
 (function($){
	function GetSlideAngle(dx, dy) {
	    return Math.atan2(dy, dx) * 180 / Math.PI;
	}

	//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
	function GetSlideDirection(startX, startY, endX, endY) {
	    var dy = startY - endY;
	    var dx = endX - startX;
	    var result = 0;
	 
	    //如果滑动距离太短
	    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	        return result;
	    }
	 	
	    var angle = GetSlideAngle(dx, dy);
	    if (angle >= -45 && angle < 45) {
	        result = 4;
	    } else if (angle >= 45 && angle < 135) {
	        result = 1;
	    } else if (angle >= -135 && angle < -45) {
	        result = 2;
	    }
	    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	        result = 3;
	    }
	 
	    return result;
	};
	var touchCapable = ('ontouchstart' in window);
	var settings = {
	    startevent:  (touchCapable) ? 'touchstart' : 'mousedown',
	    endevent:    (touchCapable) ? 'touchend' : 'mouseup',
	    moveevent:   (touchCapable) ? 'touchmove' : 'mousemove',
	    tapevent:    (touchCapable) ? 'tap' : 'click',
		scrollevent: (touchCapable) ? 'touchmove' : 'scroll'
	};

	$.event.special.swipe={
		setup:function(){
			var originalCoord = {
			                    x: 0,
			                    y: 0
			};
			var finalCoord = {
                    x: 0,
                    y: 0
			};
			$(this).on(settings.startevent, function (e) {
				e.preventDefault();
			    originalCoord.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
				originalCoord.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;
			});
			$(this).on(settings.endevent, function (e) {
				e.preventDefault();
				$this = $(e.currentTarget);
			    finalCoord.x = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageX : e.pageX;
				finalCoord.y = (e.originalEvent.targetTouches) ? e.originalEvent.targetTouches[0].pageY : e.pageY;
			    var direction = GetSlideDirection(originalCoord.x, originalCoord.y, finalCoord.x, finalCoord.y);
			    switch (direction) {
				        case 0:
				            //alert("没滑动");
				            break;
				        case 1:
				            //alert("向上");
				            $this.trigger("swipeup");
				            break;
				        case 2:
				            //alert("向下");
				            $this.trigger("swipedown");
				            break;
				        case 3:
				        	//向左
				        	$this.trigger("swipeleft");
				            break;
				        case 4:
				            $this.trigger("swiperight");
				            //alert("向右");
				            break;
				        default:
				        	console.log("direction",direction);
				}
			});

		},
		teardown:function(){
			$(this).off(settings.startevent).off(settings.endevent);
		},
		remove:function(){
			$(this).off(settings.startevent).off(settings.endevent);
		}
	};

	 $.each({
	        scrollend: 'scrollstart',
	        swipeup: 'swipe',
	        swiperight: 'swipe',
	        swipedown: 'swipe',
	        swipeleft: 'swipe',
	        swipeend: 'swipe',
	        tap2: 'tap'
	    }, function (e, srcE) {
	        $.event.special[e] = {
	            setup: function () {
	                $(this).on(srcE, $.noop);
	            }
	        };
	});
	 
})(jQuery);






(function($){

  // A collection of elements to which the tripleclick event is bound.
  var elems = $([]),

    // Initialize the clicks counter and last-clicked timestamp.
    clicks = 0,
    last = 0;

  // Click speed threshold, defaults to 500.
  $.tripleclickThreshold = 500;

  // Special event definition.
  $.event.special.tripleclick = {
    setup: function(){
      // Add this element to the internal collection.
      elems = elems.add( this );

      // If this is the first element to which the event has been bound,
      // bind a handler to document to catch all 'click' events.
      if ( elems.length === 1 ) {
        $(document).bind( 'click', click_handler );
      }
    },
    teardown: function(){
      // Remove this element from the internal collection.
      elems = elems.not( this );

      // If this is the last element removed, remove the document 'click'
      // event handler that "powers" this special event.
      if ( elems.length === 0 ) {
        $(document).unbind( 'click', click_handler );
      }
    }
  };

  // This function is executed every time an element is clicked.
  function click_handler( event ) {
    var elem = $(event.target);

    // If more than `threshold` time has passed since the last click, reset
    // the clicks counter.
    if ( event.timeStamp - last > $.tripleclickThreshold ) {
      clicks = 0;
    }

    // Update the last-clicked timestamp.
    last = event.timeStamp;

    // Increment the clicks counter. If the counter has reached 3, trigger
    // the "tripleclick" event and reset the clicks counter to 0. Trigger
    // bound handlers using triggerHandler so the event doesn't propagate.
    if ( ++clicks === 3 ) {
      elem.trigger( 'tripleclick' );
      clicks = 0;
    }
  };

})(jQuery);


