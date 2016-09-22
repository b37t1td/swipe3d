
import {ael, rel, grp, ev, isParent} from './tools'
import {DIR, ACTION} from './constants'

export default class Screen {
  constructor(element = null, options= {}) {
    if (!element) { throw new Error('Invalid arguments, at least DOM element have to be passed') }
    this.element = element
    this.threshold = options.threshold || 120
    this.restraint = options.restraint || 300
    this.callback  = options.callback  || function() {}
    this.direction = options.direction || DIR.HORIZONTAL
    this.mouse = options.mouse || true
    this.mouseDelta = options.mouseDelta || 0

    this.reinit()
    this.resize()

    this.currentScreen = 0

    this.touchStartFn = this.touchStart.bind(this)
    this.touchMoveFn = this.touchMove.bind(this)
    this.touchEndFn = this.touchEnd.bind(this)
    this.mouseWheel = this.mouseWheel.bind(this)

    ael(window, 'mousedown', this.touchStartFn)
    ael(window, 'mousemove', this.touchMoveFn)
    ael(window, 'mouseup', this.touchEndFn)
    //ael(this.element, 'mouseout', this.touchEndFn)
    ael(window, 'touchstart', this.touchStartFn)
    ael(window, 'touchmove', this.touchMoveFn)
    ael(window, 'touchend', this.touchEndFn)

    if (this.mouse === true) {
      ael(window, 'wheel', this.mouseWheel)
    }
  }

  resize() {
    if (this.direction === DIR.VERTICAL) {
      if (isNaN(parseInt(this.element.style.top)) || parseInt(this.element.style.top) === 0 ) {
        this.element.style.top = this.element.offsetTop + 'px'
      }
      this.elementInitial = parseInt(this.element.style.top)
      this.elementLen = [].slice.call(this.element.children)
        .reduce((p,c) => p + c.offsetHeight , 0)
    } else {
      if (isNaN(parseInt(this.element.style.left)) || parseInt(this.element.style.left) === 0 ) {
        this.element.style.left = this.element.offsetLeft + 'px'
      }
      this.elementInitial = parseInt(this.element.style.left)
      this.elementLen = [].slice.call(this.element.children)
        .reduce((p,c) => p + c.offsetWidth , 0)
    }

    this.elementWidth = this.element.parentNode.offsetWidth
    this.elementStop = (this.elementLen - this.elementWidth) * -1
    this.mouseDelta = this.elementWidth / 2  + 1
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

    if (this.mouse === true) {
      rel(window, 'wheel', this.mouseWheel)
    }
  }

  reinit() {
    this.start = false
    this.starPos = 0
    this.startTime = null
  }

  mouseWheel(e) {

    if (new Date().getTime() - this.startTime >= this.restraint) {

      this.startTime = new Date().getTime()
      if (this.direction === DIR.VERTICAL) {
        this.initial = parseInt(this.element.style.top)
      } else {
        this.initial = parseInt(this.element.style.left)
      }

      let delta = e.deltaY < 0 ?
       (this.mouseDelta + this.initial) : (this.initial - this.mouseDelta)

      this.startPos = this.initial

      this.moveElementTo(delta, true)
    }

    e.preventDefault()
  }

  touchStart(e) {
    if (isParent(e.target, this.element)) {
      this.start = true
      this.startTime = new Date().getTime()

      if (this.direction === DIR.VERTICAL) {
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
      const cur = this.direction === DIR.VERTICAL ? ev(e).y: ev(e).x
      this.moveElementTo(cur)
    }
    e.preventDefault()
  }

  touchEnd(e) {
    if (this.start === true) {
      const cur = this.direction === DIR.VERTICAL ? ev(e).y: ev(e).x
      this.moveElementTo(cur, true)
      this.reinit()
    }
  }

  setDuration(duration, easing = 'ease') {
    const direction = this.direction === DIR.HORIZONTAL ? 'left' : 'top'
    this.element.style.transition = `${direction} ${duration} ${easing}`
  }

  moveElementTo(cur, isEnd = false) {
    const til = cur - this.startPos
    let offset = this.initial + til

    if (isEnd === true) {
      if (Math.abs(til) >= this.threshold) {
        console.log(this.elementWidth)
        offset = (til < 0 ? (this.currentScreen - 1) : this.currentScreen + 1) * this.elementWidth
      } else {
        offset =  Math.round(offset / this.elementWidth) * this.elementWidth
      }
    }

    if (isEnd === true && offset > this.elementInitial) {
      offset = this.elementInitial
    } else  if (isEnd === true && offset < this.elementStop) {
      offset = this.elementStop
    }

    if (isEnd === true) {
      if (this.currentScreen !== Math.round(offset / this.elementWidth)) {
        this.currentScreen = Math.round(offset / this.elementWidth)
        this.callback(Math.abs(this.currentScreen))
      }

      this.setDuration('.3s', 'ease-out')
      setTimeout(() => {
        this.setDuration('.0s')
      }, 300)
    }

    if (this.direction === DIR.VERTICAL) {
      this.element.style.top = offset + 'px'
    } else {
      this.element.style.left = offset + 'px'
    }
  }
}
