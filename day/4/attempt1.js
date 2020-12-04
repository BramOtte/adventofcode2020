async function getInput(href){
    const text = await fetch(href).then(res=>res.text());
    const rows = text.split(/\n[^\n]{0,4}\n/);
    console.log(rows)
    const kvss = rows.map(row=>
        row.split(/[ \n]+/).map(kvStr=>kvStr.replaceAll(/s/g).split(":"))
    );
    console.log(kvss);
    const data = kvss.map(kvs=>{
        const obj = {};
        for (const [key, value] of kvs){
            obj[key] = value;
        }
        return Object.freeze(obj);
    });
    return data;
}
// cid is ignored
const requiredFields = "byr iyr eyr hgt hcl ecl pid".split(" ");
function part1(input){
    const correct = input.filter(obj=>
            !requiredFields.some((field)=>!obj[field])
        )
    return correct.length;
}
function within(value, min, max){
    return value >= min && value <= max;
}
const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const year = 2020;
const fieldRequirements = {
    byr:(string)=>within(parseInt(string), year-100, year-18),
    iyr:(string)=>within(parseInt(string), year-10, year),
    eyr:(string)=>within(parseInt(string), year, year+10),
    hgt:(string)=>
        ( (/\d+cm/).test(string) && within(parseInt(string), 150, 193) )
        ||
        ( (/\d+in/).test(string) && within(parseInt(string), 59, 76) ),
    hcl:(string)=>(/#[0-9a-f]{6}/).test(string),
    ecl:(string)=>eyeColors.includes(string),
    pid:(string)=>(/\d{9}/).test(string)
}
function part2(input){
    test2(input);
    const correct = input.filter(obj=>
            ! Object.keys(fieldRequirements)
            .some(key=>!(
                obj[key] !== undefined && fieldRequirements[key](obj[key])
            ))
        )
    console.log(correct);
    return correct.length;
}

function test2(input){
    for (const key in fieldRequirements){
        const correct = input.filter(
            obj=>!(obj[key] && fieldRequirements[key](obj[key]) )
        )
        console.log(key, correct.map(obj=>obj[key]));
    }
}