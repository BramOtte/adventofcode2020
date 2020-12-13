import { HTMLStringTable } from "../../modules/util.js";

export function getInput(text){
    return text.split(/\n[.\r]{0,4}\n/)
    .map(row=>row.split( /[\s]+/).map(kvStr=>kvStr.split(":")) )
    .map(kvs=>{
        const obj = {};
        for (const [key, value] of kvs){
            obj[key] = value;
        }
        return obj;
    });
}
// cid is ignored
const requiredFields = "byr iyr eyr hgt hcl ecl pid".split(" ");
function filter1(obj){
    return !requiredFields.some((field)=>!obj[field])
}
export function part1(input){
    const correct = input.filter(filter1);
    const incorrect = input.filter((obj)=>!filter1(obj));
    writeOutput(input, "all passports");
    writeOutput(correct, "correct passports");
    writeOutput(incorrect, "incorrect passports");
    const result = correct.length;
    return {result};
}
function within(value, min, max){
    return value >= min && value <= max;
}
const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const year = 2020;
const fieldRequirements = {
    byr:(string)=>(/\d{4}/).test(string)&&within(parseInt(string), year-100, year-18),
    iyr:(string)=>(/\d{4}/).test(string)&&within(parseInt(string), year-10, year),
    eyr:(string)=>(/\d{4}/).test(string)&&within(parseInt(string), year, year+10),
    hgt:(string)=>
        ( (/\d+cm/).test(string) && within(parseInt(string), 150, 193) )
        ||
        ( (/\d+in/).test(string) && within(parseInt(string), 59, 76) ),
    hcl:(string)=>(/#[0-9a-f]{6}/).test(string),
    ecl:(string)=>eyeColors.includes(string),
    pid:(string)=>string.length === 9 && (/\d{9}/).test(string)
}
function filter2(obj){
    return ! Object.keys(fieldRequirements)
    .some(key=>!(
        obj[key] !== undefined && fieldRequirements[key](obj[key])
    ))
}
export function part2(input){
    const correct = input.filter(filter2)
    const incorrect = input.filter((obj)=>!filter2(obj));
    writeOutput(input, "all passports");
    writeOutput(correct, "correct passports");
    writeOutput(incorrect, "incorrect passports");
    const result = correct.length;
    return {result};
}
function writeOutput(output, heading){
    HTMLStringTable(heading, output, requiredFields);
}
function test2(input){
    for (const key in fieldRequirements){
        const correct = input.filter(
            obj=>!(obj[key] && fieldRequirements[key](obj[key]) )
        )
        console.log(key, correct.map(obj=>obj[key]));
    }
}
