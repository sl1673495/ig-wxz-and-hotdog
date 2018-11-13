/**
 * 掉落物
 */
import {
    screenWidth,
    screenHeight,
    PLYAYER_OPTIONS,
    CHECK_FALL_EVENT,
    removeNode,
    eventEmitter,
} from '@/utils'

// 每次下落的距离
const INTERVAL_DISTANCE = 15

const CUP = {
    width: 50,
    height: 100,
    img: require('@/assets/images/cup.png'),
    bounus: 5,
}

const HOT_DOG = {
    width: 20,
    height: 50,
    img: require('@/assets/images/hotdog.png'),
    bounus: 1,
}

const {
    height: playerHeight,
} = PLYAYER_OPTIONS
export default class Fall {
    constructor() {
        this.img = null
        this.bounus = 0
        this.width = 0
        this.height = 0
        this.posY = 0
        this.moveTimes = 0
        this.randomFallItem()
        this.calcTimePoint()
        this.initFall()
        this.startFall()
    }

    randomFallItem() {
        const fallItem = Math.random() <= 0.08
            ? CUP
            : HOT_DOG
        const { img, bounus, width, height } = fallItem
        this.img = img
        this.bounus = bounus
        this.width = width
        this.height = height
    }

    // 计算开始碰撞的时间点
    calcTimePoint() {
        const { width, height } = this
        // 从生成到落到人物位置需要的总移动次数
        this.timesToPlayer = Math.floor((screenHeight - playerHeight - height) / INTERVAL_DISTANCE)
        // 从生成到落到屏幕底部需要的总移动次数
        this.timesToEnd = Math.floor(screenHeight / INTERVAL_DISTANCE)
    }

    initFall() {
        this.posX = getScreenRandomX(this.width)
        const { width, height, posX } = this
        const fall = document.createElement('img')
        this.$el = fall
        fall.src = this.img
        fall.style.cssText = `
            position: fixed;
            width: ${width}px;
            height: ${height}px;
            left: ${posX}px;
            transform: translateY(0px);
            z-index: 0;
        `
        document.body.appendChild(fall)
    }

    updateY() {
        this.moveTimes++

        // 进入人物范围 生成高频率定时器通知外部计算是否碰撞
        if (this.moveTimes === this.timesToPlayer) {
            if (!this.emitTimer) {
                this.emitTimer = setInterval(() => {
                    eventEmitter.emit(CHECK_FALL_EVENT, this)
                }, 4)
            }
        }

        // 到底部了没有被外部通知销毁 就自行销毁
        if (this.moveTimes === this.timesToEnd) {
            this.destroy()
            return
        }

        const nextY = this.posY + INTERVAL_DISTANCE
        this.$el.style.transform = `translateY(${nextY}px)`
        this.posY = nextY
    }

    destroy() {
        this.emitTimer && clearInterval(this.emitTimer)
        this.fallTimer && clearInterval(this.fallTimer)
        removeNode(this.$el)
    }

    startFall() {
        this.fallTimer = setInterval(() => {
            this.updateY()
        }, 16)
    }
}

function getScreenRandomX(width) {
    return Math.random() * (screenWidth - width)
}