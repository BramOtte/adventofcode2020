(async()=>{
    const exampleInput = await getInput("exampleInput.txt");
    const input        = await getInput("input.txt");


    const exampleOutput = countCorrectPasswords(exampleInput);
    console.log("example:", exampleInput);
    HTMLWriteLn(`example: ${exampleOutput}`);

    const output = countCorrectPasswords(input);
    console.log("input:", input);
    HTMLWriteLn(`output: ${output}`);


    const exampleOutput2 = countCorrectPasswords2(exampleInput);
    HTMLWriteLn(`example2: ${exampleOutput2}`);

    const output2 = countCorrectPasswords2(input);
    HTMLWriteLn(`output2: ${output2}`);
})();

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
