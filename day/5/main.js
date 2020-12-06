setDayNumber(5);
testDay("--- Day 5: Binary Boarding ---", getInput, part1, part2);

/**
 * 
 * @param {String} href 
 * @returns {String[]}
 */
async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .split(/\r*\n/).slice(0, -1)
        .map(row=>row.replaceAll(/[FL]/g, "0").replaceAll(/[BR]/g, "1")) 
    ;
}
/**  */
const FBCount = 7;
/** */
const RLCount = 3;

/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function idFromCoords(x, y){
    return y * 2**RLCount + x
}
/**
 * 
 * @param {String[]} input 
 */
function parseSeats(input){
    return input.map(code=>{
        const y = parseInt(code.substring(0, FBCount), 2); 
        const x = parseInt(code.substring(FBCount, FBCount+RLCount), 2);
        const id = idFromCoords(x, y);
        return Object.freeze({code, x, y, id});
    })
}
/**
 * 
 * @param {String[]} input 
 */
function part1(input){
    const parsed = parseSeats(input);
    HTMLStringTable("id of codes", parsed, ["code", "x", "y", "id"]);
    const ids = parsed.map(obj=>obj.id);
    return Math.max(...ids);
}
/**
 * 
 * @param {String[]} input 
 */
function part2(input){
    const parsed = parseSeats(input).sort((a,b)=>a.id-b.id);
    HTMLStringTable(
        "id of codes sorted by id",
        parsed, ["code", "x", "y", "id"]
    );

    const maxId = idFromCoords(2**RLCount - 2, 2**FBCount - 2)
    const ids = parsed.map(obj=>obj.id);
    let myId = ids[0];
    for (const id of ids){
        if (myId !== id)break;
        myId++;
    }
    if (myId > maxId){
        return NaN;
    } else {
        return myId;
    }
}

