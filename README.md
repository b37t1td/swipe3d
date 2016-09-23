### Swipe/Slide/Scroll events library

The purpose of the swipe3d is provide an advanced events handling. [Samples source code](https://github.com/c0ncept/swipe3d-samples).

### Swipe3d provides following components:
  * Swipable [Screen Component](#screen)
  * [Swipe events](#swipe) handling
  * Swipable [Slide Component](#slide)
  * Swipable [ScrollComponent](#scroll)

### Installation

```
npm install swipe3d
```

### Screen demo <a name="screen"></a>

Live [demo](http://codepen.io/linuxenko/pen/KgWKmp)

[![](https://raw.githubusercontent.com/linuxenko/swipe3d/master/showcase/screen.gif)](http://codepen.io/linuxenko/pen/KgWKmp)

#### Usage
```
import {Screen, DIR} from 'swipe3d'

let mainScreen = new Screen(DOMElement, options)
```

**options :**

* threshold `int` default `120`
* restraint `int` default `300`
* direction `DIR` default `DIR.HORIZONTAL`
* mouse     `bool` default `true`
* mouseDelta `int` default `0`
* callback  `function`  run callback with number of screen as `argument`


### Slide demo <a name="slide"></a>

Live [demo](http://codepen.io/linuxenko/pen/BLWaKr)

[![](https://raw.githubusercontent.com/linuxenko/swipe3d/master/showcase/slide.gif)](http://codepen.io/linuxenko/pen/BLWaKr)

#### Usage
```
import {Slide, DIR, ACTION} from 'swipe3d'

let notificationArea = new Slide(DOMElement, options)
```

**options :**

* threshold `int` default `150`
* restraint `int` default `100`
* direction `DIR` default `DIR.BOTTOM`
* callback  `function`  run callback with `ACTION` as `argument`

### Scroll demo <a name="scroll"></a>

Live [demo](http://codepen.io/linuxenko/pen/qaABRV)

[![](https://raw.githubusercontent.com/linuxenko/swipe3d/master/showcase/scroll.gif)](http://codepen.io/linuxenko/pen/qaABRV)

#### Usage
```
import {Screen, DIR} from 'swipe3d'

let mainScreen = new Screen(DOMElement, options)
```

**options :**

* threshold `int` default `150`
* restraint `int` default `300`
* direction `DIR` default `DIR.HORIZONTAL`
* mouse     `bool` default `true`
* mouseDelta `int` default `50`

### Swipe <a name="swipe"></a>

#### Usage
```
import {Swipe, DIR} from 'swipe3d'

let swipable = new Swipe(DOMElement, options)
```

**options :**

* threshold `int` default `80`
* restraint `int` default `100`
* swipeTime `int` default `100`
* callback  `function`  run callback with `DIR` direction as `argument`

### License

MIT
(c) 2016 Svetlana Linuxenko
