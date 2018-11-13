/**
 * 得分提示
 */
import { PLYAYER_OPTIONS, safeHeight, addEvent, removeNode } from '@/utils'

const { height: playerHeight } = PLYAYER_OPTIONS

export default class BounusPoint {
  constructor(x, bounus) {
    this.$el = null
    this.left = x
    this.bottom = safeHeight + playerHeight
    this.bounus = bounus
    this.init()
    this.initEvent()
  }

  init() {
    const el = document.createElement('div')
    el.style.cssText = `
       position: fixed;
       z-index: 2;
       width: auto;
       height: 20px;
       text-align: center;
       left: ${this.left}px;
       bottom: ${this.bottom}px;
       font-weight: 700;
       font-size: 18px;
       animation:bounus 1s;
    `
    const text = document.createTextNode(`+${this.bounus}`)
    el.appendChild(text)
    document.body.appendChild(el)
    this.$el = el
  }

  initEvent() {
    addEvent(this.$el, 'animationend', () => {
      removeNode(this.$el)
    })
  }
}