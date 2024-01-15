import { Application } from "./js/stimulus.js"
import HelloController from "./controllers/hello_controller.js"
import ClipboardController from "./controllers/clipboard_controller.js"
import SlideshowController from "./controllers/slideshow_controller.js"
import ChartController from "./controllers/chart_controller.js"

window.Stimulus = Application.start()
Stimulus.register("hello", HelloController)
Stimulus.register("clipboard", ClipboardController)
Stimulus.register("slideshow", SlideshowController)
Stimulus.register("chart", ChartController)
