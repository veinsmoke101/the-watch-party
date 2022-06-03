<script setup>

// components
import RoomInfos from "../components/room/RoomInfos.vue"
import VideoSection from "../components/room/VideoSection.vue"
import { ContentLoader } from "vue-content-loader"


// utilities
import {useStore} from "vuex";
import {computed, onMounted, provide, ref} from "vue"
import Pusher from "pusher-js"
import router from "../router";
import axios from 'axios'

// props
 const props = defineProps({
  roomRef: String
})


// setting up store
const store = useStore()

// vuex states
const dark = computed(() => store.getters.dark)
const userId = computed(() => store.getters.userId)


// vuex mutations
const setReRenderVideo = (reRender) => store.commit('setReRenderVideo', reRender)
const setVidUrl = (url) => store.commit('setVidUrl', url)
const setSender = (sender) => store.commit('setSender', sender)


// const ytbUrl = computed(() => store.getters.dark ? 'https://www.youtube.com/watch?v=drdHIbbBnA0' : 'https://www.youtube.com/watch?v=a5uQMwRMHcs')

const setRoomRef = (ref) => store.commit('setRoomRef', ref)
const setRoomId = (id) => store.commit('setRoomId', id)
const addMessage = (message) => store.commit('addMessage', message)


const isLoading = ref(true)


onMounted(() => {
  setSender(userId.value)
  let data = {
    id: 3
  }

  console.log(`http://localhost:8080/room/${props.roomRef}/${data.id}`)

  axios.get(`http://localhost:8080/room/${props.roomRef}/${data.id}`)
    .then((response) => {
      console.log(response.data.roomData.id)
      isLoading.value = false
      if (response.data.status === 'error') {
        router.push('/main')
      }
      setRoomId(response.data.roomData.id)
      setRoomRef(response.data.roomData.unique_reference)
      let messages = response.data.roomMessages
      messages.slice().reverse().forEach(el => {
        let message = JSON.parse(JSON.parse(el).message)
        addMessage(message)
      })
    })
    .catch((error) => {
      console.log("error :" + error)
      router.push('/main')
    })

  // fetch(`http://localhost:8080/room/${props.roomRef}/${data.id}`, {
  //   method: 'GET',
  // })
  //     .then(response => response.json())
  //     .then((response) => {
  //       console.log(response.status)
  //       isLoading.value = false
  //       if (response.status === 'error') {
  //         setRoomId(response.data.id)
  //         setRoomRef(response.data.unique_reference)
  //         router.push('/main')
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error :" + error)
  //       router.push('/main')
  //     })

  setRoomRef(props.roomRef)

  // ---------------------- pusher setup ---------------------------------
  // ---------------------- pusher setup ---------------------------------
  // ---------------------- pusher setup ---------------------------------
  // ---------------------- pusher setup ---------------------------------

  // Pusher.logToConsole = true;


  let pusher = new Pusher("ee67aad443c2735b4c8f", {
    cluster: "eu",
  })
  let channel = pusher.subscribe(store.getters.roomRef)

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


  provide("bind", (...args) => {
    console.log("bind BOY");
    channel.bind(...args);
  })

  provide("unbind", (...args) => {
    console.log("unbind BOY")
    channel.unbind(...args);
  })
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