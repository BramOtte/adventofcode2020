const getInput = async href => 
    (await fetch(href).then(res=>res.text()))
    .split(/\r*\n/).slice(0, -1)
    .map(row=>row)

const part1 = input => {};
const part2 = input => {};
const part1oneLine = async href => 
    async href => (await fetch(href).then(res=>res.text()))
    .split(/\r*\n/).slice(0, -1)
.map(row=>row)

const part2oneLine = async href => 
    (await fetch(href).then(res=>res.text()))
    .split(/\r*\n/).slice(0, -1)
    .map(row=>row)

oneLiners();
async function oneLiners(){
    console.log(await part1oneLine("input.txt"));
    console.log(await part2oneLine("input.txt"));
}


nextArticle("Source");
HTMLDetails("getInput source");
HTMLWrite(getInput);
HTMLDetails("part1 source");
HTMLWrite(part1.toString());
HTMLDetails("part2 source");
HTMLWrite(part2.toString());
nextSpan();

setDayNumber(-1);
testDay("--- template golf---", getInput, part1, part2);


