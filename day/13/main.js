import * as util from "../../modules/util.js";

export function setup(){
    console.log("setup");
}
/**
 * 
 * @param {string} text
 */
export function getInput(text){
    const [timeStr, bussesStr] = text.split(/\r*\n/);
    const time = parseInt(timeStr);
    const busses = Object.freeze(
        bussesStr.split(",")
        .filter(id=>(/^\d+|x/).test(id))
        .map(id=> id === "x"?"x":parseInt(id))
    )
    return Object.freeze({
        time, busses   
    });
}
function getDeparture(id, time){
    const progress = time % id;
    const departure = time + (id - progress);
    return departure;
}
/**
 * 
 * @param {{time:number, busses:number[]}} input 
 */
export function part1(input){
    const {time, busses} = input;
    const {ids} = getIdsAndOffsets(busses);
    const nextDepartures = ids.map(id => {
        const departure = getDeparture(id, time);
        return {id, departure};
    });

    const sortedDepartures = nextDepartures
        .sort((a,b)=>a.departure - b.departure);
    
    const first = sortedDepartures[0];

    const id = first.id;
    const wait = first.departure - time;

    const result = id * wait;
    return {result};
}
/**
 * 
 * @param {number[]} busses 
 */
function getIdsAndOffsets(busses){
    const ids = [];
    const offsets = [];
    let offset = 0;
    for (const id of busses){
        if (id !== "x"){
            ids.push(id);
            offsets.push(offset);
        }
        offset++;
    }
    return {ids, offsets}
}
/**
 * 
 * @param {{time:number, busses:number[]}} input 
 */
export function part2(input){
    const {time, busses} = input;
    const {ids, offsets} = getIdsAndOffsets(busses);
    let product = 1;
    let t = 0;
    for (let i = 1; i < ids.length; i++){
        while (!test2(ids, offsets, t, i, i+1)){
            t += product;
        }
        const id1 = ids[i-1], id2 = ids[i];
        product *= id1 / gcd(id1, id2);
    }
    const result = t;
    return {
        result,
        expected: time 
    };
}
/**
 * 
 * @param {number[]} ids
 * @param {number[]} offsets 
 * @param {number} time 
 */
function test2(ids, offsets, time, begin=0, end=ids.length){
    for (let i = begin; i < end; i++){
        const offset = offsets[i], id = ids[i];
        const phase = time % id;
        const expectedPhase = (id - ( offset%id) ) % id
        if (phase !== expectedPhase)return false;
    }
    return true;
}

function gcd(a, b){
    while (b > 0){
        const r = a%b;
        [a,b] = [b, r];
    }
    return a
}