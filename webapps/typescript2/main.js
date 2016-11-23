define(["require", "exports", "./greet", "jquery"], function (require, exports, greet_1, $) {
    "use strict";
    $(document).ready(function () {
        $("#btn").click(function () {
            alert(greet_1.sayHello("TypeScript"));
        });
    });
});
//# sourceMappingURL=main.js.map