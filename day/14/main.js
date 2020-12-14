import * as util from "../../modules/util.js";

export function setup(){
    console.log("setup");
}
/**
 * 
 * @param {string} text 
 */
export function getInput(text){
    return text
        .split(/\r*\n/)
        .filter((line)=>(/^(mask = [X01]{36})|(mem\[\d+\] = \d+)/).test(line))
        .map(line=>{
            const [targetStr, valueStr] = line.split(" = ");
            if (targetStr === "mask"){
                const float = BigInt("0b" + valueStr.replaceAll("1", "0").replaceAll("X", "1"));
                const set = BigInt("0b" + valueStr.replaceAll("X", "0"));
                return {mask: {float, set}};
            } else if (targetStr.startsWith("mem")){
                const [, indexStr] = targetStr.split(/[\[\]]/);
                const index = BigInt(indexStr);
                const value = BigInt(valueStr);
                return {mem: {index, value}};
            } else {
                return undefined;
            }
        });
}
class Program{
    mask = {
        float: 0n,
        set: 0n
    }
    /** @type {Map<bigint, bigint>} */
    mem = new Map();
    pc = 0;
    /**
     * @type {(
     *  {mask: {reset:bigint, set:bigint}} |
     *  {mem: {index:bigint, value:bigint}}
     *  )[]}
     */
    code = [];
    reset(){
        this.mask = {
            float: 0n,
            set: 0n
        }
        this.mem = new Map();
        this.pc = 0;
    }
    run(code){
        this.load(code);
        while (this.pc < code.length){
            this.iterate();
        }
    }
    load(code) {
        this.reset();
        this.code = code;
    }
    iterate(){
        let {mask, mem} = this.code[this.pc];
        if (mask){
            this.exeMask(mask);
        } else if (mem){
            this.exeMem(mem)
        }
        this.pc++;
    }
    exeMask(mask){
        this.mask = mask
    }
    exeMem(mem){
        const {index, value} = mem;
        const {set, float} = this.mask;
        const res = (value & float) | set;
        this.mem.set( index, res & (2n**36n - 1n) );
    }
}


export function part1(input){
    const program = new Program();
    program.run(input);
    console.log(program.mem);
    let sum = 0n;
    for (const value of program.mem.values()){
        sum += value ?? 0n;
    }
    const result = sum;
    return {result};
}

class Program2 extends Program {
    exeMem(mem){
        const {float, set} = this.mask;
        const {index, value} = mem;
        const baseIndex = (index | set) & ~float;
        const baleAt = 2**9;
        let count = 0;
        for (const f of withinFloat(float)){
            if (count >= baleAt)throw new Error("to many floating bits");
            const i = baseIndex | f;
            this.mem.set(i, value);
            count++;
        }
    }
}
function* withinFloat(float){
    for (let num = 0n; num <= float; num++){
        while (num & ~float){
            num += num & ~float;
        }
        yield num
    }
}

export function part2(input){
    const program = new Program2();
    try {
        program.run(input);
    } catch (error) {
        return {result:error, error}; 
    }
    console.log(program.mem);
    let sum = 0n;
    for (const value of program.mem.values()){
        sum += value ?? 0n;
    }
    const result = sum;
    return {result};
}
