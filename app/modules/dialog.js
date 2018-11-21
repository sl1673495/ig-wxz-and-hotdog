/**
 * 游戏结束对话框
 */
import { screenWidth, DIALOG_OPTIONS, addEvent, removeNode, noop } from '@/utils'
import {
    getScore,
} from 'store'
const { width, height } = DIALOG_OPTIONS

export default class Dialog {
    constructor(onLeftClick, onRightclick) {
        this.onLeftClick = onLeftClick ? () => {
            this.destory()
            onLeftClick()
        } : noop
        this.onRightClick = onRightclick || noop
        this.initDialog()
    }

    initDialog() {
        const dialog = document.createElement('div')
        dialog.style.cssText = `
            position: fixed;
            z-index: 2;
            width: ${width}px;
            height: ${height}px;
            padding-top: 20px;
            border: 2px solid black;
            text-align: center;
            left: ${screenWidth / 2 - width / 2}px;
            top: 200px;
            font-weight: 700;
        `
        const endText = createText('游戏结束', 'font-size: 30px;')
        const scoreText = createText(`${getScore()}分`, 'font-size: 30px;')

        const restartBtn = createButton('replay', this.onLeftClick, 'left: 20px;')
        const starBtn = createButton('❤star', this.onRightClick, 'right: 20px;')

        dialog.appendChild(endText)
        dialog.appendChild(scoreText)
        dialog.appendChild(restartBtn)
        dialog.appendChild(starBtn)

        document.body.appendChild(dialog)
        this.$el = dialog
    }

    destory() {
        removeNode(this.$el)
    }
}


const createText = (text, extraCss) => {
    const p = document.createElement('p')
    p.style.cssText = `
        font-weight: 700;
        text-align: center;
        margin-bottom: 8px;
        ${extraCss}
    ` 
    const textNode = document.createTextNode(text)
    p.appendChild(textNode)
    return p
}

const createButton = (text, fn, extraCss) => {
    const button = document.createElement('div')
    button.style.cssText = `
        position: absolute;
        width: 90px;
        bottom: 20px;
        border: 2px solid black;
        font-weight: 700;
        font-size: 20px;
        ${extraCss}
    `
    const textNode = document.createTextNode(text)
    button.appendChild(textNode)
    addEvent(button,'click', fn)
    return button
}
