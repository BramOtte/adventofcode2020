import Emitter from "./Emitter";

export default class Animator extends HTMLElement {
    constructor(){
        super();
    }
    updateEmitter = new Emitter();
}

customElements.define()