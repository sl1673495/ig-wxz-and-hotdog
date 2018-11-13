/**
 * 全局状态管理
 */
class ReactiveStore {
  constructor() {
    this._store = {}
    this._listeners = {}
  }

  // currying
  createAction(key) {
    const set = (val) => {
      this.set(key, val)
    }

    const get = () => {
      return this.get(key)
    }

    const subscribe = (fn) => {
      return this.subscribe(key, fn)
    }

    return {
      get,
      set,
      subscribe,
    }
  }

  // set的时候触发subscribe的方法
  set(key, val) {
    this._store[key] = val
    const listeners = this._listeners[key]
    if (listeners) {
      listeners.forEach(fn => fn())
    }
  }

  get(key) {
    return this._store[key]
  }

  // 订阅某个key的set执行fn回调
  subscribe(key, cb) {
    (this._listeners[key] || (this._listeners[key] = [])).push(cb)

    // return unsubscribe
    return () => {
      const cbs = this._listeners[key]
      const i = cbs.findIndex(f => cb === f)
      cbs.splice(i, 1)
    }
  }
}

const store = new ReactiveStore()

const { set: setScore, get: getScore, subscribe: subscribeScore } = store.createAction('score')
const { set: setSeconds, get: getSeconds, subscribe: subscribeSeconds } = store.createAction('seconds')

export {
  setScore,
  getScore,
  subscribeScore,
  setSeconds,
  getSeconds,
  subscribeSeconds,
}