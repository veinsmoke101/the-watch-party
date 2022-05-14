<script setup>

// components
import RoomInfos from "../components/room/RoomInfos.vue"
import VideoSection from "../components/room/VideoSection.vue"

// utilities
import {useStore} from "vuex";
import {computed, onMounted} from "vue"
import Pusher from "pusher-js"

// setting up store
const store = useStore()

// vuex states
const dark = computed(() => store.getters.dark)
const reRenderVideo = computed(() => store.getters.reRenderVideo)

// vuex mutations
const setReRenderVideo = (reRender) => store.commit('setReRenderVideo', reRender)
const setVidUrl = (reRender) => store.commit('setVidUrl', reRender)


// const ytbUrl = computed(() => store.getters.dark ? 'https://www.youtube.com/watch?v=drdHIbbBnA0' : 'https://www.youtube.com/watch?v=a5uQMwRMHcs')

const setNav = (bool) => store.commit('setNav', bool)
const setRoomRef = (ref) => store.commit('setRoomRef', ref)



onMounted(() => {
  setNav(true)
  setRoomRef('room_62766c95533e9')
  Pusher.logToConsole = true;

  let pusher = new Pusher("ee67aad443c2735b4c8f", {
    cluster: "eu",
  })
  let channel = pusher.subscribe(store.getters.roomRef)
  channel.bind('videoUrl', (data) => {
    setVidUrl(data)
    setReRenderVideo(reRenderVideo+1)
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

  <div class="containeer">
    <RoomInfos />
    <VideoSection />
  </div>
</template>


<style lang="scss">
@use '../sass/base';

.containeer {
  @include base.flexColumn(center, center);
  background-color: rgba(123, 44, 191, 0.05)
}

.picker {
  position: absolute;
}

</style>