setDayNumber(4);
testDay("--- Day 4: Passport Processing ---", getInput, part1, part2);
async function getInput(href){
    const text = await fetch(href).then(res=>res.text());
    const rows = text.split(/\n[.\r]{0,4}\n/);
    console.log(rows)
    const kvss = rows.map(row=>
        row.split(/[\s]+/).map(kvStr=>kvStr.split(":"))
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
    );
    writeOutput(input, "all passports");
    writeOutput(correct, "correct passports");
    return correct.length;
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
function part2(input){
    const correct = input.filter(obj=>
            ! Object.keys(fieldRequirements)
            .some(key=>!(
                obj[key] !== undefined && fieldRequirements[key](obj[key])
            ))
        )
        writeOutput(input, "all passports");
        writeOutput(correct, "correct passports");
    return correct.length;
}
function writeOutput(output, heading){
    const text = output.map(obj=>{
            let str = "";
            for (const key of requiredFields){
                const value = obj[key];
                str += key + ":" + value + " "
            }
            return str;
        })
        .join("\n");
    HTMLDetails(heading);;
    HTMLWrite(text);
    nextSpan();
}
function test2(input){
    for (const key in fieldRequirements){
        const correct = input.filter(
            obj=>!(obj[key] && fieldRequirements[key](obj[key]) )
        )
        console.log(key, correct.map(obj=>obj[key]));
    }
}
