import { createStore } from 'vuex'

export default createStore({
  state: {
    dark: false,
    roomId : null,
    vidUrl: null,
    reRenderVideo: 0,
    navBg: true,
  },
  getters: {
    dark: state => state.dark,
    roomId: state => state.roomId,
    vidUrl: state => state.vidUrl,
    reRenderVideo: state => state.reRenderVideo,
    navBg: state => state.navBg,
  },
  mutations: {
    setDark: (state, bool) => {
      state.dark = bool
    },
    setRoomId: (state, roomId) => {
      state.roomId = roomId
    },
    setVidUrl: (state, vidUrl) => {
      state.vidUrl = vidUrl
    },
    setReRenderVideo: (state, reRenderVideo) => {
      state.reRenderVideo = reRenderVideo
    },
    setNavBg: (state, bool) => {
      state.navBg = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
