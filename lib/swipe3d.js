'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tools = require('./tools');

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *  @element
 *    DOM element
 *  @options
 *    threshold - int (default 120)
 *    swipeTime - int (default 300)
 *
 */

var Swipe3d = function () {
  function Swipe3d() {
    var element = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Swipe3d);

    if (!element) {
      throw new Error('Invalid arguments, at least DOM element have to be passed');
    }
    this.element = element;
    this.threshold = options.threshold || 80;
    this.swipeTime = options.swipeTime || 100;
    this.restraint = options.restraint || 100;
    this.callback = options.callback || function () {};

    this.reinit();

    var touchStart = this.touchStart.bind(this);
    var touchMove = this.touchMove.bind(this);
    var touchEnd = this.touchEnd.bind(this);

    (0, _tools.ael)(this.element, 'mousedown', touchStart);
    (0, _tools.ael)(this.element, 'mousemove', touchMove);
    (0, _tools.ael)(this.element, 'mouseup', touchEnd);
    (0, _tools.ael)(this.element, 'mouseout', touchEnd);
    (0, _tools.ael)(this.element, 'touchstart', touchStart);
    (0, _tools.ael)(this.element, 'touchmove', touchMove);
    (0, _tools.ael)(this.element, 'touchend', touchEnd);
  }

  _createClass(Swipe3d, [{
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
      var pos = (0, _tools.grc)(e);

      this.reinit();

      this.startX = pos.x;
      this.startY = pos.y;
      this.startTime = new Date().getTime();

      e.preventDefault();
    }
  }, {
    key: 'touchMove',
    value: function touchMove(e) {
      var time = this.startTime !== 0 ? new Date().getTime() - this.startTime : 0;
      var pos = (0, _tools.grc)(e);

      if (this.direction === _constants.DIR.NONE && time >= this.swipeTime) {
        this.distX = pos.x - this.startX;
        this.distY = pos.y - this.startY;

        if (Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint) {
          this.direction = this.distX < 0 ? _constants.DIR.LEFT : _constants.DIR.RIGHT;
        } else if (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint) {
          this.direction = this.distY < 0 ? _constants.DIR.TOP : _constants.DIR.BOTTOM;
        }
      } else if (this.direction !== _constants.DIR.NONE) {
        if (this.direction === _constants.DIR.LEFT || this.direction === _constants.DIR.RIGHT) {
          this.callback(e, this.direction, pos);
        } else {
          this.callback(e, this.direction, pos);
        }
        this.reinit();
      }
      e.preventDefault();
    }
  }, {
    key: 'touchEnd',
    value: function touchEnd() {
      this.reinit();
    }
  }]);

  return Swipe3d;
}();

exports.default = Swipe3d;