"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var DIR = {
   NONE: Symbol(),
   LEFT: Symbol(),
   RIGHT: Symbol(),
   TOP: Symbol(),
   BOTTOM: Symbol(),
   VERTICAL: Symbol(),
   HORIZONTAL: Symbol(),
   isVertical: function isVertical(dir) {
      return dir === DIR.TOP || dir === DIR.BOTTOM || dir === DIR.VERTICAL;
   },
   isHorisontal: function isHorisontal(dir) {
      return dir === DIR.LEFT || dir === DIR.RIGHT || dir === DIR.HORIZONTAL;
   },
   toString: function toString(direction) {
      return Object.keys(DIR).filter(function (k) {
         return direction === DIR[k];
      }).join();
   }
};

var ACTION = {
   INITIAL: Symbol(),
   SHRINK: Symbol(),
   toString: function toString(action) {
      return Object.keys(ACTION).filter(function (k) {
         return action === ACTION[k];
      }).join();
   }
};

exports.DIR = DIR;
exports.ACTION = ACTION;