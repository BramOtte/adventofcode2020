const loggerDiv = document.createElement("div");
let loggerArticle = null;
let loggerP = null;
let loggerSpan = null;
addEventListener("load", ()=>{
    HTMLLoggers.appendChild(loggerDiv);
});
function wait(ms){
    return new Promise(res=>{
        setTimeout((...args)=>res(args), ms);
    });
}
function HTMLWriteLn(...strings){
    HTMLWrite(...strings, "\n");
}
function HTMLWrite(...strings){
    if (loggerSpan === null)nextSpan(); 
    loggerSpan.loggerText += strings.join(" ");
    loggerSpan.innerText = loggerSpan.loggerText;
}
function HTMLOutput(text){
    HTMLWrite("output:\n");
    const output = document.createElement("output");
    output.className = "day-success";
    output.value = text;
    loggerP.appendChild(output);
    loggerSpan = null;
}
function HTMLDetails(summeryText){
    const details = document.createElement("details");
    const summery = document.createElement("summary");
    const span = document.createElement("code");
    summery.innerText = summeryText;
    span.loggerText = "";
    loggerSpan = span;
    if (loggerP === null)nextP();
    loggerP.appendChild(details);
    details.appendChild(summery);
    details.appendChild(span);
    return details;
}
function nextSpan(){
    if (loggerP === null)nextP();
    loggerSpan = document.createElement("span");
    loggerP.appendChild(loggerSpan);
    loggerSpan.loggerText = "";
}
function nextP(heading){
    if (loggerArticle === null)nextArticle();
    loggerP = document.createElement("p");
    
    loggerArticle.appendChild(loggerP);
    if (heading !== undefined){
        const header = document.createElement("h4");
        header.innerText = heading;
        loggerP.appendChild(header);
    }
}
function nextArticle(heading = "no title"){
    loggerArticle = document.createElement("article");
    const header = document.createElement("h2");
    header.innerText = heading;

    loggerDiv.appendChild(loggerArticle);
    loggerArticle.appendChild(header);
    loggerP = null;
}
function objectArrayToTableString(objArr=[], keys=[]){
    let lengthMap = {};
    for (const key of keys){
        lengthMap[key] = key.length;
    }
    for (const obj of objArr){
        for (const key of keys){
            const value = obj[key]?.toString()??"";
            if (value === "")continue;
            lengthMap[key] = Math.max(value.length??0, lengthMap[key]);
        }
    }
    const keysString = "| " + keys.map(key =>
        key + ".".repeat(lengthMap[key] - key.length)
    ).join(" | ") + " |"

    const valuesString = objArr.map(obj=>
        "| " + keys.map(key => {
            let value = obj[key]?.toString()??"";
            value = value?.replaceAll(/[\n\r]/g, "")
            value += ".".repeat(lengthMap[key] - value.length);
            return value
        }).join(" | ") + " |"
    )
    .join("\n");

    return keysString + "\n" +
    "-".repeat(keysString.length) + "\n" +
    valuesString;
}
function HTMLStringTable(heading, objArr, keys){
    const text = objectArrayToTableString(objArr, keys);
    const details = HTMLDetails(heading);
    HTMLWrite(text);
    nextSpan();
    return details;
}
function setDayNumber(day){
    addEventListener("load", ()=>{
        document.title = document.title.replace("((day))", day);
        for (const a of document.getElementsByTagName("a")){
            a.href = a.href.replace("((day-1))", day-1);
            a.href = a.href.replace("((day+1))", day+1);
        }
    });
}


async function testDay(
    title, getInput=()=>"no input",
    part1=()=>"no solution", part2=()=>"no solution",
    inputRef1="./exampleInput.txt", 
    inputRef2="./input.txt"
){
    nextArticle(title);
    const [exampleInput, input] = await Promise.all( [
        getInput(inputRef1),
        getInput(inputRef2)
    ] );
    console.log(exampleInput, input);
    nextP("example");
    const o1e = part1(exampleInput);
    HTMLOutput(o1e)

    nextP("challenge");
    const o1 = part1(input);
    HTMLOutput(o1)

    nextArticle("--part 2--");
    nextP("example");
    const o2e = part2(exampleInput);
    HTMLOutput(o2e)

    nextP("challenge");
    const o2 = part2(input);
    HTMLOutput(o2)
};
