setDayNumber(4);
testDay("--- Day 4: Passport Processing ---", getInput, part1, part2);

async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .split(/(\n[\s^\n]*){2}/g)
        .map(row=>row
            .split(/\s+/g)
            .map(cell=>cell.split(":"))
            .reduce((obj, kv)=>{
                const [key, value] = kv;
                obj[key] = value;
                return obj;
            }, {})
        )
    ;
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
const fieldRequirements = {
    byr:(string)=>within(parseInt(string), 1920, 2002),
    iyr:(string)=>within(parseInt(string), 2010, 2020),
    eyr:(string)=>within(parseInt(string), 2020, 2030),
    hgt:(string)=>
        (
            (/\d{3}cm/).test(string) && 
            within(parseInt(string), 150, 193) 
        ) ||
        (
            (/\d{2}in/).test(string) &&
            within(parseInt(string), 59, 76)
        ),
    hcl:(string)=>(/#[0-9a-f]{6}/).test(string),
    ecl:(string)=>eyeColors.includes(string),
    pid:(string)=>(/\d{9}/).test(string)
}
function part2(input){
    test2(input);
    const correct = input.filter(obj=>
            ! Object.keys(fieldRequirements)
            .some(key=>!(
                obj[key] && fieldRequirements[key](obj[key])
            ))
        )
    console.log(correct.map(obj=>obj.pid));
    return correct.length;
}

function test2(input){
    for (const key in fieldRequirements){
        const correct = input.filter(
            obj=>(obj[key] && fieldRequirements[key](obj[key]) )
        )
        console.log(key, correct.map(obj=>obj[key]));
    }
}

