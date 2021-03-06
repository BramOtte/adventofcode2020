import * as util from "../modules/util.js";
const pDays = util.getJSON("./days.json");
const urlParams = util.getUrlParams();
const dayNr = urlParams.day ?? 0;

util.setDayNumber(dayNr);
setup({pDays, dayNr});



export async function setup({pDays, dayNr}){
    const days = await pDays ?? {};

    let { title, input, examples } = days[dayNr] ?? {};
    title ??= "No Title";
    input ??= "input.txt";
    examples ??= ["1"];

    document.title = document.title.replace("((title))", title);
    util.nextArticle(`--- Day ${dayNr}: ${title} ---`)

    const base = `./${dayNr}`;

    const [code, mainText, exampleText] = await Promise.all([
        import(`${base}/main.js`),
        util.getText(`${base}/input.txt`),
        Promise.all( examples.map(href=>util.getText(`${base}/example/${href}.txt`)) )
    ]);
    console.log(code, mainText, exampleText);

    await code?.setup?.();

    const mainInput = util.deepFreeze(code.getInput(mainText));
    const exampleInput = exampleText.map(text => util.deepFreeze(code.getInput(text)) );
    
    console.log(mainInput, exampleInput);

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
    // util.nextArticle("-- performance --");
    // util.HTMLDetails("tests");
    // await util.wait(5);
    // await testPerformance(mainInput, code.part2)


}
function partOnInput(input, part){
    const retObject = part(input);
    const result = retObject?.result ?? "no result";
    util.HTMLOutput(result);
}
const maxTime = 1000;
const maxFails = 2;
async function testPerformance(input, part){
    let its = 1;
    let dt = 0;
    let fails = 0
    while (fails < maxFails){
        const start = Date.now();
        for (let i = 0; i < its; i++){
            part(input);
        }
        const end = Date.now();
        dt = end - start;
        util.HTMLOutput(`its: ${Math.floor(its)}, dt: ${dt}`);
        its*=1.5;
        if (dt > maxTime){
            fails++;
        } else {
            fails = 0;
        }
        await util.wait(0);
    }
}
