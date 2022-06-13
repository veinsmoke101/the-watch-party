<template>
  <div class="videoRoom">
    <div class="videoRoom__video">
      <VideoPlayer title="Video of Puppies"
                   :src="vidUrl"
                   :key="reRenderVideo"
                   type="video/youtube"/>
    </div>
  <ChatPanel />

  </div>

</template>

<script setup>

// components
import VideoPlayer from "../../components/VideoPlayer.vue"
import ChatPanel from "../../components/room/ChatPanel.vue"

// utilities
import {useStore} from "vuex";
import {computed} from "vue"

const store = useStore()

// vuex states
const reRenderVideo = computed(() => store.getters.reRenderVideo)
const dark = computed(() => store.getters.dark)
const vidUrl = computed(() => store.getters.vidUrl)


</script>

<style lang="scss">

@use '../../sass/base';

.videoRoom {
  width: 100%;
  margin-top: 1rem;
  padding-left: 1rem;
  height: 500px;
  @include base.flexRow(center, space-between);
  @include base.tablet{
    flex-direction: column;
    height: auto;
  }
&__video {
   min-width: 70% !important;
  @include base.tablet{
    width: 95%;
    margin: 2rem 0
  }
 }

&__chatPanel {
   width: 100%;
  max-width: 400px;
   @include base.flexColumn(center, center);
  height: 100%;
  @include base.tablet{
    width: 100%;
    max-width: 100%;
    height: 300px;
    max-height: 300px;
  }
 }

&__settings {
   background-color: base.$main;
   width: 90%;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   height: 50px;
   padding-left: 5px;
   position: relative;
   @include base.flexRow(center, space-between);

  img {
    width: 50px;
    cursor: pointer;
  }
}

&__chat {
    background-color: rgba(123, 44, 191, 0.2);
    max-height: 100%;
    height: 100%;
    overflow-y: scroll;
    margin: 1rem 0 0.2rem 0;
    width: 90%;
    max-width: 400px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    @include base.flexColumn(center, flex-start);
    @include base.tablet{
      max-width: 100%;
    }
 }

&__message {
    width: 90%;
    max-width: 90%;
    word-break: break-all;
    text-align: start;
    height: auto;
    margin: 0.5rem 0;
    @include base.flexRow(flex-start, flex-start);

  img {
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

}

&__messageInfo {
   height: 100%;
   @include base.flexColumn(flex-start, space-between)
 }

&__sender {
   @include base.flexRow(center, center);

p {
  font-weight: bold;
  margin-right: 1rem;
}
}

&__messageBody {
   font-size: 0.8rem;
 }


&__sendMessage {
   width: 90%;
   position: relative;
   margin-top: auto;
   bottom: 5px;
   @include base.flexRow(center, flex-start);


    img {
      margin-left: auto;
      position: absolute;
      right: 10px;
      width: 25px;
      cursor: pointer;
    }


}

.emojiWrapper {
  position: absolute;
  bottom: 35px;
  width: 100%;
}


&__messageInput {
   width: 100%;
   height: 100%;
   padding: 0.5rem;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   font-size: 0.8rem;
    outline: none;
 }


&__settingMenu {
   position: absolute;
   top: 50px;
   left: 0;
   right: 0;

.menuWrapper {
  position: relative;
  z-index: 10;
  margin: 1rem 0;
  border-radius: 5px;

  @include base.flexColumn(flex-end, center);

img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -14px;
  right: 15px;
  z-index: 9;
}

.element {
  position: relative;
  z-index: 11;
  color: white;
  background-color: base.$main;
  padding: 1rem;
  width: 100%;
  cursor: pointer;

&:hover {
   background-color: #650eb1;
 }
}

div:first-of-type {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

div:last-of-type {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

}


}


}

</style>