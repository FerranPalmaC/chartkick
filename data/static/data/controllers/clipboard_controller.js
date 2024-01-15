import { Controller } from "../js/stimulus.js"

export default class extends Controller {
    static targets = ["source"]
    static classes = ["supported"]

    connect() {
        if ("clipboard" in navigator) {
            this.element.classList.add(this.supportedClass);
        }
    }

    copy() {
        navigator.clipboard.writeText(this.sourceTarget.value);
    }
}
