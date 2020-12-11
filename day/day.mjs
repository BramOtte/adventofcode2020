"use strict";
import * as util from "../util.mjs";

export async function setup({pDays, dayNr}){
    const days = await pDays ?? {};

    let { title, input, examples } = days[dayNr] ?? {};
    title ??= "no title";
    input ??= "input.txt";
    examples ??= ["example1.txt"];

    util.nextArticle(`--- Day ${dayNr}: ${title} ---`)

    const base = `./${dayNr}/`;

    const [code, mainText, exampleText] = await Promise.all([
        import(base+`main.mjs`),
        util.getText(base+input),
        Promise.all( examples.map(href=>util.getText(base+href)) )
    ]);
    console.log(code, mainText, exampleText);

    await code?.setup?.();

    const mainInput = code.getInput(mainText);
    const exampleInput = exampleText.map(text => code.getInput(text));
    
    callPart(code.part1);
    util.nextArticle("-- part2 --")
    callPart(code.part2);
    
    function callPart(part){
        let i = 0;
        for (const example of exampleInput){
            util.nextP(`- ${examples[i++]} -`)
            partOnInput(example, part);
        }
        util.nextP("- challenge -")
        partOnInput(mainInput, part);
    }
}


function partOnInput(input, part){
    const retObject = part(input);
    const result = retObject?.result ?? "no result";
    util.HTMLOutput(result);
}
