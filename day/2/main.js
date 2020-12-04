setDayNumber(2);
testDay("--- Day 2: Password Philosophy ---", getInput, part1, part2);

async function getInput(src){
    return (await fetch(src).then(v=>v.text()))
    .split("\n").slice(0, -1)
    .map(v=>v.split(" "))
    .map(v=>Object.freeze({
        range: v[0].split("-").map(v=>parseInt(v)),
        letter: v[1][0],
        password: v[2]
    }));
}
function countLetter(string, letter){
    let count = 0;
    for (const char of string){
        if (char === letter)count++;
    }
    return count;
}
function filter1(row){
    const [min, max] = row.range;
    const {letter, password} = row;
    const letterCount = countLetter(password, letter);
    return letterCount >= min && letterCount <= max
}
const keys = ["range", "letter", "password"]
function part1(input){
    const correct = input.filter(filter1);
    const incorrect = input.filter((row) => !filter1(row));
    HTMLStringTable("all passwords", input, keys);
    HTMLStringTable("correct passwords", correct, keys);
    HTMLStringTable("incorrect passwords", incorrect, keys);
    return correct.length;
}

function filter2(row){
    const {range, letter, password} = row;
    const letterCount = range
        .map(pos => password[pos-1] === letter)
        .reduce((acc, v) => acc += v, 0);
    return letterCount === 1;
}
function part2(input){
    const correct = input.filter(filter2);
    const incorrect = input.filter((row) => !filter2(row));
    HTMLStringTable("all passwords", input, keys);
    HTMLStringTable("correct passwords", correct, keys);
    HTMLStringTable("incorrect passwords", incorrect, keys);
    return correct.length;
}
