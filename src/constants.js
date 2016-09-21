const DIR = {
   NONE : Symbol(),
   LEFT : Symbol(),
   RIGHT : Symbol(),
   TOP : Symbol(),
   BOTTOM : Symbol(),
   isVertical : (dir) => dir === DIR.TOP || dir === DIR.BOTTOM,
   isHorisontal : (dir) => dir === DIR.LEFT || dir === DIR.RIGHT,
   toString : (direction) => Object.keys(DIR).filter((k => direction === DIR[k])).join()
}

const ACTION = {
  INITIAL : Symbol(),
  SHRINK : Symbol(),
  toString : (action) => Object.keys(ACTION).filter((k => action === ACTION[k])).join()
}

export {DIR, ACTION}
