'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ael(e, n, h) {
  if (e.addEventListener) {
    e.addEventListener(n, h, true);
  } else {
    e.attachEvent('on' + n, h);
  }
}

function rel(e, n, h) {
  if (e.removeEventListener) {
    e.removeEventListener(n, h, true);
  } else {
    e.detachEvent('on' + n, h);
  }
}

function isParent(src, parent) {
  var ref = src;

  while (ref) {
    if (ref === parent) {
      return true;
    } else {
      ref = ref.parentNode;
    }
  }
  return false;
}

function grc(e) {
  var pos = {},
      offset = {},
      ref = e.target;

  pos.x = !!e.touches ? e.touches[0].pageX : e.pageX;
  pos.y = !!e.touches ? e.touches[0].pageY : e.pageY;

  offset.left = ref.offsetLeft;
  offset.top = ref.offsetTop;

  while (ref) {
    offset.left += ref.offsetLeft;
    offset.top += ref.offsetTop;
    ref = ref.offsetParent;
  }
  return {
    x: pos.x - offset.left,
    y: pos.y - offset.top
  };
}

function ev(e) {
  var x = !!e.touches ? e.changedTouches ? e.changedTouches[0].pageX : e.touches[0].pageX : e.pageX;
  var y = !!e.touches ? e.changedTouches ? e.changedTouches[0].pageY : e.touches[0].pageY : e.pageY;
  return { x: x, y: y };
}

function grp(e) {
  var offset = {},
      ref = e.offsetParent;

  offset.left = 0;
  offset.top = 0;

  while (ref) {
    offset.left += ref.offsetLeft;
    offset.top += ref.offsetTop;
    ref = ref.offsetParent;
  }
  return {
    x: offset.left,
    y: offset.top
  };
}

exports.ael = ael;
exports.rel = rel;
exports.grc = grc;
exports.grp = grp;
exports.ev = ev;
exports.isParent = isParent;