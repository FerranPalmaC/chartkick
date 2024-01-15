import { Controller } from "../js/stimulus.js"

export default class extends Controller {
    static targets = [ "name" ]
    greet() {
        console.log(`Hello, ${this.name}!`);
    }

    get name() {
        return this.nameTarget.value;
    }
}
