
import { eventEmitter, TIME_CHANGE_EVENT } from '@/utils'

export default class TimeBoard {
  constructor(initTimes) {
    this.times = initTimes
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
    var boardText = document.createTextNode(createTimerText(this.times))
    board.appendChild(boardText)
    document.body.appendChild(board)
    this.$el = board
  }

  initEvent() {
    eventEmitter.on(TIME_CHANGE_EVENT, (times) => {
      this.times = times
      this.renderTimerText(times)
    })
  }

  renderTimerText() {
    this.$el.innerText = createTimerText(this.times)
  }
}

const createTimerText = (times) => `剩余时间${times}秒`
