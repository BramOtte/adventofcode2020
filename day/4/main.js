setDayNumber(4);
testDay("--- Day 4 ---", getInput, part1, part2);

async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .split("\n").slice(0, -1)
    ;
}
function part1(input){
    let result = 1;
    return result;
}

function part2(input){
    let result = 2;
    return result;
}


