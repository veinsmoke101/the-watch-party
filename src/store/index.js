import { createStore } from 'vuex'
import axios from "axios";
import router from "../router";

export default createStore({
  state: {
    sender: null,
    dark: false,
    host: false,
    hostId: null,
    margin: true,
    roomId : null,
    roomRef : null,
    vidUrl: null,
    reRenderVideo: 0,
    messages: [],
    currentUsers: [],
    roomUsersCount: 0,
    roomError: "",
    isLoading: true,

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
    host: state => state.host,
    hostId: state => state.hostId,
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
    currentUsers: state => state.currentUsers,
    roomError: state => state.roomError,
    isLoading: state => state.isLoading,
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
    setHost: (state, bool) => {
      state.host = bool
    },
    setHostId: (state, id) => {
      state.hostId = id
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
    setIsLoading: (state, isLoading) => {
      state.isLoading = isLoading
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
    setRoomError: (state, roomError) => {
      state.roomError = roomError
    },
    addUser: (state, user) => {
      state.currentUsers.push(user)
    },
    removeUser: (state, id) => {
      state.currentUsers = state.currentUsers.filter(user => user.id.toString() !== id)
    },
    removeAllUser: (state) => {
      state.currentUsers = []
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

    },
    joinRoom: ({commit}, payload) => {
      axios.get(`http://localhost:8080/room/${payload.roomRef}/${payload.id}`, {withCredentials: true})
          .then((response) => {
            console.log(response.data.roomData.id)
            commit('setIsLoading', false)
            if (response.data.status === 'error') {
              router.push('/main')
            }
            commit('setRoomId', response.data.roomData.id)
            commit('setHostId', response.data.roomData.author)
            commit('setVidUrl', response.data.videoUrl)
            if(response.data.roomData.author.toString() === payload.id.toString()){
              commit('setHost', true)
            }
            // add message to vuex store
            let messages = response.data.roomMessages
            messages.slice().reverse().forEach(el => {
              let message = JSON.parse(JSON.parse(el).message)
              commit('addMessage', message)
            })
            // add  current users to vuex store
            let users = response.data.roomUsers
            commit('setCurrentUsers', users)
          })
          .catch((error) => {
            console.log()
            commit('setRoomError', error.response.data.message)
            router.push('/main')
          })
    }
  },


  modules: {
  }
})
