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
      this.subscribe(key, fn)
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

  subscribe(key, fn) {
    (this._listeners[key] || (this._listeners[key] = [])).push(fn)
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