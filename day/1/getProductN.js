(async () => {
    const [exampleInput, input] = await Promise.all( [
        getInput("./exampleInput.txt"),
        getInput("./input.txt")
    ] );
    part1(exampleInput, 2020);
    part1(input, 2020);

    part2(exampleInput, 2020);
    part2(input, 2020);
})();



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
