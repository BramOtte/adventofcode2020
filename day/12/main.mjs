"use strict";
import * as util from "../../modules/util.mjs";

export function setup(){
    console.log("setup");
}

export function getInput(text){
    return Object.freeze(
        text
        .split(/\r*\n/)
        .filter((line) => (/^[NSEWLRF]\d+/).test(line))
        .map(line => {
            const action = line[0];
            const value = parseInt(line.slice(1));
            return Object.freeze({action, value});
        })
    );
}
const fromDeg = Math.PI/180;
const {cos, sin, round} = Math;
/**
 * 
 * @param {{action: "N"|"S"|"E"|"W"|"L"|"R"|"F", value: number}[]} input 
 */
export function part1(input){
    let x = 0;
    let y = 0;
    let r = 0;
    for (const {action, value} of input){
        switch (action){
        case "N": y += value; break;
        case "S": y -= value; break;
        case "E": x += value; break;
        case "W": x -= value; break;
        case "L": r += value; break;
        case "R": r -= value; break;
        case "F":
            x += round(cos(r*fromDeg)) * value;
            y += round(sin(r*fromDeg)) * value;
            break;
        default:
            console.error(`unexpected action: ${action}`);
        }
    }
    const ax = Math.abs(x), ay = Math.abs(y)
    const result = ax + ay;
    return {
        calc: `${ax} + ${ay} = ${result}`,
        result: `${ax} + ${ay} = ${result}`
    };
}

/**
 * 
 * @param {{action: "N"|"S"|"E"|"W"|"L"|"R"|"F", value: number}[]} input 
 */
export function part2(input){
    let x = 0, y = 0;
    let wx = 10, wy = 1;
    for (const {action, value} of input){
        switch (action){
        case "N": wy += value; break;
        case "S": wy -= value; break;
        case "E": wx += value; break;
        case "W": wx -= value; break;
        case "L": [wx, wy] = rotate(wx, wy,  value*fromDeg); break;
        case "R": [wx, wy] = rotate(wx, wy, -value*fromDeg); break;
        case "F":
            x += wx * value;
            y += wy * value;
            break;
        default:
            console.error(`unexpected action: ${action}`);
        }
    }
    const ax = Math.abs(x), ay = Math.abs(y)
    const result = ax + ay;
    return {
        calc: `${ax} + ${ay} = ${result}`,
        result: `${ax} + ${ay} = ${result}`
    };
}

function rotate(x, y, deg){
    const vSin = round(sin(deg));
    const vCos = round(cos(deg));
    return [
        x * vCos - y * vSin,
        x * vSin + y * vCos
    ]
}
