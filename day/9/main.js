setDayNumber(9);
testDay("--- Day 9: Encoding Error ---", getInput, part1, part2);

async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .split(/\r*\n/)
        .filter(row=>/^\d+/.test(row))
        .map(row=>parseInt(row));
    ;
}
function isValid(num, preamble){
    for (let i = 0; i < preamble.length; i++){
        for (let j = i+1; j < preamble.length; j++){
            if (preamble[i] + preamble[j] === num){
                return true;
            }
        }
    }
    return false;
}
function getInvalidNumber(input){
    const preLength = input.length < 25 ? 5 : 25;
    for (let i = preLength; i < input.length; i++){
        const preamble = input.slice(i-preLength, i)
        const num = input[i];
        if ( !isValid(num, preamble) ){
            return input[i];
        }
    }
    return 0;
}

function part1(input){
    const invalid = getInvalidNumber(input);
    if (!invalid)return "all numbers where correct";
    return `${invalid} was incorrect`;
}

function getContiguous(num, input){
    for (let l = 2; l < input.length; l++){
        for (let p = 0; p <= input.length-l; p++){
            const slice = input.slice(p, p+l);
            const sum = slice.reduce( (acc, v) => acc + v, 0);
            if (sum === num){
                return slice;
            }
        }
    }
}
function part2(input){
    const invalid = getInvalidNumber(input);
    if (!invalid)return "all numbers where correct";
    const slice = getContiguous(invalid, input);
    if (!slice)return `no range found that sums up to ${invalid}`;
    let min = Math.min(...slice);
    let max = Math.max(...slice);
    let answer = min + max;
    return `${min} + ${max} = ${answer}`;
}


