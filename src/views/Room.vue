<script setup>

// components
import RoomInfos from "../components/room/RoomInfos.vue"
import VideoSection from "../components/room/VideoSection.vue"

// utilities
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue"
import Pusher from "pusher-js"

// setting up store
const store = useStore()

// vuex states
const dark = computed(() => store.getters.dark)
const reRenderVideo = computed(() => store.getters.reRenderVideo)
const roomId = computed(() => store.getters.roomId)

// vuex mutations
const setReRenderVideo = (reRender) => store.commit('setReRenderVideo', reRender)
const setVidUrl = (reRender) => store.commit('setVidUrl', reRender)


// const ytbUrl = computed(() => store.getters.dark ? 'https://www.youtube.com/watch?v=drdHIbbBnA0' : 'https://www.youtube.com/watch?v=a5uQMwRMHcs')


let ytbUrl = ref('')
let search = ref(null)



onMounted(() => {
  Pusher.logToConsole = true;

  let pusher = new Pusher("ee67aad443c2735b4c8f", {
    cluster: "eu",
  })
  let channel = pusher.subscribe("my-channel");
  channel.bind('my-event', (data) => {
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
}

.picker {
  position: absolute;
}

</style>