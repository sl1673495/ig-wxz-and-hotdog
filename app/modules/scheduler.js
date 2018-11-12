/**
 * 调度器
 */
import { PLYAYER_OPTIONS, eventEmitter, SCORE_EVENT, CHECK_FALL_EVENT, TIME_CHANGE_EVENT } from '@/utils'

import Fall from './fall'
import ScoreBoard from './score-board'
import Player from './player'
import Dialog from './dialog'
import TimeBoard from './time-board'
import BounusPoint from './bounus-point'

// 游戏时间
const GAME_TIMES = 30
// 初始掉落间隔
const FALL_INTERVAL = 500
// 每次提速
const SPEED_UP_INTERVAL = 100
// 最低掉落间隔
const MIN_INTERVAL = 50

const { width: playerWidth } = PLYAYER_OPTIONS

export default class Scheduler {
    constructor() {
        this.$el = null

        this.fallTimer = null
        this.gameTimer = null

        this.fallInterval = FALL_INTERVAL
        this.residualSeconds = GAME_TIMES

        this.scoreBoard = new ScoreBoard()
        this.player = new Player()
        this.timeBoard = new TimeBoard(GAME_TIMES)

        this.initCheckFallEvent()
        this.gameStart()
    }

    // 注册检测碰撞事件
    initCheckFallEvent() {
        eventEmitter.on(CHECK_FALL_EVENT, (fallInstance) => {
            const { posX: playerPosX } = this.player
            const { posX: fallPosX, bounus } = fallInstance
            const playerLeft = playerPosX - (playerWidth / 2)
            const playerRight = playerPosX + (playerWidth / 2)
            // 碰撞到了 就销毁fall实例
            if (fallPosX >= playerLeft && fallPosX <= playerRight) {
                eventEmitter.emit(SCORE_EVENT, bounus)
                fallInstance.destroy()
                new BounusPoint(playerPosX, bounus)
            }
        })
    }

    // 开始游戏
    gameStart() {
        this.reset()
        this.setFallTimer()
        this.gameTimer = setInterval(() => {
            this.setTimes(--this.residualSeconds)
            this.checkPoint()
        }, 1000)
    }

    // 重置游戏
    reset() {
        this.setTimes(GAME_TIMES)
        this.fallInterval = FALL_INTERVAL
        this.scoreBoard.reset()
    }

    setFallTimer() {
        if (this.fallTimer) {
            clearInterval(this.fallTimer)
        }

        this.fallTimer = setInterval(() => {
            new Fall()
        }, this.fallInterval)
    }

    setTimes(seconds) {
        this.residualSeconds = seconds
        eventEmitter.emit(TIME_CHANGE_EVENT, seconds)
    }

    checkPoint() {
        if (this.residualSeconds === 0) {
            this.gameOver()
            return
        }

        if (this.residualSeconds % 5 === 0) {
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
        this.scoreBoard.stopRecord()
        new Dialog(
            this.scoreBoard.score,
            this.gameStart.bind(this),
            this.goStar.bind(this)
        )
    }

    goStar() {
        window.location.href = 'https://github.com/sl1673495/ig-wxz-and-hotdog'
    }
}
