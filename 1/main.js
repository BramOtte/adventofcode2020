(async () => {

    const exampleInput = await getInput("./exampleInput.txt");
    const input        = await getInput("./input.txt");
    part1(exampleInput, 2020);
    part1(input, 2020);

    part2(exampleInput, 2020);
    part2(input, 2020);
})();

function part1(input, targetSum=2020){
    console.log(input);
    HTMLWriteLn(`part 1 with ${input.length} numbers, `);
    const output = getProduct2(input, targetSum);
    HTMLWriteLn(`answer: ${output}\n`);
}
function part2(input, targetSum=2020){
    console.log(input);
    HTMLWriteLn(`part 2 with ${input.length} numbers, `);
    const output = getProduct3(input, targetSum);
    HTMLWriteLn(`answer: ${output}\n`);
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

function getProductN(input, targetSum=2020, n=3){
    let is = Array(n).fill(0);
    is[0] = -1;
    let finalProduct = 1;
    while (is[n-1] < input.length){
        // calculate the sum and product
        let sum = 0;
        let product = 1;
        for (const i of is){
            const value = input[i]
            sum += value;
            product *= value;
        }
        // check the sum
        if (sum == targetSum){
            finalProduct = product; break;
        }

        // calculate the next indexes
        is[0]++;
        for (let ii = 1; ii < n && is[ii-1] >= input.length; ii++){
            is[ii]++;
        }
        for (let ii = 0; ii < n-1; ii++){
            if (is[ii] >= input.length){
                is[ii] = is[ii+1];
            }
        }
    }
    return finalProduct;
}
