import {  screenWidth, safeHeight, addEvent, PLYAYER_OPTIONS, eventEmitter, SCORE_EVENT, CHECK_FALL_EVENT, } from '@/utils'

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
            transform: translateX(${ screenWidth / 2 - playerWidth / 2}px);
            z-index: 1;
        `
        document.body.appendChild(el)
    }

    initMoveEvent() {
        const body = document.body
        addEvent(body, 'touchstart', e => {
            setPositionX(this, e)
        })
        addEvent(
            body,
            'touchmove',
            e => {
                e.preventDefault()
                setPositionX(this, e)
            }, {
                passive: false
            }
        )
    }

    initCheckFallEvent() {
        eventEmitter.on(CHECK_FALL_EVENT, (fallInstance) => {
            const { posX } = fallInstance
            const playerLeft = this.posX - (playerWidth / 2)
            const playerRight = this.posX + (playerWidth / 2)
            // 碰撞到了 就销毁fall实例
            if (posX >= playerLeft && posX <= playerRight) {
                eventEmitter.emit(SCORE_EVENT)
                fallInstance.destroy()
            }
        })
    }
}

const setPositionX = (player, e) => {
    const { $el } = player
    const { clientX } = e.touches[0]
    $el.style.transform = `translateX(${checkScreenLimit(clientX - (playerWidth / 2))}px)`
    player.posX = clientX
}

const checkScreenLimit = (x) => {
    const leftLimit = 0 - (playerWidth / 2)
    const rightLimit = screenWidth - (playerWidth / 2)
    return x < leftLimit
            ? leftLimit
            : x > rightLimit
                ? rightLimit 
                : x
}