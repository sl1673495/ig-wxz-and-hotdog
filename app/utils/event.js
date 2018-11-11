class EventEmitter {
    constructor() {
        this._event = {}
        this._listeners = []
    }

    on(name, callback) {
        (this._event[name] || (this._event[name] = [])).push(callback)
    }

    emit(name, payload) {
        const cbs = this._event[name] || []
        for (let i = 0, len = cbs.length; i < len; i++) {
            cbs[i](payload)
        }
        if (this._listeners.length) {
            for (let { trigger, callback } of this._listeners) {
                if (trigger(name)) {
                    callback()
                }
            }
        }
    }

    remove(name) {
        this._event[name] = null
    }

    clear() {
        this._event = {}
    }

    // 监听某些事件时使用
    listen(condition, callback) {
        let trigger
        if (condition instanceof RegExp) {
            trigger = eventName => condition.test(eventName)
        } else if (typeof condition === 'string') {
            trigger = eventName => eventName.includes(condition)
        }
        this._listeners.push({
            trigger,
            callback
        })
    }
}

export default new EventEmitter()