/**
 * @jest-environment jsdom
 */

import Vue from 'vue/dist/vue'
import FontAwesomeIcon from '../FontAwesomeIcon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import { faCoffee, faCircle, faSpartan, faGlasses } from '../__fixtures__/icons'
import { coreHasFeature, compileAndMount, mountFromProps, REFERENCE_ICON_BY_STYLE, ICON_ALIASES, REFERENCE_ICON_USING_STRING, REFERENCE_ICON_USING_FAMILY } from '../__fixtures__/helpers'

beforeEach(() => {
  library.add(faCoffee, faCircle, faSpartan, faGlasses)
  Vue.component('font-awesome-icon', FontAwesomeIcon)
})

afterEach(() => {
  library.reset()
})

describe('using a family', () => {
  if (coreHasFeature(REFERENCE_ICON_USING_FAMILY)) {
    test('will find a sharp-solid-svg-icon with array format', () => {
      const vm = mountFromProps({ icon: ['fass', 'glasses'] })

      expect(vm.$el.tagName).toBe('svg')
      expect(vm.$el.classList.contains('fa-glasses')).toBeTruthy()
    })

    test('will find a sharp solid icon using short prefix with string format', () => {
      const vm = mountFromProps({ icon: 'fass fa-glasses' })

      expect(vm.$el.tagName).toBe('svg')
      expect(vm.$el.classList.contains('fa-glasses')).toBeTruthy()
    })

    test('will find a sharp solid icon using long prefix with string format', () => {
      const vm = mountFromProps({ icon: 'fa-sharp fa-glasses' })

      expect(vm.$el.tagName).toBe('svg')
      expect(vm.$el.classList.contains('fa-glasses')).toBeTruthy()
    })

    test('will find a sharp solid icon using long prefix and style with string format', () => {
      const vm = mountFromProps({ icon: 'fa-sharp fa-solid fa-glasses' })

        expect(vm.$el.tagName).toBe('svg')
        expect(vm.$el.classList.contains('fa-glasses')).toBeTruthy()
    })
  }
})

test('using a FAT icon with array format', () => {
  const vm = mountFromProps({ icon: ['fat', 'spartan'] })

  expect(vm.$el.tagName).toBe('svg')
  expect(vm.$el.classList.contains('fa-spartan')).toBeTruthy()
})

if(coreHasFeature(ICON_ALIASES)) {
  test('find a free-solid-svg-icon with array format', () => {
    library.reset()
    library.add(faClose)
    const vm = mountFromProps({ icon: ['fas', 'xmark'] })

    expect(vm.$el.tagName).toBe('svg')
    expect(vm.$el.classList.contains('fa-xmark')).toBeTruthy()
  })

  test('find a free-solid-svg-icon that is an alias', () => {
    library.reset()
    library.add(faClose)
    const vm = mountFromProps({ icon: ['fas', 'close'] })

    expect(vm.$el.tagName).toBe('svg')
    expect(vm.$el.classList.contains('fa-xmark')).toBeTruthy()
  })
}

if(coreHasFeature(REFERENCE_ICON_USING_STRING)) {
  test('find an icon using string format', () => {
    const vm = mountFromProps({ icon: 'fa-coffee' })

    expect(vm.$el.tagName).toBe('svg')
    expect(vm.$el.classList.contains('fa-coffee')).toBeTruthy()
  })

  test('find an icon using string format with style', () => {
    const vm = mountFromProps({ icon: 'fa-solid fa-coffee' })

    expect(vm.$el.tagName).toBe('svg')
    expect(vm.$el.classList.contains('fa-coffee')).toBeTruthy()
  })
}

if (coreHasFeature(REFERENCE_ICON_BY_STYLE)) {
  test('find a THIN icon with array format', () => {
    const vm = mountFromProps({ icon: ['thin', 'spartan'] })

    expect(vm.$el.tagName).toBe('svg')
    expect(vm.$el.classList.contains('fa-spartan')).toBeTruthy()
  })

  test('find a FA-THIN icon with array format', () => {
    const vm = mountFromProps({ icon: ['fa-thin', 'spartan'] })

    expect(vm.$el.tagName).toBe('svg')
    expect(vm.$el.classList.contains('fa-spartan')).toBeTruthy()
  })
}

test('using array format', () => {
  const vm = mountFromProps({ icon: ['fas', 'coffee'] })

  expect(vm.$el.tagName).toBe('svg')
  expect(vm.$el.classList.contains('fa-coffee')).toBeTruthy()
})

test('using string format', () => {
  const vm = mountFromProps({ icon: 'coffee' })

  expect(vm.$el.tagName).toBe('svg')
  expect(vm.$el.classList.contains('fa-coffee')).toBeTruthy()
})

