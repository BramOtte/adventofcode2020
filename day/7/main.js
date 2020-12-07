setDayNumber(7);
testDay("--- day 7 ---", getInput, part1, part2);

async function getInput(href){
    return Object.freeze(
        (await fetch(href).then(res=>res.text()))
        .split("\n").slice(0, -1)
        .map(row=>{
            row = row.replace(".", "");
            const [container, contains] = row.split(" contain ");
            const [sat, color] = container.split(" ");
            let contents;
            if (contains.includes("other bags")){
                contents = [];
            } else {
                contents = contains.split(", ").map(content=>{
                    const [count, sat, color] = content.split(" ");
                    return Object.freeze({count, color:sat+" "+color});   
                });
            }
            contents = Object.freeze(contents)
            return Object.freeze({color:sat+" "+color, contents});
        })
    );
}
function part1(bags){
    let count = 0;
    const colorSet = new Set(["shiny gold"]);
    while (count !== colorSet.size){
        count = colorSet.size
        bags.forEach(bag => {
            let canContain = bag.contents.some(content => colorSet.has(content.color));
            if (canContain){
                colorSet.add(bag.color);
            }
        });
    }
    colorSet.delete("shiny gold");
    return colorSet.size;
}

function part2(input){
    let bags = {}
    for (const bag of input){
        const {color, contents} = bag;
        bags[color] = contents;
    };
    return part2r(bags, "shiny gold")-1;
}

function part2r(bags, color){
    const contents = bags[color];
    if (contents === undefined){
        console.log(color);
    }
    if (contents.length === 0)return 1;
    return contents
        .map(content => part2r(bags, content.color) * content.count)
        .reduce( (acc, v) => acc + v, 1);
}

