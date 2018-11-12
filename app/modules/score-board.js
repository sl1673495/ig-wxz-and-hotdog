import { eventEmitter, SCORE_EVENT } from '@/utils'
export default class Score {
    constructor() {
        this.$el = null
        this.score = 0
        this.stop = false
        this.initScore()
        this.initEvent()
    }

    reset() {
        this.score = 0
        this.setScore()
        this.stop = false
    }

    initScore() {
        const score = document.createElement('div')
        score.style.cssText = `
            position: fixed;
            z-index: 2;
            width: 100px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            right: 0;
            top: 0;
            font-size: 30px;
            font-weight: 700;
        `
        var scoreText = document.createTextNode(this.score)
        score.appendChild(scoreText)
        document.body.appendChild(score)
        this.$el = score
    }

    initEvent() {
        eventEmitter.on(SCORE_EVENT, () => {
            if (!this.stop) {
                this.addScore()
            }
        })
    }

    addScore() {
        this.score++
        this.setScore()
    }

    setScore() {
        this.$el.innerText = this.score
    }

    stopRecord() {
        this.stop = true
    }
}