export default class Matrix {
    constructor(width, height, values){
        this.width = width; this.height = height;
        this.values = values;
    }
    static newFill(width, height, value){
        const values = new Array(width*height).fill(value);
        return new Matrix(width, height, values);
    }
    clone(){
        const {width, height, values} = this;
        return new Matrix(width, height, values.slice());
    }
    index(x, y){
        return x + y * this.width;
    }
    isField(x, y){
        return x >= 0 && x < this.width
            && y >= 0 && y < this.height;
    }
    unsafeGet(x, y){
        const index = this.index(x, y);
        return this.values[index];
    }
    get(x,y, def=undefined){
        if (!this.isField(x, y))return def;
        else return this.unsafeGet(x, y);
    }
    unsafeSet(x, y, value){
        const index = this.index(x, y);
        this.values[index] = value;
    }

    /**
     * 
     * @param {(val:any, x:number, y:number, source:Matrix)=>any} callback
     */
    map(callback, target = this.clone()){
        for (let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                target.unsafeSet(x, y,
                    callback(this.values[y*this.width + x], x, y, this, target)
                );
            }
        }
        return target;
    }
    toString(xSeparator="", ySeparator="\n" ){
        let lines = [];
        for (let y = 0; y < this.height; y++){
            lines.push(
                this.values.slice(y*this.width, (y+1)*this.width)
                .join(xSeparator)
            );
        }
        return lines.join(ySeparator);
    }
}
