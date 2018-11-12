import { screenWidth, safeHeight, addEvent, PLYAYER_OPTIONS, eventEmitter, SCORE_EVENT, FALL_END_EVENT, } from '@/utils'

const { width: playerWidth, height: playerHeight, img } = PLYAYER_OPTIONS

export default class Player {
    constructor() {
        // 初始化位置 屏幕正中
        this.posX = screenWidth / 2 - playerWidth / 2
        this.initPlayer()
        this.initMoveEvent()
        this.initCheckFallEvent()
    }

    initPlayer() {
        const el = this.$el = document.createElement('img')
        el.src = img
        el.style.cssText = `
            position: fixed;
            bottom: ${safeHeight}px;
            width: ${playerWidth}px;
            height: ${playerHeight}px;
            left:${ screenWidth / 2 - playerWidth / 2}px;
            z-index: 1;
        `
        document.body.appendChild(el)
    }

    initMoveEvent() {
        const body = document.body
        addEvent(body, 'touchstart', e => {
            setPositionX(this, e)
        })
        addEvent(body, 'touchmove', e => {
            e.preventDefault()
            setPositionX(this, e)
        }, {
            passive: false
        })
    }

    initCheckFallEvent() {
        eventEmitter.on(FALL_END_EVENT, (posX) => {
            const playerLeft = this.posX - (playerWidth / 2)
            const playerRight = this.posX + (playerWidth / 2)
            console.log(posX, playerLeft, playerRight)
            if (posX > playerLeft && posX < playerRight) {
                eventEmitter.emit(SCORE_EVENT)
            }
        })
    }
}

const setPositionX = (player, e) => {
    const { $el } = player
    const { clientX } = e.touches[0]
    $el.style.left = `${clientX - (playerWidth / 2)}px`
    player.posX = clientX
}