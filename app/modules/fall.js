import {
    screenWidth,
    screenHeight,
    PLYAYER_OPTIONS,
    WEAPON_OPTIONS,
    FALL_END_EVENT,
    eventEmitter,
} from '@/utils'

const {
    img,
    width,
    height,
    interval
} = WEAPON_OPTIONS

const {
    height: playerHeight,
} = PLYAYER_OPTIONS

export default class Fall {
    constructor() {
        this.posY = 0
        this.posX = getScreenRandomX()
        this.moveTimes = 0
        this.initFall()
        this.shot()
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
        // 总移动次数 
        const timesToPlayer = Math.floor((screenHeight - playerHeight) / interval)
        const nextY = this.posY + interval
        this.$el.style.transform = `translateY(${nextY}px)`
        this.posY = nextY
        this.moveTimes++
        if (this.moveTimes >= timesToPlayer) {
            eventEmitter.emit(FALL_END_EVENT, this.posX)
            this.destroy()
        }
    }

    destroy() {
        this.shotTimer && clearInterval(this.shotTimer)
        this.$el.remove()
    }

    shot() {
        this.shotTimer = setInterval(() => {
            this.updateY()
        }, 16)
    }
}

function getScreenRandomX() {
    return Math.random() * (screenWidth - width)
}