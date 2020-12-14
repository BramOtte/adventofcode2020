export default class AnimatedCanvas{
    canvas = document.createElement("canvas");
    ctx = this.canvas.getContext("2d");
    pointSize = 3;
    drawLines = true;
    setKeyFrames(keyFrames, beforeEach=()=>{}, afterEach=()=>{}){
        this.keyFrames = keyFrames;
        let frame = 0;
        setInterval(()=>{
            beforeEach(frame);
            this.animate(frame+=0.05);
            afterEach(frame);
        }, 20);
    }
    animate(frameNr){
        this.clear();
        frameNr = frameNr % this.keyFrames.length;
        const i = Math.floor(frameNr);
        const t = frameNr - i;
        const frame = this.keyFrames[i];
        if (typeof frame === "function"){
            frame(t);
        } else if (Array.isArray(frame)){
            for (const subFrame of frame){
                subFrame?.(t);
            }
        }
    }
    clear(){
        const {width, height} = this.ctx.canvas;
        this.ctx.clearRect(0, 0, width, height);
    }
    drawPoint(x, y){
        CTX.fillCircle(this.ctx, x, y, this.pointSize);
    }
    drawArc(x1, y1, x2, y2, radius){
        this.ctx.beginPath();
        this.ctx.arcTo(x1, y1, x2, y2, radius)
        this.ctx.stroke();
    }
    drawLine(x1, y1, x2, y2){
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    setPoint(x, y){
        return () => this.drawPoint(x, y);
    }
    movePoint(x1, y1, x2, y2){
        return t => {
            const cx = x1 + (x2-x1)*t;
            const cy = y1 + (y2-y1)*t;
            if(this.drawLines)this.drawLine(x1, y1, cx, cy);
            this.drawPoint(cx, cy);
        }
    }
    rotatePoint(x, y, ox, oy, angle) {
        const radius = distance(ox, oy, x, y);
        return t => {
            [x2, y2] = rotateO(x, y, ox, oy, angle*t);
            if (this.drawLines)this.drawArc(x, y, x2, y2, radius);
            this.drawPoint(x2, y2);
        }
    }
    
}
function distance(x1, y1, x2, y2){
    return (x2-x1)**2 + (y2-y1)**2;
}
function rotateO(x, y, ox, oy, angle){
    x -= ox; y -= oy;
    [x, y] = rotate(x, y, angle);
    x += ox; y += oy;
    return [x, y];
}
function rotate(x, y, angle){
    const vSin = sin(angle);
    const vCos = cos(angle);
    return [
        x * vCos - y * vSin,
        x * vSin + y * vCos
    ]
}

class CTX {
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx
     */
    static fillCircle(ctx, x, y, r){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2);
        ctx.fill();
    }
}
