import { deepCopy, HTMLDetails, HTMLWrite, nextSpan } from "../../modules/util.js";

export function getInput(text){
    return text
        .replaceAll("\r", "")
        .split("\n").slice(0, -1)
        .map(row=>row.split(""));
}
function getCell(input, x, y){
    const row = input[y];
    return row[x%row.length]
}
function setCell(input, x, y, value){
    const row = input[y];
    row[x%row.length] = value;
}
export function part1(input){
    const output = deepCopy(input)
    const count = countTrees(output, 0, 0, 3, 1);
    printInput(output);
    const result = count
    return {result};
}
export function part2(input){
    const output = deepCopy(input);
    const slopes = [ [1,1], [3,1], [5,1], [7,1], [1,2] ]
    let product = 1;
    for (const [dx, dy] of slopes){
        const count = countTrees(output, 0, 0, dx, dy);
        product *= count
        HTMLWrite(`${count}, `);
    }
    printInput(output);
    const result = product;
    return {result};
}
function countTrees(input, startX=0, startY=0, dx=3, dy=1){
    let count = 0;
    let x = startX, y = startY;
    for (;y<input.length; x+=dx, y+=dy){
        const cell = getCell(input, x, y)
        if (cell === "#" || cell === "X"){
            count++
            setCell(input, x, y, "X");
        } else {
            setCell(input, x, y, "O");
        }
    }
    return count;
}

function printInput(input){
    HTMLDetails("path");
    const text = input
        .map(row=>row.join(""))
        .join("\n");
    HTMLWrite(text);
    nextSpan();
}
