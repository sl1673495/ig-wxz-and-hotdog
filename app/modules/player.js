/**
 * 人物
 */
import { screenWidth, safeHeight, addEvent, PLYAYER_OPTIONS, isUndef } from '@/utils'

const { width: playerWidth, height: playerHeight, img } = PLYAYER_OPTIONS

export default class Player {
    constructor() {
        // 初始化位置 屏幕正中
        this.posX = screenWidth / 2 - playerWidth / 2
        this.initPlayer()
        this.initMoveEvent()
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
        const moveEvents = ['touchmove', 'mousemove']
        addEvent(body, 'touchstart', e => {
            setPositionX(this, e)
        })
        moveEvents.forEach((name) => {
            addEvent(
                body,
                name,
                e => {
                    e.preventDefault()
                    setPositionX(this, e)
                }, {
                    passive: false
                }
            )
        })
        
    }
}

const setPositionX = (player, e) => {
    let x = e.pageX
    if (isUndef(x)) {
        x = e.touches[0].clientX
    }
    const { $el } = player
    $el.style.transform = `translateX(${checkScreenLimit(x - (playerWidth / 2))}px)`
    player.posX = x
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