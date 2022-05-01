import { createStore } from 'vuex'

export default createStore({
  state: {
    dark: false,
    roomId : null
  },
  getters: {
    dark: state => state.dark,
    roomId: state => state.roomId,
  },
  mutations: {
    setDark: (state, bool) => {
      state.dark = bool
    },
    setRoomId: (state, roomId) => {
      state.roomId = roomId
    }
  },
  actions: {
  },
  modules: {
  }
})
