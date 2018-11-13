
/**
 * 计时板
 */
import { subscribeSeconds, getSeconds } from 'store'
export default class TimeBoard {
  constructor() {
    this.$el = null
    this.initTimerBoard()
    subscribeSeconds(this.renderTimerText.bind(this))
  }

  initTimerBoard() {
    const board = document.createElement('div')
    board.style.cssText = `
            position: fixed;
            z-index: 2;
            width: 200px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            left: 0;
            top: 0;
            font-size: 30px;
            font-weight: 700;
        `
    document.body.appendChild(board)
    this.$el = board
  }

  renderTimerText() {
    this.$el.innerText = createTimerText(getSeconds())
  }
}

const createTimerText = (seconds) => `剩余时间${seconds}秒`
