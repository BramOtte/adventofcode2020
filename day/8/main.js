setDayNumber(8);
testDay("--- Day 8 ? ---", getInput, part1, part2);

async function getInput(href){
    return Object.freeze(
        (await fetch(href).then(res=>res.text()))
        .split(/\r*\n/)
        .filter( (line) => (/^\w{3} [+-]\d+/).test(line) )
        .map( (line) => {
            const [opp, val] = line.split(" ");
            return Object.freeze({opp:opp, val:parseInt(val)});
        })
    );
}
class Program {
    pc = 0;
    acc = 0;
    trace = [];
    static maxTime = 1_000_000;
    reset(){
        this.pc = 0;
        this.acc= 0;
        this.trace = [this.getNowTrace()]
    }
    run(lines){
        this.reset();
        let pcs = new Map();
        for (let i = 0; this.pc < lines.length; i++){
            const code = lines[this.pc];
            if (pcs.has(this.pc)){
                let lastI = pcs.get(this.pc);
                this.trace.push(this.getNowTrace());
                const cTrace = this.trace.slice(lastI);
                const objectTrace = Program.objectTrace(lines, cTrace);
                const msg = `error infinite loop in class Program\n`
                + `at pc = ${this.pc}\n`;
                return {msg, objectTrace};
            }
            pcs.set(this.pc, i);
            this.execute(code);
            this.pc++;
            this.trace.push(this.getNowTrace());
        }
        return 0;
    }
    getNowTrace(){
        return Object.freeze({pc: this.pc, acc: this.acc});
    }
    execute(line){
        const opp = this.getOpp(line.opp);
        opp(this, line.val);
    }
    getOpp(opcode){
        return Program.ops[opcode];
    }
    static ops = {
        acc: (program, val) => program.acc += val,
        jmp: (program, val) => program.pc += val-1,
        nop: (program) => {}
    }
    static objectTrace(lines, trace){
        if ( trace.length < 1)return "no trace";
        const {pc, acc} = trace[0];
        const objectTrace = [{pc, acc}]
        for (let i = 1; i < trace.length; i++){
            const {pc:line} = trace[i-1];
            const codeO = lines[line];
            const {opp, val} = codeO;
            const code = `${opp} ${val}`;
            const {pc, acc} = trace[i];
            const obj = Object.freeze({line, code, pc, acc});
            objectTrace.push(obj);
        }
        return objectTrace;
    }
    static stringTrace(lines, trace){
        const objectTrace = Program.objectTrace(lines, trace);
        return objectArrayToTableString(objectTrace, ["line", "code", "pc", "acc"]);
    }
}
function part1(input){
    HTMLWriteLn(`program length: ${input.length}`);
    const program = new Program();
    const error =  program.run(input);
    if (error){
        HTMLStringTable("error trace", error.objectTrace, ["line", "code", "pc", "acc"]);
        return `error | pc: ${program.pc}, acc: ${program.acc}`;
    }
    return `success | pc: ${program.pc}, acc: ${program.acc}`;
}
function replaceAndRun(program, input, num){
    let cNum = -1;
    let index = 0;
    const lines = input.map((line, i)=>{
        const {opp} = line;
        if (opp !== "acc"){
            cNum++
        }
        if (cNum === num && opp !== "acc"){
            index = i;
            return Object.freeze({...line, opp:opp==="nop"?"jmp":"nop"});
        } else {
            return line;
        }
    });
    const error = program.run(lines);
    return {error, index, lines};
}

function part2(input){
    HTMLWriteLn(`program length: ${input.length}`);
    const program = new Program();
    for (let n = 0; n < 1000; n++){
        const {error, index, lines:edited} = replaceAndRun(program, input, n);
        if (!error){
            const from = input[index];
            const to = {...from, opp:from.opp==="nop"?"jmp":"nop"};
            
            HTMLWriteLn(
                `changed: "${from.opp} ${from.val}" to "${to.opp} ${to.val}"`
            );
            HTMLStringTable(
                "program trace",
                Program.objectTrace(edited, program.trace),
                ["line", "code", "pc", "acc"]
            );

            return `success | line changed: ${index} | pc: ${program.pc}, acc: ${program.acc}`;
        }
    };
    return `error | pc:${program.pc}, acc:${program.acc}`;
}


