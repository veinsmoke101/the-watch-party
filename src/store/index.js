import { createStore } from 'vuex'

export default createStore({
  state: {

    sender: null,
    dark: false,
    roomId : null,
    roomRef : null,
    vidUrl: null,
    reRenderVideo: 0,
    nav: true,
    messages: [],

    // current authenticated user
    userId: Math.floor(Math.random() * 10),
    userName: 'Taha Lechgar',
    profileImage: 'profile-image.svg',

    // video events
    seeked : false
  },
  getters: {
    sender: state => state.sender,
    dark: state => state.dark,
    roomId: state => state.roomId,
    roomRef: state => state.roomRef,
    vidUrl: state => state.vidUrl,
    reRenderVideo: state => state.reRenderVideo,
    nav: state => state.nav,
    messages: state => state.messages,
    userId: state => state.userId,
    userName: state => state.userName,
    profileImage: state => state.profileImage,
    seeked: state => state.seeked,
  },

  mutations: {
    setSender: (state, bool) => {
      state.sender = bool
    },
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
    },
    setSeeked: (state, seeked) => {
      state.seeked = seeked
    }
  },
  actions: {
    addMessage : ({commit, getters}, payload) => {

      let data = {
        roomRef: getters.roomRef,
        message: JSON.stringify(payload)
      }
      fetch("http://localhost:8080/new/message", {
        method: "POST",
        body: JSON.stringify(data),
      })
          .then(response => response.json())
          .then((response) => console.log("response :" + response))
          .catch((error) => console.log("error :" + error));

    }
  },
  modules: {
  }
})
