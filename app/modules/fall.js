import {
    screenWidth,
    screenHeight,
    PLYAYER_OPTIONS,
    FALL_OPTIONS,
    CHECK_FALL_EVENT,
    removeNode,
    eventEmitter,
} from '@/utils'

const {
    img,
    width,
    height,
    intervalDistance
} = FALL_OPTIONS

const {
    height: playerHeight,
} = PLYAYER_OPTIONS

// 从生成到落到人物位置需要的总移动次数
const timesToPlayer = Math.floor((screenHeight - playerHeight) / intervalDistance)
// 从生成到落到屏幕底部需要的总移动次数
const timesToEnd = Math.floor(screenHeight / intervalDistance)
export default class Fall {
    constructor() {
        this.posY = 0
        this.posX = getScreenRandomX()
        this.moveTimes = 0
        this.initFall()
        this.startFall()
    }

    initFall() {
        const fall = document.createElement('img')
        this.$el = fall
        fall.src = img
        fall.style.cssText = `
            position: fixed;
            width: ${width}px;
            height: ${height}px;
            left: ${this.posX}px;
            transform: translateY(0px);
            z-index: 0;
        `
        document.body.appendChild(fall)
    }

    updateY() {
        this.moveTimes++

        // 进入人物范围 生成高频率定时器通知外部计算是否碰撞
        if (this.moveTimes === timesToPlayer) {
            if (!this.emitTimer) {
                this.emitTimer = setInterval(() => {
                    eventEmitter.emit(CHECK_FALL_EVENT, this)
                }, 4)
            }
        }

        // 到底部了没有被外部通知销毁 就自行销毁
        if (this.moveTimes === timesToEnd) {
            this.destroy()
            return
        }

        const nextY = this.posY + intervalDistance
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

function getScreenRandomX() {
    return Math.random() * (screenWidth - width)
}