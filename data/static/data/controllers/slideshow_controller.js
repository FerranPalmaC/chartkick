import { Controller } from "../js/stimulus.js"

export default class extends Controller {
    static targets = ["slide"]
    static values = { index: Number }

    indexValueChanged() {
        this.showCurrentSlide()
    }

    next() {
        this.indexValue++
    }

    previous() {
        this.indexValue--
    }

    showCurrentSlide() {
        this.slideTargets.forEach((element, index) => {
            element.hidden = index !== this.indexValue
        })
    }
}
