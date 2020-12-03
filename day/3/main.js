setDayNumber(3);
testDay("--- Day 3: Toboggan Trajectory ---", getInput, part1, part2);

async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .replaceAll("\r", "")
        .split("\n").slice(0, -1)
        .map(row=>row.split(""))
    ;
}
function getCell(input, x, y){
    const row = input[y];
    return row[x%row.length]
}
function setCell(input, x, y, value){
    const row = input[y];
    row[x%row.length] = value;
}
function part1(input){
    const count = countTrees(input, 0, 0, 3, 1);
    printInput(input);
    return count;
}
function part2(input){
    const slopes = [ [1,1], [3,1], [5,1], [7,1], [1,2] ]
    let product = 1;
    for (const [dx, dy] of slopes){
        const count = countTrees(input, 0, 0, dx, dy);
        product *= count
        HTMLWrite(`${count}, `);
    }
    printInput(input);
    return product;
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
    let text = input
        .map(row=>row.join(""))
        .join("\n");
    HTMLWrite(text);
    nextSpan();
}
