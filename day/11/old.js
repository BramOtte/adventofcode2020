function squared(matrix, width, height, lx, ty, r=1){
    const startY = Math.max(0, ty-r), endY = Math.min(height, ty+r); 
    const startX = Math.max(0, lx-r), endX = Math.min(width , lx+r);
    let count = 0;
    for (let y = startY; y < endY; y++){
        for (let x = startX; x < endX; x++){
            count += matrix[x + y * width];
        }
    }
    return count;
}
function iterate(gol, nextGol, mask, width, height){
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++){
            const i =  x + y * width;
            if (!mask[i])continue;
            const count = squared(gol, width, height, x, y);
            console.log(count);
            nextGol[i] = (count === 0 & !gol[i]) | (count <= 5  & gol[i])
        }
    }
}
/**
 * @param {("L"|"."|"#")[]} input
 * @returns {("L"|"."|"#")[]}
 */
function getSquare(input, lx, ty, r=1){
    const {width, height} = input;
    const startY = ty-r, startX = lx-r;
    const side = r*2+1;
    let square = new Array(side**2);
    for (let y = 0; y < side; y++){
        for (let x = 0; x < side; x++){
            const rx = x+startX, ry = y + startY;
            if (rx < 0 || rx > width || ry < 0 || ry > height){
                square[x + y*side] = input[(x+startX) + (y+startY)*width]
            } else {
                square[x + y*side] = ".";
            }
        }
    }
    square.width = side; square.height = side;
    return Object.freeze(square);
}



/**
 * @param {("L"|"."|"#")[]} input
 */
function getMask(input){
    return input.map(cell=>cell!==".");
}
/**
 * @param {("L"|"."|"#")[]} input
 */
function getGOL(input){
    return input.map(cell=>cell==="#");
}

/**
 * @param {("L"|"."|"#")[]} input
 */
export function part1(input){
    if (!input)return;
    const {width, height} = input;
    let gol = getGOL(input);
    let nextGol = new Array(input.length);
    let mask = getMask(input);
    console.log(gol);
    for (let i = 0; i < 5; i++){
        logGrid(gol, mask, width, height);
        iterate(gol, nextGol, mask, width, height);
        [gol, nextGol] = [nextGol, gol];
    }
    logGrid(gol, mask, width, height);
}
function iterate(gol, temp, mask, width, height){
    horizontal(gol, temp);
    vertical(temp, gol);
    gol = gol.filter((num, i)=>
        !mask[i] && (
            num === 0 || day ) 
        )
    );
}
function horizontal(gol, target, w, h){
    for (let y = 0; y < h; y++){
        const s = y*w
        target[s] = gol[0] + gol[1];
        for (let x = 1; x < w-1; x++){
            target[s+x] = gol[s+x-1] + gol[s+x] + gol[s+x+1];
        }
        target[s+w-1] = gol[s+w-2] + gol[s+w-1];
    }
}
function vertical(gol, target, w, h){
    target.fill(0);
    for (let y = 1; y < h-1; y++){
        target[y*w] = gol[(y)*w] + gol[(y+1)*w];
        for (let x = 0; x < w; x++){
            target[y*w+x] =  gol[(y-1)*w+x] + gol[(y)*w+x] + gol[(y+1)*w+x]
        }
        target[y*w+w-1] = gol[(y)*w-1] + gol[(y+1)*w];
    }
}



/**
 * @param {("L"|"."|"#")[]} input
 */
export function part2(){
    
}


function logGrid(gol, mask, width, height){
    const str = toString(gol, mask, width, height);
    util.HTMLDetails("grid at step");
    util.HTMLWrite(str);
    util.nextSpan();
}

function toString(gol, mask, width, height){
    let str = "";
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++){
            const i =  x + y * width;
            str += mask[i] ? (gol[i] ? "#" : "L") : "."
        }
        str += "\n";
    }
    return str;
}
