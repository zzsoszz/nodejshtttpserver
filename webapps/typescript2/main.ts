import { sayHello } from "./greet";
import * as $  from "jquery";
$(document).ready(function(){
    $("#btn").click(function(){
          alert(sayHello("TypeScript"));
    });
});