import {ael, rel,  ev, isParent} from './tools'
import {DIR, ACTION} from './constants'

export default class Slide {
  constructor(element = null, options= {}) {
    if (!element) { throw new Error('Invalid arguments, at least DOM element have to be passed') }
    this.element = element
    this.threshold = options.threshold || 150
    this.restraint = options.restraint || 100
    this.callback  = options.callback  || function() {}
    this.direction = options.direction || DIR.BOTTOM
    this.shrink    = options.shrink || 0

    this.reinit()
    this.state = ACTION.INITIAL

    this.distX = 0
    this.distY = 0

    if (DIR.isVertical(this.direction)) {
      if (isNaN(parseInt(this.element.style.top)) || parseInt(this.element.style.top) === 0 ) {
        this.element.style.top = this.element.offsetTop + 'px'
      }
      this.elementInitial = parseInt(this.element.style.top)
    } else {
      if (isNaN(parseInt(this.element.style.left)) || parseInt(this.element.style.left) === 0 ) {
        this.element.style.left = this.element.offsetLeft + 'px'
      }
      this.elementInitial = parseInt(this.element.style.left)
    }

    this.setDuration('.1s')
    this.touchStartFn = this.touchStart.bind(this)
    this.touchMoveFn = this.touchMove.bind(this)
    this.touchEndFn = this.touchEnd.bind(this)

    ael(window, 'mousedown', this.touchStartFn)
    ael(window, 'mousemove', this.touchMoveFn)
    ael(window, 'mouseup', this.touchEndFn)
    //ael(this.element, 'mouseout', this.touchEndFn)
    ael(window, 'touchstart', this.touchStartFn)
    ael(window, 'touchmove', this.touchMoveFn)
    ael(window, 'touchend', this.touchEndFn)
  }


  setDuration(duration, easing = 'ease') {
    const direction = DIR.isHorisontal(this.direction) ? 'left' : 'top'
    this.element.style.transition = `${direction} ${duration} ${easing}`
  }
  destroy() {
    this.reinit()

    rel(window, 'mousedown', this.touchStartFn)
    rel(window, 'mousemove', this.touchMoveFn)
    rel(window, 'mouseup', this.touchEndFn)
    //rel(this.element, 'mouseout', this.touchEndFn)
    rel(window, 'touchstart', this.touchStartFn)
    rel(window, 'touchmove', this.touchMoveFn)
    rel(window, 'touchend', this.touchEndFn)
  }

  reinit() {
    this.start = false
    this.starPos = 0
    this.startTime = new Date().getTime()
  }

  touchStart(e) {
    if (isParent(e.target, this.element)) {
      this.start = true
      this.startTime = new Date().getTime()

      if (DIR.isVertical(this.direction)) {
        this.startPos = ev(e).y
        this.initial = parseInt(this.element.style.top)
      } else {
        this.startPos = ev(e).x
        this.initial = parseInt(this.element.style.left)
      }
    }
    e.preventDefault()
  }

  touchMove(e) {
    if (this.start === true) {
      this.moveElement(e)
    }

    e.preventDefault()
  }

  touchEnd(e) {
    if (this.start === true) {
      if (new Date().getTime() - this.startTime > this.restraint) {
       this.moveElement(e, true)
      }
      this.reinit()
    }
  }

  elementTo(offset, isEnd = false) {
    if (DIR.isVertical(this.direction)) {
      this.element.style.top = offset + 'px'
    } else {
      this.element.style.left = offset + 'px'
    }

    if (isEnd === true) {
      if (offset === this.elementInitial && this.state !== ACTION.INITIAL) {
        this.state = ACTION.INITIAL
        this.callback(this.state)
      }

      if (offset === this.shrink && this.state !== ACTION.SHRINK) {
        this.state = ACTION.SHRINK
        this.callback(this.state)
      }
    }
  }

  moveElement(e, isEnd = false) {
    const cur = DIR.isVertical(this.direction)? ev(e).y: ev(e).x
    const til = cur - this.startPos
    let offset = this.initial + til
    let skipmove = false

    if (
      (offset < this.elementInitial &&
          (this.direction === DIR.BOTTOM || this.direction === DIR.LEFT)) ||
      (offset > this.elementInitial &&
         (this.direction === DIR.TOP || this.direction === DIR.RIGHT))
    ) {
        offset = this.elementInitial
        skipmove = true
    }

    if (
      (offset > this.shrink &&
         (this.direction === DIR.BOTTOM || this.direction === DIR.LEFT)) ||
      (offset < this.shrink &&
        (this.direction === DIR.TOP || this.direction === DIR.RIGHT))
    ) {
      offset = this.shrink
      skipmove = true
    }



    if ((Math.abs(til) >= this.threshold || isEnd === true) && skipmove === false) {
      if ( (
        (cur < this.startPos && (this.direction === DIR.BOTTOM || this.direction === DIR.LEFT)) ||
        (cur > this.startPos && (this.direction === DIR.TOP || this.direction === DIR.RIGHT))
        ) && isEnd === true)
       {
         if (Math.abs(til) >= this.threshold) {
           this.elementTo(this.elementInitial, isEnd)
         } else {
           this.elementTo(this.shrink, isEnd)
         }
      } else if (isEnd === true) {
        if (Math.abs(til) <= this.threshold) {
          this.elementTo(this.elementInitial, isEnd)
        } else {
          this.elementTo(this.shrink, isEnd)
        }
      } else {
        this.elementTo(offset, isEnd)
      }
    } else {
        this.elementTo(offset, isEnd)
    }
  }
}
