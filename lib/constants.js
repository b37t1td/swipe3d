"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var DIR = {
   NONE: 1, //Symbol(),
   LEFT: 2, //Symbol(),
   RIGHT: 3, //Symbol(),
   TOP: 4, //Symbol(),
   BOTTOM: 5, //Symbol(),
   VERTICAL: 6, //Symbol(),
   HORIZONTAL: 7, //Symbol(),
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
   INITIAL: 8, //Symbol(),
   SHRINK: 9, //Symbol(),
   toString: function toString(action) {
      return Object.keys(ACTION).filter(function (k) {
         return action === ACTION[k];
      }).join();
   }
};

exports.DIR = DIR;
exports.ACTION = ACTION;