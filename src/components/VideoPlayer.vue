<!--<template>-->
<!--  <div>-->
<!--    <video id="videoPlayer" ref="videoPlayer" class="video-js vjs-default-skin"></video>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import videojs from 'video.js';-->
<!--// import "video.js/dist/video.min.js"-->

<!--export default {-->
<!--  name: 'VideoPlayer',-->
<!--  props: {-->
<!--    options: {-->
<!--      type: Object,-->
<!--      default() {-->
<!--        return {};-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      player: null-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.player = videojs(this.$refs.videoPlayer, this.options, () => {-->
<!--      this.player.log('onPlayerReady', this);-->
<!--    });-->
<!--  },-->
<!--  beforeDestroy() {-->
<!--    if (this.player) {-->
<!--      this.player.dispose();-->
<!--    }-->
<!--  }-->


<!--}-->
<!--import "videojs-youtube/dist/Youtube.min.js"-->

<!--</script>-->

<!--<style>-->
<!--  @import "video.js/dist/video-js.min.css";-->
<!--</style>-->


<template>

  <div class="videojs">

    <div class="video-inner-container">

      <video
          ref="videoPlayer"
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

<script>


import 'videojs-youtube/dist/Youtube.min.js';
import 'video.js/dist/video-js.min.css';
import videojs from "video.js"


export default {

  name:'VideoPlayer',

  props: ['src', 'type'],
  data(){
    return {
      player:null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {}, () => {
      this.player.log("onPlayerReady", this)
     })
  },
  beforeUnmount() {
    if(this.player){
      this.player.dispose();
    }
  }


}


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