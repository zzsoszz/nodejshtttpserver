var app = angular.module("myApp", []);
app.directive('includeReplace', function () {
    return {
        require: 'ngInclude',
        restrict: 'A', /* optional */
        link: function (scope, el, attrs) {
            el.replaceWith(el.children());
        }
    };
});
// var debugscript=$("<script>").attr("src","http://192.168.1.213:8080/target/target-script-min.js#anonymous");
// $("body").css("-webkit-text-size-adjust","100%");
// $("head").append(debugscript);
