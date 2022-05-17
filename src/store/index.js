import { createStore } from 'vuex'

export default createStore({
  state: {
    dark: false,
    roomId : null,
    roomRef : null,
    vidUrl: null,
    reRenderVideo: 0,
    nav: true,
    messages: [],

    // current authenticated user
    userId: 1,
    userName: 'Taha Lechgar',
    profileImage: 'profile-image.svg'
  },
  getters: {
    dark: state => state.dark,
    roomId: state => state.roomId,
    roomRef: state => state.roomRef,
    vidUrl: state => state.vidUrl,
    reRenderVideo: state => state.reRenderVideo,
    nav: state => state.nav,
    messages: state => state.messages,
    userId: state => state.userId,
    userName: state => state.userName,
    profileImage: state => state.profileImage
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
