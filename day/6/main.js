setDayNumber(6);
testDay("--- Day 6: Custom Customs ---", getInput, part1, part2);

async function getInput(href){
    return (await fetch(href).then(res=>res.text()))
        .split(/\r*\n\r*\n/)
    ;
}
function part1(input){
    const groups = input.map(group=>{
        const answers = new Set(group.replace(/[^a-z]/g, ""));
        const yes = answers.size
        return Object.freeze({answers:[...answers.values()].sort().join(""), yes});
    });
    HTMLStringTable("groups", groups, ["answers", "yes"]);
    return groups.reduce((acc, count) => acc + count.yes, 0);
}

function part2(input){
    const groups = input.map(group=>{
        const people = group.split(/\r*\n/)
            .filter(person=>person !== "")
            .map(person=>person.split(""));

        let answers = people[0];
        for (const person of people){
            answers = person.filter(answer=>answers.includes(answer));
        }
        return {answers:answers.sort().join(""), yes:answers.length}
    })
    HTMLStringTable("groups", groups, ["answers", "yes"]);
    return groups.reduce((acc, count) => acc + count.yes, 0);
}


