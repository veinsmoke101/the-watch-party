import { createStore } from 'vuex'

export default createStore({
  state: {
    dark: false
  },
  getters: {
    dark: state => state.dark
  },
  mutations: {
    setDark: (state, bool) => {
      state.dark = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
