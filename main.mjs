import * as util from "./modules/util.mjs";

export async function setup({pDays}){
    const days = await pDays;
    for (const n in days){
        const day = days[n];
        const link = document.createElement("a");
        link.innerText = `Day ${n}: ${day.title}`;
        link.href = `./day/?day=${n}`;
        HTMLLoggers.appendChild(link);
        HTMLLoggers.appendChild(document.createElement("br"));
    }
}
