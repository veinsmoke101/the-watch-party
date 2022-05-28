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
import {computed, inject, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import {getCurrentTime} from "../js/getCurrentTime";




const props = defineProps({
  src: String,
  type: String
})

const store = useStore()

const userId = computed(() => store.getters.userId)
const sender = computed(() => store.getters.sender)
const seeked = computed(() => store.getters.seeked)
const userName = computed(() => store.getters.userName)
const profileImage = computed(() => store.getters.profileImage)

const addMessage = (message) => store.commit('addMessage', message)
const setSender = (sender) => store.commit('setSender', sender)
const setSeeked = (seek) => store.commit('setSeeked', seek)
const setReRenderVideo = (reRender) => store.commit('setReRenderVideo', reRender)
const setVidUrl = (vidUrl) => store.commit('setVidUrl', vidUrl)


const player = ref(null)
const videoPlayer = ref(null)

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

  let button = player.value.controlBar.addChild('button', {}, 1)
  button.addClass("seekIcon")

  const prepareMessage = (message, returnValue = true) => {
    let newMessage = {
      id: userId.value,
      src: profileImage.value,
      author: userName.value,
      added_at: getCurrentTime(),
      body: message
    }

    addMessage(newMessage)
    if(returnValue) return newMessage

  }


  const sendMessage = (message, route, time = null) => {

    // console.log("sendMessage : " + time)
    // let senderId = ( sender.value === null ) ? userId.value : sender.value
    // let senderId;
    // if(sender.value === null){
    //   setSender(userId.value)
    //    senderId = userId.value
    // }else{
    //    senderId = sender.value
    // }
    // taha -------------------------- taha
    // console.log("hehehe boy " + route);
    // let newMessage = {
    //     id: userId.value,
    //     src: profileImage.value,
    //     author: userName.value,
    //     added_at: getCurrentTime(),
    //     body: message
    // }
    //
    // addMessage(newMessage)
    // taha -------------------------- taha

    let preparedMessage = prepareMessage(message)

    let data = {
      roomRef: store.getters.roomRef,
      time: time,
      message: JSON.stringify(preparedMessage)
    }

    fetch(`http://localhost:8080/${route}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then((response) => console.log("response :" + response))
        .catch((error) => console.log("error :" + error));


  }

  player.value.on('pause', () => {
    sendMessage('Paused the video!',"video/pause")
  })

  player.value.on('play', () => {
    if (seeked.value === true){
      setSeeked(false)
      return
    }
    sendMessage('Played the video!',"video/play")
  })

  player.value.on('seeked', () => {
    setSeeked(true)
    console.log("seeked condition : " + sender.value +" |||| "+ userId.value);
    let currentTime = player.value.currentTime()
    let message = `Jumped to ${secToMin(currentTime)}`;
    if(userId.value !== sender.value) {
     setSender(userId.value)
     console.log('mucha gracias')
     prepareMessage(message, false)
     return
   }

    sendMessage(message, 'video/jump', currentTime)
  })



  const secToMin = (sec) => {
    let min = Math.trunc(sec / 60)
    let remainingSec = Math.trunc(sec - min * 60);
    return `${min}:${remainingSec}`
  }


  // player.value.on('tracking:buffered', (e, data) =>{
  //   console.log(data.currentTime)
  //   let time = data.currentTime/60
  //   console.log(`taha jumped to ${Math.trunc(time)}:${(time).toFixed(2).substring(2)}`)
  //   // sendMessage(`Jumped to ${Math.trunc(time)}:${(time).toFixed(2).substring(2)}`)
  // })


})

const bind = inject("bind")


let handlePause = () => {
  if(player.value.paused()) return
  player.value.pause()
}

let handlePlay = () => {
  if(!player.value.paused()) return
  player.value.play()
}

let handleJump = (data) => {
  let parsedData = JSON.parse(data)
  let message = JSON.parse(parsedData.message)

  setSender(message.id)
  // console.log(sender.value + "<=====>" + userId.value)
  // console.log(`sender check ${sender.value}`)
  // console.log(`message check ${message.id}`)
  if(sender.value !== userId.value){
    player.value.currentTime(parsedData.time)
  }
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

/*.video-js div:nth-child(1){*/
/*  align-items: center;*/
/*  display: flex;*/
/*  height: 100%;*/
/*  justify-content: center;*/
/*  min-height: 48vh;*/
/*  position: relative;*/
/*}*/
/*.video-js div:nth-child(1) iframe {*/
/*  height: 100%;*/
/*  left: 0;*/
/*  position: absolute;*/
/*  top: 0;*/
/*  width: 100%;*/
/*}*/

</style>