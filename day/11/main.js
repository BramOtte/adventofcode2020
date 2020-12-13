import * as util from "../../modules/util.js";
import Matrix from "../../modules/Matrix.js";

export function setup(){
    console.log("setup");
}
/**
 * 
 * @param {string} text
 * @returns {Matrix}
 */
export function getInput(text){
    let lines = text
        .split(/\r*\n/)
        .filter((line) => (/^[L.#]+/).test(line))
        .map(line=>line.split(""));
    
    if (lines.length < 2)return null;
    
    const width = lines[0].length;
    const height = lines.length;
    
    const occupieds = Matrix.newFill(width, height, 0)
        .map((_, x, y)=>lines[y][x]==="#"?1:0);
    
    const seats = Matrix.newFill(width, height, 0)
        .map((_, x, y)=>lines[y][x] !== "."?1:0);
    
        return Object.freeze({
        occupieds: Object.freeze(occupieds),
        seats: Object.freeze(seats)
    });
}

/**
 * 
 * @param {{occupied:Matrix, seats:Matrix}} input 
 */
export function part1(input){
    if (!input)return;
    const {occupieds, seats} = input;
    if (occupieds.width > 10)return;
    let toIterate = occupieds;
    let lastString = toString(toIterate, seats);
    let string = "";
    util.HTMLDetails("seats", lastString);
    while (string != lastString){
        lastString = string;
        toIterate = iterate(toIterate, seats);
        string =  toString(toIterate, seats)
        // util.HTMLDetails("seats", string);
    }
    const result = string.replace(/[^#]/g, "").length;
    return {result}
}
function toString(occupieds, seats){
    let fields = seats.map((exists, x, y)=>{
        const occupied = occupieds.get(x,y);
        return exists ? (
            occupied ? "#" : "L"
        ) : ".";
    });
    return fields.toString();
}
function iterate(occupieds, seats){
    const nextOccupieds = occupieds.map((occupied, x, y) =>{
        const adjacent = 
        occupieds.get(x-1, y-1, 0) + occupieds.get(x, y-1, 0) + occupieds.get(x+1, y-1, 0) +
        occupieds.get(x-1, y, 0)   +                        occupieds.get(x+1, y, 0) +
        occupieds.get(x-1, y+1, 0) + occupieds.get(x, y+1, 0) + occupieds.get(x+1, y+1, 0)
        return ( adjacent === 0 || (occupied && adjacent < 4 ) ) 
            && seats.get(x, y, 0) ? 1 : 0;
    });
    return nextOccupieds;
}

/**
 * 
 * @param {Matrix} input 
 */
export function part2(input){
    if (!input)return;
    const {occupieds, seats} = input;
    // if (occupieds.width > 10)return;
    let toIterate = occupieds;
    let lastString = toString(toIterate, seats);
    let string = "";
    util.HTMLDetails("seats", lastString);
    while (string != lastString){
        lastString = string;
        toIterate = iterate2(toIterate, seats);
        string =  toString(toIterate, seats)
        util.HTMLDetails("seats", string);
    }
    const result = string.replace(/[^#]/g, "").length;
    return {result}
}

function iterate2(occupieds, seats){
    const scan = getFirst(occupieds, seats);
    const tl = scan(-1, -1), tm = scan(0, -1), tr = scan(1, -1),
        ml = scan(-1, 0),                  mr = scan(1, 0),
        bl = scan(-1, 1), bm = scan(0, 1), br = scan(1, 1);
    const nextOccupieds = occupieds.map((occupied, x, y) =>{
        const adjacent = 
            tl(x, y) + tm(x, y) + tr(x, y) +
            ml(x, y) +            mr(x, y) +
            bl(x, y) + bm(x, y) + br(x, y);
        return ( adjacent === 0 || (occupied && adjacent < 5 ) ) 
            && seats.get(x, y, 0) ? 1 : 0;
    });
    return nextOccupieds;
}

function getFirst(occupieds, seats){
    return (dx, dy) => (x, y)=>{
        while (y >= 0 && y < seats.height && x >= 0 && x < seats.width){
            x += dx;
            y += dy;
            const exists = seats.get(x, y, 0);
            const occupied = occupieds.get(x, y, 0);
            if (exists)return occupied ?? 0;
        }
        return 0;
    }
}
