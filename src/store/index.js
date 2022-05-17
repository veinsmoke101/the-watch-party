import { createStore } from 'vuex'

export default createStore({
  state: {
    dark: false,
    roomId : null,
    roomRef : null,
    vidUrl: null,
    reRenderVideo: 0,
    nav: true,
    messages: []
  },
  getters: {
    dark: state => state.dark,
    roomId: state => state.roomId,
    roomRef: state => state.roomRef,
    vidUrl: state => state.vidUrl,
    reRenderVideo: state => state.reRenderVideo,
    nav: state => state.nav,
    messages: state => state.messages
  },

  mutations: {
    setDark: (state, bool) => {
      state.dark = bool
    },
    setRoomId: (state, roomId) => {
      state.roomId = roomId
    },
    setRoomRef: (state, roomRef) => {
      state.roomRef = roomRef
    },
    setVidUrl: (state, vidUrl) => {
      state.vidUrl = vidUrl
    },
    setReRenderVideo: (state, reRenderVideo) => {
      state.reRenderVideo = reRenderVideo
    },
    setNav: (state, bool) => {
      state.nav = bool
    },
    addMessage: (state, message) => {
      state.messages.push(message)
    }
  },
  actions: {
  },
  modules: {
  }
})
