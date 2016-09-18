function ael(e, n, h){
    if( e.addEventListener ){
        e.addEventListener(n, h, true)
    } else {
        e.attachEvent('on' + n, h)
    }
}

function rel(e, n, h) {
  if (e.removeEventListener) {
    e.removeEventListener(n, h, true)
  } else {
    e.detachEvent('on' + n, h)
  }
}

function grc(e) {
  let pos = {}, offset = {}, ref = e.target

  pos.x = !! e.touches ? e.touches[ 0 ].pageX : e.pageX
  pos.y = !! e.touches ? e.touches[ 0 ].pageY : e.pageY

  offset.left = ref.offsetLeft
  offset.top = ref.offsetTop

  while(ref) {
      offset.left += ref.offsetLeft
      offset.top += ref.offsetTop
      ref = ref.offsetParent
  }
  return {
      x : pos.x - offset.left,
      y : pos.y - offset.top
  };
}

function grp(e) {
  let  offset = {}, ref = e.offsetParent

  offset.left = 0
  offset.top = 0
  
  while(ref) {
      offset.left += ref.offsetLeft
      offset.top += ref.offsetTop
      ref = ref.offsetParent
  }
  return {
      x : offset.left,
      y : offset.top
  };
}

export { ael, rel, grc , grp}
