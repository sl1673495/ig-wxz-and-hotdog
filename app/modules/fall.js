import {
    screenWidth,
    screenHeight,
    PLYAYER_OPTIONS,
    FALL_OPTIONS,
    FALL_END_EVENT,
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

export default class Fall {
    constructor() {
        this.posY = 0
        this.posX = getScreenRandomX()
        this.moveTimes = 0
        // 总移动次数 
        this.timesToPlayer = Math.floor((screenHeight - playerHeight) / intervalDistance)
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
        if (this.moveTimes > this.timesToPlayer) {
            console.log('end')
            eventEmitter.emit(FALL_END_EVENT, this.posX)
            this.destroy()
            return
        }

        const nextY = this.posY + intervalDistance
        this.$el.style.transform = `translateY(${nextY}px)`
        this.posY = nextY
    }

    destroy() {
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