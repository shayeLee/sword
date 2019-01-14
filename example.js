import { dateTool, variables, arrTool, strTool, objTool, domTool, fileTool, crypto } from "./src/index.js";

window.onload = function () {
    console.log(domTool.getElementLeft(document.getElementById("myDom"), document.documentElement));
}