import {ael, rel, grc, grp} from './tools'
import {DIR} from './constants'

export default class Slide {
  constructor(element = null, options= {}) {
    if (!element) { throw new Error('Invalid arguments, at least DOM element have to be passed') }
    this.element = element
    this.threshold = options.threshold || 80
    this.callback  = options.callback  || function() {}

    this.reinit()

    let pos = grp(this.element)

    this.startX = pos.x
    this.startY = pos.y

    console.log(pos)

    this.touchStartFn = this.touchStart.bind(this)
    this.touchMoveFn = this.touchMove.bind(this)
    this.touchEndFn = this.touchEnd.bind(this)

    ael(this.element, 'mousedown', this.touchStartFn)
    ael(this.element, 'mousemove', this.touchMoveFn)
    ael(this.element, 'mouseup', this.touchEndFn)
    ael(this.element, 'mouseout', this.touchEndFn)
    ael(this.element, 'touchstart', this.touchStartFn)
    ael(this.element, 'touchmove', this.touchMoveFn)
    ael(this.element, 'touchend', this.touchEndFn)
  }

  destroy() {
    this.reinit()

    rel(this.element, 'mousedown', this.touchStartFn)
    rel(this.element, 'mousemove', this.touchMoveFn)
    rel(this.element, 'mouseup', this.touchEndFn)
    rel(this.element, 'mouseout', this.touchEndFn)
    rel(this.element, 'touchstart', this.touchStartFn)
    rel(this.element, 'touchmove', this.touchMoveFn)
    rel(this.element, 'touchend', this.touchEndFn)
  }

  reinit() {
    this.startTime = 0
    this.startX = 0
    this.startY = 0
    this.distX = 0
    this.distY = 0
    this.direction = DIR.NONE
  }

  touchStart(e) {
    this.startTime = new Date().getTime()
    e.preventDefault()
  }

  touchMove(e) {
    let time = this.startTime !== 0 ? new Date().getTime() - this.startTime : 0
    console.log(e.pageX - this.startX)
    e.preventDefault()
  }

  touchEnd() {

  }
}
