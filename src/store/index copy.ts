import { createStore } from "vuex"

/**
 * ??? 为什么要这个接口，以及为什么这样用
 */
interface State {
  count:number
}

export const store = createStore<State>({
  state() {
    return {
      count:1
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }

})