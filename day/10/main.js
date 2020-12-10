setDayNumber(10);
testDay("--- template ---", getInput, part1, part2);

async function getInput(href){
    const adapters = (await fetch(href).then(res=>res.text()))
        .split(/\r*\n/)
        .filter(row=>(/^\d+/).test(row))
        .map(row=>parseInt(row))
    return Object.freeze([
        0, Math.max(...adapters)+3,
        ...adapters
    ]);
}
function part1(input, max = 3){
    let sorted = Object.freeze( input.slice().sort((a, b) => a - b) );
    let diffCounts = new Array(max+1).fill().map(i=>0);
    for (let i = 0; i < sorted.length-1; i++){
        const diff = sorted[i+1] - sorted[i];
        if (diff < 1 || diff > max)console.error(sorted[i]);
        diffCounts[diff]++;
    }
    const result = diffCounts[1] * diffCounts[3];
    return `${diffCounts[1]} * ${diffCounts[3]} = ${result}`;

}

function part2(input, max = 3){
    let sorted = Object.freeze( input.slice().sort((a, b) => a - b) );
    let cache = new Map();
    let result = part2r(sorted, 0, max, cache);
    const cacheObjectLog = [...cache.entries()].map(entry=>{
        const [fromIndex, configurations] = entry;
        return {fromIndex, configurations};
    });
    HTMLStringTable(
        "individual configuration counts",
        cacheObjectLog,
        ["fromIndex", "configurations"]
    );
    console.log(cache);
    return result;
}

function part2r(sorted, i, max=3, cache = new Map()){
    const startI = i;
    if (cache.has(startI))return cache.get(startI);
    if (startI === sorted.length-1)return 1;
    const from = sorted[i];
    let options = 0;
    for (i++; sorted[i] - from <= max && i < sorted.length; i++){
        options += part2r(sorted, i, max, cache);
    }
    cache.set(startI, options);
    return options;
}


