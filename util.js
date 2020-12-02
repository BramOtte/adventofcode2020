const loggerDiv = document.createElement("div");
let loggerDivText = "";
addEventListener("load", ()=>HTMLLoggers.appendChild(loggerDiv));
// writeToHTML(...strings)
function HTMLWriteLn(...strings){
    HTMLWrite(...strings, "\n");
}
function HTMLWrite(...strings){
    loggerDivText += strings.join(" ");
    loggerDiv.innerText = loggerDivText;
}
