import * as util from "../../modules/util.js";

export function setup(){
    console.log("setup");
}

export function getInput(text){
    return text
        .split(/\r*\n/)
        .filter((line) => (/^\w+/).test(line));
}

export function part1(){
    const result = undefined;
    return {result};
}

export function part2(){
    const result = undefined;
    return {result};
}
