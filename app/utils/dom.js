import { isUndef } from './index'

const supportsPassive = (function () {
    let support = false
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function () {
                support = true
            }
        })
        window.addEventListener('test', null, opts)
    } catch (e) { }
    return support
})()

export const addEvent = (
    node,
    event,
    fn,
    options = {}
) => {
    let { capture, passive } = options

    capture == isUndef(capture) ? false : capture
    passive = isUndef(passive) ? true : passive

    if (typeof node.addEventListener == 'function') {
        if (supportsPassive) {
            node.addEventListener(event, fn, {
                capture,
                passive,
            })
        } else {
            node.addEventListener(event, fn, capture)
        }
    }
    else if (typeof node.attachEvent == 'function') {
        node.attachEvent('on' + event, fn);
    }
}

export const removeEvent = function (node, event, fn) {
    if (typeof node.removeEventListener == 'function') {
        node.removeEventListener(event, fn);
    }
    else if (typeof node.detatchEvent == 'function') {
        node.detatchEvent('on' + event, fn);
    }
}

export const removeNode = (node) => node.parentNode.removeChild(node)