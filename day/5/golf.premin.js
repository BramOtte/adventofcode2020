(async ()=>{
    const d = document;
    d.w = d.write;
    const ids = (await fetch("input.txt").then(r=>r.text()))
    .split(/\r*\n/).slice(0, -1)
    .map(r=>parseInt(r.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2)
    ).sort((a,b)=>a-b);

    d.w(`part 2: ${Math.max(...ids)}<br>`);
    
    let myId = ids[0];
    for (const id of ids){
        if (myId !== id)break;
        myId++;
    }
    d.w(`part 2: ${myId}<br>`);
})();
