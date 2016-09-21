const DIR = {
   NONE : Symbol(),
   LEFT : Symbol(),
   RIGHT : Symbol(),
   TOP : Symbol(),
   BOTTOM : Symbol(),
   VERTICAL : Symbol(),
   HORIZONTAL : Symbol(),
   isVertical : (dir) => dir === DIR.TOP || dir === DIR.BOTTOM || dir === DIR.VERTICAL,
   isHorisontal : (dir) => dir === DIR.LEFT || dir === DIR.RIGHT || dir === DIR.HORIZONTAL,
   toString : (direction) => Object.keys(DIR).filter((k => direction === DIR[k])).join()
}

const ACTION = {
  INITIAL : Symbol(),
  SHRINK : Symbol(),
  toString : (action) => Object.keys(ACTION).filter((k => action === ACTION[k])).join()
}

export {DIR, ACTION}
