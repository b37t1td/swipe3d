import {ael, rel, grc} from './tools'
import {DIR} from './constants'

export default class Swipe {
  constructor(element = null, options= {}) {
    if (!element) { throw new Error('Invalid arguments, at least DOM element have to be passed') }
    this.element = element
    this.threshold = options.threshold || 80
    this.swipeTime = options.swipeTime || 100
    this.restraint = options.restraint || 100
    this.callback  = options.callback  || function() {}

    this.reinit()

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
    let pos = grc(e)

    this.reinit()

    this.startX = pos.x
    this.startY = pos.y
    this.startTime = new Date().getTime()

    e.preventDefault()
  }

  touchMove(e) {
    let time = this.startTime !== 0 ? new Date().getTime() - this.startTime : 0
    let pos = grc(e)

    if (this.direction === DIR.NONE && time >= this.swipeTime) {
      this.distX = pos.x - this.startX
      this.distY = pos.y - this.startY

      if (Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint) {
        this.direction = this.distX < 0 ? DIR.LEFT : DIR.RIGHT
      }
      else
      if (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint) {
        this.direction = this.distY < 0 ? DIR.TOP : DIR.BOTTOM
      }
    } else if (this.direction !== DIR.NONE){
      if (this.direction === DIR.LEFT || this.direction === DIR.RIGHT) {
        this.callback(e, this.direction, pos)
      } else {
        this.callback(e, this.direction, pos)
      }
      this.reinit()
    }
    e.preventDefault()
  }

  touchEnd() {
    this.reinit()
  }
}
