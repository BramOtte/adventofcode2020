setDayNumber(2);
testDay("--- Day 2: Password Philosophy ---", getInput, countCorrectPasswords, countCorrectPasswords2);

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
function countCorrectPasswords2(input){
    let count = 0;
    for (const row of input){
        const {range, letter, password} = row;
        const letterCount = range
            .map(pos => password[pos-1] === letter)
            .reduce((acc, v) => acc += v, 0);
        const isCorrect = letterCount == 1;
        count += isCorrect?1:0;
    }
    return count;
}
function countCorrectPasswords(input){
    let count = 0;
    for (const row of input){
        const [min, max] = row.range;
        const {letter, password} = row;
        const letterCount = countLetter(password, letter);
        if (letterCount >= min && letterCount <= max)count++;
    }
    return count;
}
function countLetter(string, letter){
    let count = 0;
    for (const char of string){
        if (char === letter)count++;
    }
    return count;
}
