setDayNumber(4);
testDay("--- Day 4: Passport Processing ---", getInput, part1, part2);
function printOutput(output, heading){
    HTMLDetails(heading);
    HTMLWrite(output.join(" <end>\n")+ " <end>");
    nextSpan();
}

async function getInput(href){
    const text = await fetch(href).then(res=>res.text());
    const rows = text.split(/\n[.\r]{0,3}\n/);
    const kvss = rows.map(row=>
        row.split(/[ /n]+/)
        .map(kvStr=>kvStr.split(":"))
    )
    const kvsSorteds = kvss.map(kvs=>kvs
        .sort((a, b)=>a[0].localeCompare(b[0]) )
    );
    const kvsStrings = kvss.map(kvs=>kvs
        .map(kv=>kv.join(":"))
        .join(" ")
    )
    const kvsSortedStrings = kvsSorteds.map(kvs=>kvs
        .map(kv=>kv.join(":"))
        .join(" ")
    )
    const compKV = kvsStrings.join("").replaceAll(/\s/g, "");
    const compText = text.replaceAll(/\s/g, "");
    if (compKV != compText){
        console.log("is", compKV, '\n\nshould be', compText);
        throw new Error("text and input do not match");
    }

    for (kvs of kvsSorteds){
        let last = null;
        for (const [key, value] of kvs){
            if (key == last){
                console.error(`duplicate key "${key}}`);
            }
            last = key;
        }
    }
    return kvsSortedStrings;
}
const reg1 = /.*byr:.* ecl:.*eyr.* hcl:.* hgt:.* iyr:.* pid:.*/
function part1(input){
    const correct = input.filter(kvs=>{
        return reg1.test(kvs)
    });
    printOutput(input, "input");
    printOutput(correct, "correct");
    console.log("part1", correct);
    return correct.length;
}
const reg2 = /.*byr:(19[2-9][0-9]|200[0-2]).* ecl:(amb|blu|brn|grn|hzl|oth).* eyr:(20(2[0-9]|30)).* hcl:(#[0-9a-f]{6}).* hgt:(1([5-8][0-9]|9[0-3])cm|(59|6[0-9]|7[0-6])in).* iyr:(20(1[0-9]|30)).* pid:(\d{9}).*/;


function part2(input){
    const correct = input.filter(kvs=>{
        return reg2.test(kvs)
    });
    printOutput(input, "input");
    printOutput(correct, "correct");
    console.log("part2", correct);
    return correct.length;
}
