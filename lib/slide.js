'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tools = require('./tools');

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Slide = function () {
  function Slide() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Slide);

    if (!element) {
      throw new Error('Invalid arguments, at least DOM element have to be passed');
    }
    this.element = element;
    this.threshold = options.threshold || 80;
    this.callback = options.callback || function () {};

    this.reinit();

    var pos = (0, _tools.grp)(this.element);

    this.startX = pos.x;
    this.startY = pos.y;

    console.log(pos);

    this.touchStartFn = this.touchStart.bind(this);
    this.touchMoveFn = this.touchMove.bind(this);
    this.touchEndFn = this.touchEnd.bind(this);

    (0, _tools.ael)(this.element, 'mousedown', this.touchStartFn);
    (0, _tools.ael)(this.element, 'mousemove', this.touchMoveFn);
    (0, _tools.ael)(this.element, 'mouseup', this.touchEndFn);
    (0, _tools.ael)(this.element, 'mouseout', this.touchEndFn);
    (0, _tools.ael)(this.element, 'touchstart', this.touchStartFn);
    (0, _tools.ael)(this.element, 'touchmove', this.touchMoveFn);
    (0, _tools.ael)(this.element, 'touchend', this.touchEndFn);
  }

  _createClass(Slide, [{
    key: 'destroy',
    value: function destroy() {
      this.reinit();

      (0, _tools.rel)(this.element, 'mousedown', this.touchStartFn);
      (0, _tools.rel)(this.element, 'mousemove', this.touchMoveFn);
      (0, _tools.rel)(this.element, 'mouseup', this.touchEndFn);
      (0, _tools.rel)(this.element, 'mouseout', this.touchEndFn);
      (0, _tools.rel)(this.element, 'touchstart', this.touchStartFn);
      (0, _tools.rel)(this.element, 'touchmove', this.touchMoveFn);
      (0, _tools.rel)(this.element, 'touchend', this.touchEndFn);
    }
  }, {
    key: 'reinit',
    value: function reinit() {
      this.startTime = 0;
      this.startX = 0;
      this.startY = 0;
      this.distX = 0;
      this.distY = 0;
      this.direction = _constants.DIR.NONE;
    }
  }, {
    key: 'touchStart',
    value: function touchStart(e) {
      this.startTime = new Date().getTime();
      e.preventDefault();
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      var time = this.startTime !== 0 ? new Date().getTime() - this.startTime : 0;
      console.log(e.pageX - this.startX);
      e.preventDefault();
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd() {}
  }]);

  return Slide;
}();

exports.default = Slide;