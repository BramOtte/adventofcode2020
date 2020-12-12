import * as util from "../../modules/util.mjs";

export function setup(){
    console.log("setup");
}

export function getInput(text){
    return text
        .split(/\r*\n/)
        .filter((line) => (/^\w+/).test(line));
}

export function part1(){
    return {result: 0};
}

export function part2(){
    
}
