<template>



  <div class="videojs">

    <div class="video-inner-container">

      <video
          ref="videoPlayer"
          id="videoPlayer"
          controls
          preload="auto"
          class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
          data-setup='{}'
      >
        <source :src=src :type=type>
      </video>

    </div>

  </div>


</template>

<script setup>


import 'videojs-youtube/dist/Youtube.min.js';
import 'videojs-event-tracking/dist/videojs-event-tracking.min';
import 'video.js/dist/video-js.min.css';
import videojs from "video.js"
import {computed, inject, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {getCurrentTime} from "../js/getCurrentTime";
import axios from "axios";




const props = defineProps({
  src: String,
  type: String
})

const store = useStore()

const userId = computed(() => store.getters.userId)
const sender = computed(() => store.getters.sender)
const seeked = computed(() => store.getters.seeked)
const issuedByMe = computed(() => store.getters.issuedByMe)
const socketId = computed(() => store.getters.socketId)

let localSeeked = true

const addMessage = (message) => store.commit('addMessage', message)
const setSeeked = (seek) => store.commit('setSeeked', seek)
const setIssuedByMe = (issuer) => store.commit('setIssuedByMe', issuer)
const setCurrentTime = (issuer) => store.commit('setCurrentTime', issuer)


const player = ref(null)
const videoPlayer = ref(null)

// add a message to vuex store and return it if specified
const prepareMessage = (message, addMsgLocally, returnValue = true) => {
  let newMessage = {
    id: localStorage.getItem('userId'),
    src: localStorage.getItem('profileImage'),
    author: localStorage.getItem('username'),
    added_at: getCurrentTime(),
    body: message,
    premium: localStorage.getItem('premium')
  }

  if(addMsgLocally) addMessage(newMessage)
  if(returnValue) return newMessage
}

// send message to the server
const sendMessage = (message, route, time = null) => {
  let preparedMessage = prepareMessage(message, false)
  let data = {
    roomRef: store.getters.roomRef,
    time: time,
    message: JSON.stringify(preparedMessage),
    socketId: socketId.value
  }

  axios.post(`http://localhost:8080/${route}`, data)
      .then((response) => console.log("response :" + response))
      .catch((error) => console.log("error :" + error))

}

onMounted(() => {


  // ---------------------- video.js setup ---------------------------------
  // ---------------------- video.js setup ---------------------------------
  // ---------------------- video.js setup ---------------------------------
  // ---------------------- video.js setup ---------------------------------

  player.value = videojs(
      videoPlayer.value,
      {autoplay: true, muted: true, plugins: { eventTracking: true }},
      () => {
        videojs.log("ready")
      })

  // let button = player.value.controlBar.addChild('button', {}, 1)
  // button.addClass("seekIcon")




  player.value.on('play', () => {
    console.log("i'm ON play")

    if(!localSeeked){
      localSeeked = true
      return
    }

    if(!seeked.value){
      return
    }
    if(!issuedByMe.value ){
      setIssuedByMe(true)
      return
    }

    console.log("i'm ON play after condition");


    prepareMessage('Played the video!', true, false)
    sendMessage('Played the video!',"video/play")
  })


  player.value.on('pause', () => {
    console.log("i'm ON from paused");
    if(!issuedByMe.value ){
      setIssuedByMe(true)
      return
    }
    prepareMessage('Paused the video!', true, false)
    sendMessage('Paused the video!',"video/pause")
  })


  player.value.on('seeked', () => {
    console.log("i'm ON from seeked");
    if(!seeked.value){
      setSeeked(true)
      return
    }

    // setSender(localStorage.getItem('userId'))
    console.log("i'm ON from seeked after condition")
    localSeeked = false
    console.log("seeked condition : " + sender.value +" |||| "+ localStorage.getItem('userId'))
    let currentTime = player.value.currentTime()
    let message = `Jumped to ${secToMin(currentTime)}`
    console.log('im sending : ' + player.value.currentTime())
    setCurrentTime(player.value.currentTime())
    prepareMessage(message, true, false)
    sendMessage(message, 'video/jump', currentTime)

  })



  const secToMin = (sec) => {
    let min = Math.trunc(sec / 60)
    let remainingSec = Math.trunc(sec - min * 60)
    remainingSec = (remainingSec < 10 ) ? `0${remainingSec}` : remainingSec
    return `${min}:${(remainingSec)}`
  }
})

const bind = inject("bind")

let handlePause = (data) => {
  if(player.value.paused()) return
  console.log("i'm handle from paused");

  let parsedData = JSON.parse(data)
  let message = JSON.parse(parsedData.message)
  addMessage(message)
  setIssuedByMe(false)
  player.value.pause()
}

let handlePlay = (data) => {
  console.log("i'm handle play");
  if(!player.value.paused()) return
  console.log("i'm handle play after condition");

  let parsedData = JSON.parse(data)
  let message = JSON.parse(parsedData.message)
  addMessage(message)
  setIssuedByMe(false)
  player.value.play()
}

let handleJump = (data) => {
  console.log("i'm handle from seeked");

  let parsedData = JSON.parse(data)
  let message = JSON.parse(parsedData.message)
  addMessage(message)
  console.log( 'im receiving : ' + parsedData.time)
  setSeeked(false)
  player.value.currentTime(parsedData.time)
}


bind("pause", handlePause)
bind("play", handlePlay)
bind("jump", handleJump)



onBeforeUnmount(() => {

  if(player.value){
    player.value.dispose()
  }

  const unbind = inject("unbind")

  unbind("pause")
  unbind("play")
  unbind("jump")
})


</script>

<style>
.video-js .vjs-menu-button-inline.vjs-slider-active,
.video-js .vjs-menu-button-inline:focus,
.video-js .vjs-menu-button-inline:hover,
.video-js.vjs-no-flex .vjs-menu-button-inline {
  width: 10em;
}
.video-js .vjs-controls-disabled .vjs-big-play-button {
  display: none !important;
}
.video-js .vjs-control {
  width: 3em;
}
.video-js .vjs-menu-button-inline:before {
  width: 1.5em;
}
.video-js .vjs-button.seekIcon {

  width: 25px;
  height: 25px;
  background-image: url("../assets/icons/back-10-seconds.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position:bottom;
}
.vjs-menu-button-inline .vjs-menu {
  left: 3em;
}
.video-js .vjs-load-progress div,
.vjs-seeking .vjs-big-play-button,
.vjs-waiting .vjs-big-play-button {
  display: none !important;
}
.video-js .vjs-mouse-display:after,
.video-js .vjs-play-progress:after {
  padding: 0 0.4em 0.3em !important;
}
.video-js.vjs-ended .vjs-loading-spinner {
  display: none;
}
.video-js.vjs-ended .vjs-big-play-button {
  display: block !important;
}
.video-js.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started.video-js .vjs-big-play-button,
.video-js.vjs-ended .vjs-big-play-button {
  display: block;
}
.video-js .vjs-big-play-button {
  top: 50%;
  left: 50%;
  margin-left: -1.5em;
  background-color: #7b2cbf !important;
  font-size: 3.5em;
  border-radius: 10px !important;
  border: none !important;
  height: 1.6em !important;
  line-height: 1.6em !important;
  margin-top: -0.8em !important;
}
.video-js .vjs-big-play-button:active,
.video-js .vjs-big-play-button:focus
{
  background-color: #7b2cbf !important;
}


.vjs-big-play-button:hover{
  background-color: #650eb1 !important;
}
.video-js .vjs-loading-spinner {
  border-color: #7b2cbf;
}
.video-js .vjs-control-bar2 {
  background-color: transparent;
}
.video-js .vjs-control-bar {
  background-color: rgba(0, 0, 0, 0.5) !important;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
}

.video-js .vjs-play-progress,
.video-js .vjs-volume-level {
  background-color: #7b2cbf !important;
}
.video-js .vjs-progress-holder {
  font-size: 1.7em;
  border-radius: 10px;
}
.video-js .vjs-progress-holder .vjs-load-progress,
.video-js .vjs-progress-holder .vjs-load-progress div,
.video-js .vjs-progress-holder .vjs-play-progress,
.video-js .vjs-slider,
.vjs-volume-level {
  border-radius: 10px;
}
.video-js .vjs-load-progress {
  background: rgba(255, 255, 255, 0.2);
}
.vjs-modal-dialog-content{
  display: none;
}


</style>