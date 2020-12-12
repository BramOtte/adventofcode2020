setDayNumber(10);
testDay("--- Adapter Array ---", getInput, part1, part2);

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
function part2ro(sorted, i, max=3, cache = {}){
    const startI = i;
    if (startI === sorted.length-1)return 1;
    const cached = cache[startI] ?? 0;
    if (cached)return cached;
    const from = sorted[i];
    let options = 0;
    for (i++; sorted[i] - from <= max && i < sorted.length; i++){
        options += part2ro(sorted, i, max, cache);
    }
    cache[startI] = options;
    return options;
}
function part2n(sorted, max=3){
    let count = 1;
    for (let i = sorted.length-1; i >= 0; i--){
        const lastCount = count;
        const current = sorted[i];
        for (let di = 1; di < max; di++){
            const previous = sorted[i-di];
            if (current-previous > max)break;
            count += lastCount;
        }
    }
    return count;
}

pref();
pref();
pref();
pref();
async function pref(){
    const its = 1;
    const input = await getInput("input.txt");
    let sorteds = new Array(its);
    for (let i = 0; i < sorteds.length; i++){
        sorteds[i] = input.slice();
    }
    let results = new Array(its);
    console.time("part2");
    for (let i = 0; i < its; i++){
        const sorted = sorteds[i].sort((a,b)=>a-b);
        // const res = part2r(sorted, 0, 3, new Map());
        // const res = part2ra(sorted, 0, 3, sorted.map(_=>0));
        const res = part2n(sorted, 3);
        results[i] = res;
    }
    console.timeEnd("part2");
    console.log(sorteds, results);
    return results;
}
