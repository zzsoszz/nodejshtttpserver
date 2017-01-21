// Our countdown plugin takes a callback, a duration, and an optional message
jQuery.fn.countdown = function (callback, duration, message) {
    // If no message is provided, we use an empty string
    message = message || "";
    // Get reference to container, and set initial content
    var container = $(this[0]).html(duration + message);
    // Get reference to the interval doing the countdown
    var countdown = setInterval(function () {
        // If seconds remain
        if (--duration) {
            // Update our container's message
            container.html(duration + message);
        // Otherwise
        } else {
            // Clear the countdown interval
            clearInterval(countdown);
            // And fire the callback passing our container as `this`
            callback.call(container);   
        }
    // Run interval every 1000ms (1 second)
    }, 1000);

};

/*
 * http://developer.51cto.com/art/201105/263448.htm
 * http://developer.51cto.com/art/201105/263448.htm
 * http://stackoverflow.com/questions/2064186/how-can-i-make-a-jquery-countdown
 * http://stackoverflow.com/questions/2064186/how-can-i-make-a-jquery-countdown
// Use p.countdown as container, pass redirect, duration, and optional message
$(".countdown").countdown(redirect, 5, "s remaining");

// Function to be called after 5 seconds
function redirect () {
    this.html("Done counting, redirecting.");
    window.location = "http://msdn.microsoft.com";
}
*/