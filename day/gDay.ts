// let file = await Deno.readFile("day.js");
// console.log(file);
type IDay = {
    title?: string,
    examples?: 
}

export async function getDays(): Promise<Record<string, IDay>>
{
    const file = await Deno.readTextFile(`day/days.json`);
    const json = JSON.parse(file);
    return json;
}

export async function generate(days: Record<string, IDay>|Promise<Record<string, IDay>>)
{
    const template = await readDir("daySrc/template");
    days = await days;
    console.log(template);

    for ( const [dayNrStr, day] of Object.entries(days) ){
        const dayNr = parseInt(dayNrStr);
        const dir = `day/${dayNr}`;
        const htmlDir = `${dir}/index.html`
        await Deno.mkdir(dir);
        let html = template["index.html"];
        if (typeof html !== "string")throw new Error("couldn't find index.html");
        html = html.replaceAll("{{dayNr}}", dayNrStr);
        html = html.replaceAll("{{dayNr-1}}", (dayNr - 1).toString());
        html = html.replaceAll("{{dayNr+1}}", (dayNr + 1).toString());
        html = html.replaceAll("{{dayJSON}}", JSON.stringify(day));
        Deno.writeTextFile(htmlDir, html);

        writeToDir(dir, template, (d) => d !== htmlDir);
    }
}
type IFileTree = {
    [name: string]: string|IFileTree;
}

async function writeToDir(dir: string, files: IFileTree, filter?: (dir:string)=>boolean): Promise<void>{
    const promises: Promise<void>[] = [];
    for (const [name, branch] of Object.entries(files)){
        const subDir = `${dir}/${name}`;
        if (filter && !filter(subDir))continue;
        if (typeof branch === "string"){
            promises.push(Deno.writeTextFile(subDir, branch));
        } else {
            promises.push(writeToDir(subDir, branch, filter));
        }
    }
    await Promise.all(promises);
}

async function readDir(dir: string){
    const files: IFileTree = {};
    for await (const dirEntry of Deno.readDir(dir)){
        const {name, isDirectory, isFile} = dirEntry;
        const subDir = `${dir}/${name}`;
        if (isFile){
            files[name] = await Deno.readTextFile(subDir);
        } else if (isDirectory){
            files[name] = Object.freeze(await readDir(subDir));
        }
    }
    return Object.freeze(files);
}