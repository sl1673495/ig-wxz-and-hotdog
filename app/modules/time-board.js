
/**
 * 计时板
 */
import { eventEmitter, TIME_CHANGE_EVENT } from '@/utils'

export default class TimeBoard {
  constructor(initTimes) {
    this.$el = null
    this.residualSeconds = initTimes
    this.initTimerBoard()
    this.initEvent()
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
    var boardText = document.createTextNode(createTimerText(this.residualSeconds))
    board.appendChild(boardText)
    document.body.appendChild(board)
    this.$el = board
  }

  initEvent() {
    eventEmitter.on(TIME_CHANGE_EVENT, (seconds) => {
      this.residualSeconds = seconds
      this.renderTimerText(seconds)
    })
  }

  renderTimerText() {
    this.$el.innerText = createTimerText(this.residualSeconds)
  }
}

const createTimerText = (seconds) => `剩余时间${seconds}秒`
