import { HTMLStringTable } from "../../modules/util.js";

export function getInput(text){
    return Object.freeze(
        text
        .split("\n").slice(0, -1)
        .filter(row => /^\w* \w* \w* contain (no other bags|\d* (, ){0,1})./.test(row))
        .map(row=>{
            row = row.replace(".", "");
            const [container, contains] = row.split(" contain ");
            const [sat, color] = container.split(" ");
            let contents;
            if (contains.includes("other bags")){
                contents = [];
            } else {
                contents = contains.split(", ").map(content => {
                    const [count, sat, color] = content.split(" ");
                    return Object.freeze({count: parseInt(count), color:sat+" "+color});   
                });
            }
            return {color:sat+" "+color, contents};
        })
    );
}
export function part1(input){
    let count = 0;
    const colorSet = new Set(["shiny gold"]);
    while (count !== colorSet.size){
        count = colorSet.size
        input.forEach(bag => {
            const canContain = bag.contents.some(content => colorSet.has(content.color));
            if (canContain)colorSet.add(bag.color);
        });
    }
    colorSet.delete("shiny gold");
    logBags(
        "bags which contain shiny gold bags",
        input.filter(bag => colorSet.has(bag.color))
    );
    const result = colorSet.size;
    return {result};   
}
function logBags(heading, bags){
    const bagRecords = bags.map(bag=>{
            const color = bag.color;
            const contents = bag.contents.map(content=>{
                const {count, color} = content;
                return count + " " + color;
            }).join(", ");
            return {color, contents};
        })
    HTMLStringTable(heading, bagRecords, ["color", "contents"]);
}

export function part2(input){
    const bags = {}
    for (const bag of input){
        const {color, contents} = bag;
        bags[color] = contents;
    }
    const result = part2r(bags, "shiny gold") - 1
    return {result};
}

function part2r(bags, color){
    const contents = bags[color];
    if (contents.length === 0)return 1;
    return contents
        .map(content => part2r(bags, content.color) * content.count)
        .reduce( (acc, v) => acc + v, 1);
}

