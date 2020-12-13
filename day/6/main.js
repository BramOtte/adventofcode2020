import { HTMLStringTable } from "../../modules/util.js";

export function getInput(text){
    return text
        .split(/\r*\n\r*\n/)
    ;
}
export function part1(input){
    const groups = input.map(group=>{
        const answers = new Set(group.replace(/[^a-z]/g, ""));
        const yes = answers.size
        return {answers:[...answers.values()].sort().join(""), yes};
    });
    HTMLStringTable("groups", groups, ["answers", "yes"]);
    const result = groups.reduce((acc, count) => acc + count.yes, 0); 
    return {result}
}

export function part2(input){
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
    const result = groups.reduce((acc, count) => acc + count.yes, 0);
    return {result};
}


