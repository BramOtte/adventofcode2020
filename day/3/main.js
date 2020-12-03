setDayNumber(3);
testDay("--- Day 3: Toboggan Trajectory ---", getInput, part1, part2);

async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .replaceAll("\r", "")
        .split("\n").slice(0, -1)
    ;
}
function getCell(input, x, y){
    const row = input[y];
    return row[x%row.length]
}
function part1(input){
    return countTrees(input, 0, 0, 3, 1);
}
function countTrees(input, startX=0, startY=0, dx=3, dy=1){
    let count = 0;
    let x = startX, y = startY;
    for (;y<input.length; x+=dx, y+=dy){
        if (getCell(input, x, y) === "#"){
            count++
        }
    }
    return count;
}

function part2(input){
    const slopes = [
        [1,1],
        [3,1],
        [5,1],
        [7,1],
        [1,2]
    ]
    let product = 1;
    for (const [dx, dy] of slopes){
        product *= countTrees(input, 0, 0, dx, dy);
    }
    return product;
}


