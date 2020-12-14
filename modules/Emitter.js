export default class Emitter{
    listeners = new Set();
    addListener(callback){
        this.listeners.add(callback);
    }
    removeLister(callback){
        this.listeners.delete(callback);
    }
    emit(object){
        for (const listener of this.listeners){
            listener(object);
        }
    }
}