test('using imported object from svg icons package', () => {
  const vm = mountFromProps({ icon: faUser })

  expect(vm.$el.tagName).toBe('svg')
})

test('missing icon', () => {
  const vm = mountFromProps({ icon: ['fas', 'noicon'] })

  expect(vm.$el.tagName).toBeFalsy()
})

test('using iconDefinition', () => {
  const vm = mountFromProps({ icon: faCoffee })

  expect(vm.$el.tagName).toBe('svg')
  expect(vm.$el.classList.contains('fa-coffee')).toBeTruthy()
})

describe('unrelated Vue data options', () => {
  test('with extra static class', () => {
    const vm = compileAndMount(
      `<font-awesome-icon class="extra" :icon="icon" />`,
      { data: { icon: faCoffee } }
    )

    expect(vm.$el.classList.contains('extra')).toBeTruthy()
  })

  test('with extra bound class', () => {
    const vm = compileAndMount(
      `<font-awesome-icon :class="['extra1', {'extra2': true}]" :icon="icon" />`,
      { data: { icon: faCoffee } }
    )

    expect(vm.$el.classList.contains('extra1')).toBeTruthy()
    expect(vm.$el.classList.contains('extra2')).toBeTruthy()
  })

  test('with extra style', () => {
    const vm = compileAndMount(
      `<font-awesome-icon :style="{'font-size': '42px'}" :icon="icon" />`,
      { data: { icon: faCoffee } }
    )

    expect(vm.$el.style.getPropertyValue('font-size')).toBe('42px')
  })

  test('with extra DOM property', () => {
    const vm = compileAndMount(
      `<font-awesome-icon rel="local" :icon="icon" />`,
      { data: { icon: faCoffee } }
    )

    expect(vm.$el.getAttribute('rel')).toBe('local')
  })

  test('with listener', () => {
    let hasBeenClicked = false

    const vm = compileAndMount(
      `<font-awesome-icon @click="clicked" :icon="icon" />`,
      { data: { icon: faCoffee }, methods: { clicked () { hasBeenClicked = true } } }
    )

    expect(hasBeenClicked).toBeFalsy()
    vm.$el.dispatchEvent(new Event('click'))
    expect(hasBeenClicked).toBeTruthy()
  })
})

test('using border', () => {
  const vm = mountFromProps({ icon: faCoffee, border: true })

  expect(vm.$el.classList.contains('fa-border')).toBeTruthy()
})

test('using fixedWidth', () => {
  const vm = mountFromProps({ icon: faCoffee, fixedWidth: true })

  expect(vm.$el.classList.contains('fa-fw')).toBeTruthy()
})

describe('using flip', () => {
  test('flip', () => {
    const vm = mountFromProps({ icon: faCoffee, flip: true })

    expect(vm.$el.classList.contains('fa-flip')).toBeTruthy()
    expect(vm.$el.classList.contains('fa-flip-vertical')).toBeFalsy()
    expect(vm.$el.classList.contains('fa-flip-horizontal')).toBeFalsy()
    expect(vm.$el.classList.contains('fa-flip-both')).toBeFalsy()
  })

  test('horizontal', () => {
    const vm = mountFromProps({ icon: faCoffee, flip: "horizontal" })

    expect(vm.$el.classList.contains('fa-flip-horizontal')).toBeTruthy()
    expect(vm.$el.classList.contains('fa-flip-vertical')).toBeFalsy()
    expect(vm.$el.classList.contains('fa-flip-both')).toBeFalsy()
    expect(vm.$el.classList.contains('fa-flip')).toBeFalsy()
  })

  test('vertical', () => {
    const vm = mountFromProps({ icon: faCoffee, flip: "vertical" })

    expect(vm.$el.classList.contains('fa-flip-vertical')).toBeTruthy()
    expect(vm.$el.classList.contains('fa-flip-horizontal')).toBeFalsy()
    expect(vm.$el.classList.contains('fa-flip-both')).toBeFalsy()
    expect(vm.$el.classList.contains('fa-flip')).toBeFalsy()
  })

  test('both', () => {
    const vm = mountFromProps({ icon: faCoffee, flip: "both" })

    expect(vm.$el.classList.contains('fa-flip-horizontal')).toBeTruthy()
    expect(vm.$el.classList.contains('fa-flip-vertical')).toBeTruthy()
    expect(vm.$el.classList.contains('fa-flip')).toBeFalsy()
  })
})

test('using listItem', () => {
  const vm = mountFromProps({ icon: faCoffee, listItem: true })

  expect(vm.$el.classList.contains('fa-li')).toBeTruthy()
})

describe('using pull', () => {
  test('right', () => {
    const vm = mountFromProps({ icon: faCoffee, pull: "right" })

    expect(vm.$el.classList.contains('fa-pull-right')).toBeTruthy()
  })

  test('left', () => {
    const vm = mountFromProps({ icon: faCoffee, pull: "left" })

    expect(vm.$el.classList.contains('fa-pull-left')).toBeTruthy()
  })
})

