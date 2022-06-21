<script setup>

// components
import RoomInfos from "../components/room/RoomInfos.vue"
import VideoSection from "../components/room/VideoSection.vue"
import { ContentLoader } from "vue-content-loader"


// utilities
import {useStore} from "vuex";
import {computed, onBeforeUnmount, onMounted, provide} from "vue"
import Pusher from "pusher-js"
import router from "../router";
import axios from 'axios'
import {getCurrentTime} from "../js/getCurrentTime";

// props
 const props = defineProps({
  roomRef: String
})


// setting up store
const store = useStore()

// vuex states
const dark = computed(() => store.getters.dark)
const socketId = computed(() => store.getters.socketId)


// vuex mutations
const setReRenderVideo = (reRender) => store.commit('setReRenderVideo', reRender)
const setVidUrl = (url) => store.commit('setVidUrl', url)
const setSender = (sender) => store.commit('setSender', sender)
const setLogged = (bool) => store.commit('setLogged', bool)
const setSocketId = (bool) => store.commit('setSocketId', bool)
const setRoomError = (error) => store.commit('setRoomError', error)



// const ytbUrl = computed(() => store.getters.dark ? 'https://www.youtube.com/watch?v=drdHIbbBnA0' : 'https://www.youtube.com/watch?v=a5uQMwRMHcs')

const setRoomRef = (ref) => store.commit('setRoomRef', ref)
const setRoomId = (id) => store.commit('setRoomId', id)
const addMessage = (message) => store.commit('addMessage', message)
const addUser = (user) => store.commit('addUser', user)
const removeUser = (user) => store.commit('removeUser', user)
const setRoomUsersCount = (count) => store.commit('setRoomUsersCount', count)
const joinRoom = (payload) => store.dispatch('joinRoom', payload)

const isLoading = computed(() => store.getters.isLoading)

const leaveRoom = (kick = false) => {
   
 const leaveRoomRequest = () => {
   let data = {
     user_id: localStorage.getItem('userId'),
     room_ref: props.roomRef,
   }
   if(kick === true) data.kick = 'true'

   return axios.post(`http://localhost:8080/leave/room`, data)
 }

  // message to send other users
  const sendMessageRequest = () => {
    let leftMessage = {
      id: localStorage.getItem('userId'),
      src: localStorage.getItem('profileImage'),
      author: localStorage.getItem('username'),
      added_at: getCurrentTime(),
      body: 'Left the party!',
      premium: localStorage.getItem('premium')

    }
    let messageData = {
      roomRef: store.getters.roomRef,
      message: JSON.stringify(leftMessage)
    }
    return axios.post("http://localhost:8080/new/message", messageData)
  }


  axios.all([leaveRoomRequest(), sendMessageRequest()])
      .then(function (results) {
        const acct = results[0];
        const perm = results[1];
        console.log(acct, perm)
      })

}

provide("leaveRoom", leaveRoom)

onMounted( () => {
  window.onpagehide = leaveRoom
  setLogged(true)
  setSender(localStorage.getItem('userId'))

  // request to join a room
  let payload = {
    roomRef: props.roomRef,
    id: localStorage.getItem('userId')
  }
  joinRoom(payload)
  setRoomRef(props.roomRef)

  // ---------------------- pusher setup ---------------------------------
  // ---------------------- pusher setup ---------------------------------
  // ---------------------- pusher setup ---------------------------------
  // ---------------------- pusher setup ---------------------------------

  Pusher.logToConsole = true;


  let pusher = new Pusher("ee67aad443c2735b4c8f", {
    cluster: "eu",
  })



  let channel = pusher.subscribe(store.getters.roomRef)

  pusher.connection.bind('connected', () => {
    setSocketId(pusher.connection.socket_id)
  })

  channel.bind('videoUrl', (data) => {
    setReRenderVideo(store.getters.reRenderVideo + 1)
    setVidUrl(data)
  })

  channel.bind('message', (data) => {
    let parsedData = JSON.parse(data)
    let message = JSON.parse(parsedData.message)
    addMessage(message)
    console.log(data)
  })

  channel.bind('roomUsersCount', (data) => {
    setRoomUsersCount(data)
  })

  channel.bind('newUser', (data) => {
    addUser(JSON.parse(data))
  })

  channel.bind('kickUser', (id) => {
    if(localStorage.getItem('userId') !== id.toString()) return
    leaveRoom()
    setRoomError('Sorry! You have been kicked from the party.')
    router.push('/main')
  })

  channel.bind('killRoom', (id) => {
    if(localStorage.getItem('userId') === id.toString()) return
    setRoomError('Oops! looks like this room has been ended.')
    router.push('/main')
  })

  channel.bind('userLeft', (data) => {
    console.log("i'm userLeft id : " + data);
    removeUser(data)
  })

  provide("bind", (...args) => {
    console.log("bind BOY");
    channel.bind(...args);
  })

  provide("unbind", (...args) => {
    console.log("unbind BOY")
    channel.unbind(...args);
  })

})

onBeforeUnmount(() => {
  window.removeEventListener('pagehide', () => leaveRoom())
})


// const mapMutations = () => {
//   const store = useStore()
//   return Object.fromEntries(
//       Object.keys(store._mutations).map(
//           mutation => [mutation, value => store.commit(mutation, value)]
//       )
//   )
// }
// const { setDark } = mapMutations()


</script>

<template>
<div v-if="isLoading" class="loading">

  <content-loader
      viewBox="0 0 400 600"
      class="loader-taha"
      :speed="0"
      primaryColor="rgba(123, 44, 191, 0.05)"
  >
    <rect x="2" y="32" rx="2" ry="2" width="310" height="18" />
    <rect x="0" y="58" rx="2" ry="2" width="310" height="152" />
    <rect x="320" y="80" rx="0" ry="0" width="150" height="128" />
    <rect x="320" y="58" rx="0" ry="0" width="150" height="18" />
  </content-loader>

</div>


  <div v-else class="containeer">
    <RoomInfos />
    <VideoSection />
  </div>

</template>


<style lang="scss">
@use '../sass/base';


.loader-taha{
  width: 95vw;
  height: auto;
}

.containeer {
  @include base.flexColumn(center, center);
  background-color: rgba(123, 44, 191, 0.05)
}

.loading {
  width: 70%;
  height: 100%;
}

.picker {
  position: absolute;
}

</style>