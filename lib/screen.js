'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tools = require('./tools');

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Screen);

    if (!element) {
      throw new Error('Invalid arguments, at least DOM element have to be passed');
    }
    this.element = element;
    this.threshold = options.threshold || 150;
    this.restraint = options.restraint || 300;
    this.callback = options.callback || function () {};
    this.direction = options.direction || _constants.DIR.HORIZONTAL;
    this.mouse = options.mouse || true;
    this.mouseDelta = options.mouseDelta || 0;

    this.reinit();
    this.resize();

    this.currentScreen = null;

    this.touchStartFn = this.touchStart.bind(this);
    this.touchMoveFn = this.touchMove.bind(this);
    this.touchEndFn = this.touchEnd.bind(this);
    this.mouseWheel = this.mouseWheel.bind(this);

    (0, _tools.ael)(window, 'mousedown', this.touchStartFn);
    (0, _tools.ael)(window, 'mousemove', this.touchMoveFn);
    (0, _tools.ael)(window, 'mouseup', this.touchEndFn);
    //ael(this.element, 'mouseout', this.touchEndFn)
    (0, _tools.ael)(window, 'touchstart', this.touchStartFn);
    (0, _tools.ael)(window, 'touchmove', this.touchMoveFn);
    (0, _tools.ael)(window, 'touchend', this.touchEndFn);

    if (this.mouse === true) {
      (0, _tools.ael)(window, 'wheel', this.mouseWheel);
    }
  }

  _createClass(Screen, [{
    key: 'resize',
    value: function resize() {
      if (this.direction === _constants.DIR.VERTICAL) {
        if (isNaN(parseInt(this.element.style.top)) || parseInt(this.element.style.top) === 0) {
          this.element.style.top = this.element.offsetTop + 'px';
        }
        this.elementInitial = parseInt(this.element.style.top);
        this.elementLen = [].slice.call(this.element.children).reduce(function (p, c) {
          return p + c.offsetHeight;
        }, 0);
      } else {
        if (isNaN(parseInt(this.element.style.left)) || parseInt(this.element.style.left) === 0) {
          this.element.style.left = this.element.offsetLeft + 'px';
        }
        this.elementInitial = parseInt(this.element.style.left);
        this.elementLen = [].slice.call(this.element.children).reduce(function (p, c) {
          return p + c.offsetWidth;
        }, 0);
      }

      this.elementWidth = this.element.offsetWidth;
      this.elementStop = (this.elementLen - this.elementWidth) * -1;
      this.mouseDelta = this.elementWidth / 2 + 1;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.reinit();

      (0, _tools.rel)(window, 'mousedown', this.touchStartFn);
      (0, _tools.rel)(window, 'mousemove', this.touchMoveFn);
      (0, _tools.rel)(window, 'mouseup', this.touchEndFn);
      //rel(this.element, 'mouseout', this.touchEndFn)
      (0, _tools.rel)(window, 'touchstart', this.touchStartFn);
      (0, _tools.rel)(window, 'touchmove', this.touchMoveFn);
      (0, _tools.rel)(window, 'touchend', this.touchEndFn);

      if (this.mouse === true) {
        (0, _tools.rel)(window, 'wheel', this.mouseWheel);
      }
    }
  }, {
    key: 'reinit',
    value: function reinit() {
      this.start = false;
      this.starPos = 0;
      this.startTime = null;
    }
  }, {
    key: 'mouseWheel',
    value: function mouseWheel(e) {

      if (new Date().getTime() - this.startTime >= this.restraint) {

        this.startTime = new Date().getTime();
        if (this.direction === _constants.DIR.VERTICAL) {
          this.initial = parseInt(this.element.style.top);
        } else {
          this.initial = parseInt(this.element.style.left);
        }

        var delta = e.deltaY < 0 ? this.mouseDelta + this.initial : this.initial - this.mouseDelta;

        this.startPos = this.initial;

        this.moveElementTo(delta, true);
      }

      e.preventDefault();
    }
  }, {
    key: 'touchStart',
    value: function touchStart(e) {
      if ((0, _tools.isParent)(e.target, this.element)) {
        this.start = true;
        this.startTime = new Date().getTime();

        if (this.direction === _constants.DIR.VERTICAL) {
          this.startPos = (0, _tools.ev)(e).y;
          this.initial = parseInt(this.element.style.top);
        } else {
          this.startPos = (0, _tools.ev)(e).x;
          this.initial = parseInt(this.element.style.left);
        }
      }
      e.preventDefault();
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      if (this.start === true) {
        var cur = this.direction === _constants.DIR.VERTICAL ? (0, _tools.ev)(e).y : (0, _tools.ev)(e).x;
        this.moveElementTo(cur);
      }
      e.preventDefault();
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd(e) {
      if (this.start === true) {
        var cur = this.direction === _constants.DIR.VERTICAL ? (0, _tools.ev)(e).y : (0, _tools.ev)(e).x;
        this.moveElementTo(cur, true);
        this.reinit();
      }
    }
  }, {
    key: 'setDuration',
    value: function setDuration(duration) {
      var easing = arguments.length <= 1 || arguments[1] === undefined ? 'ease' : arguments[1];

      var direction = this.direction === _constants.DIR.HORIZONTAL ? 'left' : 'top';
      this.element.style.transition = direction + ' ' + duration + ' ' + easing;
    }
  }, {
    key: 'moveElementTo',
    value: function moveElementTo(cur) {
      var _this = this;

      var isEnd = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var til = cur - this.startPos;
      var offset = this.initial + til;

      if (isEnd === true) {
        offset = Math.round(offset / this.elementWidth) * this.elementWidth;
      }

      if (isEnd === true && offset > this.elementInitial) {
        offset = this.elementInitial;
      } else if (isEnd === true && offset < this.elementStop) {
        offset = this.elementStop;
      }

      if (isEnd === true) {
        if (this.currentScreen !== Math.round(offset / this.elementWidth)) {
          this.currentScreen = Math.round(offset / this.elementWidth);
          this.callback(Math.abs(this.currentScreen));
        }

        this.setDuration('.3s', 'ease-out');
        setTimeout(function () {
          _this.setDuration('.0s');
        }, 300);
      }

      if (this.direction === _constants.DIR.VERTICAL) {
        this.element.style.top = offset + 'px';
      } else {
        this.element.style.left = offset + 'px';
      }
    }
  }]);

  return Screen;
}();

exports.default = Screen;