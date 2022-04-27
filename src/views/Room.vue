<script setup>

import VideoPlayer from "../components/VideoPlayer.vue"
import {useStore} from "vuex";
import { computed } from "vue"
import illustrationLight from "../assets/images/new-room.svg"
import illustrationDark from "../assets/images/new-room-dark.svg"
import uploadLight from "../assets/icons/upload.svg"
import uploadDark from "../assets/icons/upload-dark.svg"

const store = useStore()

const illustration = computed( () => store.getters.dark ? illustrationDark : illustrationLight )
const uploadIcon = computed( () => store.getters.dark ? uploadDark : uploadLight )



</script>

<template>

  <div class="container">
    <div class="newRoom">
      <div class="newRoom__inputs">
        <div class="newRoom__searchVid">
          <input type="text" placeholder="Enter a youtube video URL">
        </div>
        <div class="newRoom__upload text-gray-500 dark:text-white">
          <img :src="uploadIcon" alt="upload">
          Upload a video
        </div>
      </div>
      <div class="newRoom__users">

      </div>
    </div>
    <div class="videoRoom">
      <div class="videoRoom__video">
        <VideoPlayer title="Video of Puppies"
                     src="https://www.youtube.com/watch?v=zWaDyqJcx6g"
                     type="video/youtube"/>
      </div>


      <div class="videoRoom__chatPanel">
        <div class="videoRoom__settings">
          <p class="text-white">13 users watching</p>
          <img src="../assets/icons/view-more.svg" alt="settings-icon">
        </div>
        <div class="videoRoom__chat">
          <div class="videoRoom__message">
            <img src="../assets/images/profile-image.svg" alt="message-sender">
            <div class="videoRoom__messageInfo">
              <div class="videoRoom__sender">
                <p class="text-black dark:text-white">Taha Lechgar</p>
                <small class="text-black dark:text-white" style="color: #606060">4:22:46 PM</small>
              </div>
              <div class="videoRoom__messageBody text-black dark:text-white">
                Has resumed the video.
              </div>
            </div>

          </div>
          <input type="text" class="videoRoom__sendMessage" placeholder="Type a message ">
        </div>
      </div>

    </div>
  </div>



</template>



<style lang="scss" scoped>

@use '../sass/base';

.container {
  @include base.flexColumn(center, center);
}

.newRoom {
  margin-top: 3rem;
  @include base.flexRow(center, center);
  width: 90%;
  &__inputs {
    @include base.flexColumn(flex-start, center);
    width: 100%;
  }

  &__searchVid {
    background-color: #c4c4c4;
    width: 100%;
    border-radius: 10px;
    outline: none;
    @include base.flexRow(center,  flex-start);
    input{
      width: 80%;
      border-radius: 10px;
      padding: 0.6rem 1rem;
      margin: 0.6rem 2rem;
    }
  }

  &__users {
    width: 41%;
  }

  &__upload {
    margin-top: 1rem;
    @include base.flexRow(center, center);
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    img{
      width: 25px;
      margin-right: 0.5rem;
      height: auto;
    }
  }
}

.videoRoom {
  width: 100%;
  margin-top: 1rem;
  height: 500px;
  @include base.flexRow(center, space-between);

  &__video {
    background-color: black;
    min-width: 70% !important;
    padding: 1rem 2rem;
  }

  &__chatPanel {
    width: 100%;
    @include base.flexColumn(center, center);
    height: 100%;
  }

  &__settings{
    background-color: base.$main;
    width: 90%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 50px;
    padding-left: 5px;
    @include base.flexRow(center, space-between);
    img {
      width: 50px;
    }
  }

  &__chat {
    background-color: rgba(123, 44, 191, 0.2);
    height: 100%;
    margin: 1rem 0 0.2rem 0;
    width: 90%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    @include base.flexColumn(center, flex-start)
  }

  &__message {
    width: 90%;
    height: 50px;
    margin-top: 1rem;
    @include base.flexRow(center, flex-start);
    img {
      margin-right: 0.5rem;
    }
  }
  &__messageInfo {
    height: 100%;
    @include base.flexColumn(flex-start, space-between)
  }
  &__sender {
    @include base.flexRow(center, center);
    p{
      font-weight: bold;
      margin-right: 1rem;
    }
  }

  &__messageBody {
    font-size: 0.8rem;
  }


  &__sendMessage {
    width: 90%;
    position: absolute;
    bottom: 5px;
    padding: 0.5rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

  }



}

</style>