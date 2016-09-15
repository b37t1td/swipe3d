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
   toString: function toString(direction) {
      return Object.keys(DIR).filter(function (k) {
         return direction === DIR[k];
      }).join();
   }
};

exports.DIR = DIR;