const DIR = {
   NONE : Symbol(),
   LEFT : Symbol(),
   RIGHT : Symbol(),
   TOP : Symbol(),
   BOTTOM : Symbol(),
   toString : (direction) => Object.keys(DIR).filter((k => direction === DIR[k])).join()
}

export {DIR}
