/**
 * 计分板
 */
import {
    setScore,
    getScore,
    subscribeScore,
    getSeconds
} from 'store'
class Score {
    constructor() {
        this.$el = null
        this.initScore()
        subscribeScore(this.renderScore.bind(this))
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
        this.$el = score
        document.body.appendChild(score)
    }

    addScore(bounus) {
        const seconds = getSeconds()
        if (seconds !== 0) {
            setScore(getScore() + bounus)
        }
    }
    
    renderScore() {
        this.$el.innerText = getScore()
    }
}

export default Score