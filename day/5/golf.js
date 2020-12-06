const getIds = async href => (await fetch(href).then(res=>res..text()))
    .split(/\r*\n/).slice(0, -1)
    .map(row=>parseInt(row.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2) )
    .sort((a,b)=>a-b);

const part1 = ids => Math.max(...ids);

const part2 = ids => {
    let myId = ids[0];
    for (const id of ids){
        if (myId !== id)break;
        myId++;
    }
    return myId;
}
const part1oneLine = async href => Math.max(
    ...(await fetch(href).then(res=>res.text()))
    .split(/\r*\n/).slice(0, -1)
    .map(row=>parseInt(row.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2) )
);

const part2oneLine = async href => 
    (await fetch(href).then(res=>res.text()))
    .split(/\r*\n/).slice(0, -1)
    .map(row => parseInt(row.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2) )
    .sort((a,b)=>a-b)
    .find((id, index, ids) => ids[index+1]!==undefined&&id!==ids[index+1]-1)
    + 1

oneLiners();
async function oneLiners(){
    console.log(await part1oneLine("input.txt"));
    console.log(await part2oneLine("input.txt"));
}


nextArticle("Source");
HTMLDetails("get ids source");
HTMLWrite(getIds);
HTMLDetails("part1 source");
HTMLWrite(part1.toString());
HTMLDetails("part2 source");
HTMLWrite(part2.toString());
HTMLDetails("full source minified");
HTMLWrite("(async()=>{D=document;D.w=D.write;B=(await fetch('input.txt').then(a=>a.text())).split(/\\r*\\n/).slice(0,-1).map(a=>parseInt(a.replace(/[FL]/g,`0`).replace(/[BR]/g,`1`),2)).sort((c,a)=>c-a);D.w(`part 2: ${Math.max(...B)}<br>`);C=B[0];for(a of B){if(C!==a)break;C++}D.w(`part 2: ${C}<br>`)})()");
nextSpan();

setDayNumber(5);
testDay("--- Day 5: Binary Boarding---", getIds, part1, part2);