test('using pulse', () => {
  const vm = mountFromProps({ icon: faCoffee, pulse: true })

  expect(vm.$el.classList.contains('fa-pulse')).toBeTruthy()
})

describe('using rotation', () => {
  test('90', () => {
    const vm = mountFromProps({ icon: faCoffee, rotation: 90 })

    expect(vm.$el.classList.contains('fa-rotate-90')).toBeTruthy()
  })

  test('180', () => {
    const vm = mountFromProps({ icon: faCoffee, rotation: 180 })

    expect(vm.$el.classList.contains('fa-rotate-180')).toBeTruthy()
  })

  test('270', () => {
    const vm = mountFromProps({ icon: faCoffee, rotation: 270 })

    expect(vm.$el.classList.contains('fa-rotate-270')).toBeTruthy()
  })

  test('as a string', () => {
    const vm = mountFromProps({ icon: faCoffee, rotation: '90' })

    expect(vm.$el.classList.contains('fa-rotate-90')).toBeTruthy()
  })
})

test('swap opacity', () => {
  const vm = mountFromProps({ icon: faCoffee, swapOpacity: true })

  expect(vm.$el.classList.contains('fa-swap-opacity')).toBeTruthy()
})

test('using size', () => {
  ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].forEach(size => {
    const vm = mountFromProps({ icon: faCoffee, size: size })

    expect(vm.$el.classList.contains(`fa-${size}`)).toBeTruthy()
  })
})

test('using spin', () => {
  const vm = mountFromProps({ icon: faCoffee, spin: true })

  expect(vm.$el.classList.contains('fa-spin')).toBeTruthy()
})

test('using spinPulse and spinReverse', () => {
  const vm = mountFromProps({ icon: faCoffee, spinPulse: true, spinReverse: true })

  expect(vm.$el.classList.contains('fa-spin-pulse')).toBeTruthy()
  expect(vm.$el.classList.contains('fa-spin-reverse')).toBeTruthy()
})

test('using inverse', () => {
  const vm = mountFromProps({ icon: faCoffee, inverse: true })

  expect(vm.$el.classList.contains('fa-inverse')).toBeTruthy()
})

describe('using transform', () => {
  test('string', () => {
    const vm = mountFromProps({ icon: faCoffee, transform: 'grow-40 left-4 rotate-15' })

    expect(vm.$el).toBeTruthy()
  })

  test('object', () => {
    const vm = mountFromProps({ icon: faCoffee, transform: { flipX: false, flipY: false, rotate: 15, size: 56, x: -4, y: 0 } })

    expect(vm.$el).toBeTruthy()
  })
})

describe('mask', () => {
  test('will add icon', () => {
    const vm = mountFromProps({ icon: faCoffee, mask: faCircle })

    expect(vm.$el.innerHTML).toMatch(/clipPath/)
  })

  test('will add icon referencing librbary', () => {
    const vm = mountFromProps({ icon: ['fas', 'coffee'], mask: ['fas', 'circle'] })
  })
})

describe('symbol', () => {
  test("will not create a symbol", () => {
    const vm = mountFromProps({ icon: faCoffee })

    expect(vm.$el.style.getPropertyValue('display'))
      .toBe('')
  })

  test("will create a symbol", () => {
    const vm = mountFromProps({ icon: faCoffee, symbol: 'coffee-icon' })

    expect(vm.$el.style.getPropertyValue('display'))
      .toBe('none')
    expect(vm.$el.children[0].tagName)
      .toBe('symbol')
  })
})

describe('title', () => {
  test('using title', () => {
    const vm = mountFromProps({ icon: faCoffee, title: 'Coffee' })

    expect(vm.$el.getElementsByTagName('title')[0].innerHTML)
      .toBe('Coffee')
  })

  test('not using title', () => {
    const vm = mountFromProps({ icon: faCoffee })

    expect(vm.$el.getElementsByTagName('title').length)
      .toBe(0)
  })
})

describe('using bounce', () => {
  test('bounce', () => {
    const vm = mountFromProps({ icon: faCoffee, bounce: true })

    expect(vm.$el.classList.contains('fa-bounce')).toBeTruthy()
  })
})

describe('using shake', () => {
  test('shake', () => {
    const vm = mountFromProps({ icon: faCoffee, shake: true })

    expect(vm.$el.classList.contains('fa-shake')).toBeTruthy()
  })
})

describe('using beat-fade', () => {
  test('beat-fade', () => {
    const vm = mountFromProps({ icon: faCoffee, beatFade: true })

    expect(vm.$el.classList.contains('fa-beat-fade')).toBeTruthy()
  })
})
