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

export {DIR}
