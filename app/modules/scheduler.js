import Fall from './fall'
import Score from './scoreboard'
import Player from './player';
import dialog from './dialog';

// 游戏时间
const GAME_TIMES = 30
// 初始掉落间隔
const FALL_INTERVAL = 400
// 每次提速
const SPEED_UP_INTERVAL = 70
// 最低掉落间隔
const MIN_INTERVAL = 50

export default class Scheduler {
    constructor() {
        this.$el = null
        this.fallTimer = null
        this.fallInterval = FALL_INTERVAL
        this.gameTimer = null
        this.times = GAME_TIMES
        this.score = new Score()
        this.player = new Player()
        this.initTimerBoard()
        this.gameStart()
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

    gameStart() {
        this.score.reset()
        this.times = GAME_TIMES
        this.renderTimerText()
        this.setFallTimer()
        this.gameTimer = setInterval(() => {
            this.times--
            this.renderTimerText()
            this.checkPoint()
        }, 1000)
    }

    setFallTimer() {
        if (this.fallTimer) {
            clearInterval(this.fallTimer)
        }

        this.fallTimer = setInterval(() => {
            new Fall()
        }, this.fallInterval)
    }

    checkPoint() {
        if (this.times === 0) {
            this.gameOver()
            return
        }

        if (this.times % 5 === 0) {
            this.speedUp()
        }
    }

    speedUp() {
        this.fallInterval -= SPEED_UP_INTERVAL
        this.fallInterval = Math.max(this.fallInterval, MIN_INTERVAL)
        this.setFallTimer()
    }

    gameOver() {
        clearInterval(this.gameTimer)
        clearInterval(this.fallTimer)
        this.score.stopRecord()
        new dialog(
            this.score.score,
            this.gameStart.bind(this),
            this.goStar.bind(this)
        )
    }

    goStar() {
        console.log('start')
        window.location.href = 'https://github.com/sl1673495/ig-wxz-and-hotdog'
    }

    renderTimerText() {
        this.$el.innerText = createTimerText(this.times)
    }
}

const createTimerText = (times) => `剩余时间${times}秒`