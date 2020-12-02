setDayNumber(1);
testDay("--- Day 1: Report Repair ---", getInput, getProduct2, getProduct3);

function part1(input, targetSum=2020){
    console.log(input);
    HTMLWriteLn(`part 1 with ${input.length} numbers, `);
    const output = getProduct2(input, targetSum);
    return output;
}
function part2(input, targetSum=2020){
    console.log(input);
    HTMLWriteLn(`part 2 with ${input.length} numbers, `);
    const output = getProduct3(input, targetSum);
    return output
}
function getInput(src){
    return fetch(src)
        .then(v=>v.text())
        .then(v=>v.split("\n")
        .slice(0, -1)
        .map(v=>parseInt(v)))
    ;
}
function getProduct2(input, targetSum=2020){
    let product = 1;
    OUTER_LOOP:
    for (let i = 0;i < input.length; i++){
        for (let j = i; j < input.length; j++){
            const sum = input[i] + input[j];
            if (sum === targetSum){
                product = input[i] * input[j]
                break OUTER_LOOP;
            }
        }
    }
    return product;
}
function getProduct3(input, targetSum=2020){
    let product = 1;
    OUTER_LOOP:
    for (let i = 0;i < input.length; i++){
        for (let j = i; j < input.length; j++){
            for (let k = j; k < input.length; k++){
                const sum = input[i] + input[j] + input[k];
                if (sum === targetSum){
                    product = input[i] * input[j] * input[k];
                    break OUTER_LOOP;
                }
            }
        }
    }
    return product;
}
