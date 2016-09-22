const DIR = {
   NONE : 1, //Symbol(),
   LEFT : 2, //Symbol(),
   RIGHT : 3, //Symbol(),
   TOP : 4, //Symbol(),
   BOTTOM : 5, //Symbol(),
   VERTICAL : 6, //Symbol(),
   HORIZONTAL : 7, //Symbol(),
   isVertical : (dir) => dir === DIR.TOP || dir === DIR.BOTTOM || dir === DIR.VERTICAL,
   isHorisontal : (dir) => dir === DIR.LEFT || dir === DIR.RIGHT || dir === DIR.HORIZONTAL,
   toString : (direction) => Object.keys(DIR).filter((k => direction === DIR[k])).join()
}

const ACTION = {
  INITIAL : 8, //Symbol(),
  SHRINK : 9, //Symbol(),
  toString : (action) => Object.keys(ACTION).filter((k => action === ACTION[k])).join()
}

export {DIR, ACTION}
