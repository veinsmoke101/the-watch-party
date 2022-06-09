import { createStore } from 'vuex'

export default createStore({
  state: {
    sender: null,
    dark: false,
    logged: false,
    margin: true,
    roomId : null,
    roomRef : null,
    vidUrl: null,
    reRenderVideo: 0,
    messages: [],
    currentUsers: [],
    roomUsersCount: 0,

    // video events
    seeked : true,
    issuer : false,
    issuedByMe: true,
    currentTime: 0,
    socketId: null
  },
  getters: {
    sender: state => state.sender,
    dark: state => state.dark,
    logged: state => state.logged,
    margin: state => state.margin,
    roomId: state => state.roomId,
    roomRef: state => state.roomRef,
    vidUrl: state => state.vidUrl,
    reRenderVideo: state => state.reRenderVideo,
    messages: state => state.messages,
    seeked: state => state.seeked,
    issuer: state => state.issuer,
    issuedByMe: state => state.issuedByMe,
    currentTime: state => state.currentTime,
    socketId: state => state.socketId,
    roomUsersCount: state => state.roomUsersCount,
    currentUsers: state => state.currentUsers
  },

  mutations: {
    setSender: (state, id) => {
      state.sender = id
    },
    setDark: (state, bool) => {
      state.dark = bool
    },
    setLogged: (state, bool) => {
      state.logged = bool
    },
    setMargin: (state, bool) => {
      state.margin = bool
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
    addMessage: (state, message) => {
      state.messages.push(message)
    },
    setSeeked: (state, seeked) => {
      state.seeked = seeked
    },
    setIssuer: (state, issuer) => {
      state.issuer = issuer
    },
    setIssuedByMe: (state, issuedByMe) => {
      state.issuedByMe = issuedByMe
    },
    setCurrentTime: (state, currentTime) => {
      state.currentTime = currentTime
    },
    setSocketId: (state, socketId) => {
      state.socketId = socketId
    },
    setRoomUsersCount: (state, roomUsersCount) => {
      state.roomUsersCount = roomUsersCount
    },
    setCurrentUsers: (state, currentUsers) => {
      state.currentUsers = currentUsers
    },
    addUser: (state, user) => {
      state.currentUsers.push(user)
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
