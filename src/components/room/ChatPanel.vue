<script setup>

// modals
import UsersModal from "../../components/modals/UsersModal.vue"

// utilities
import { VuemojiPicker } from 'vuemoji-picker'
import insertText from 'https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js'
import { ref, computed } from "vue";
import { useStore } from "vuex";


const store = useStore()
const dark = computed(() => store.getters.dark)

// modals states
const isUsersOpen = ref(false)
const isSettingOpen = ref(false)
const isEmojiOpen = ref(false)

// add emoji to message input
const messageInput = ref(null)



const handleEmojiClick = (detail) => {
  insertText(messageInput.value, detail.unicode)
  window.console.log(detail)
}

const reRender = ref(0)
const setDark = (value) => store.commit('setDark', value)



</script>

<template>
  <UsersModal
      @close="isUsersOpen = false"
      v-if="isUsersOpen"
  />

  <div class="videoRoom__chatPanel">
    <div class="videoRoom__settings">
      <p class="text-white">13 users watching</p>
      <img @click="isSettingOpen = !isSettingOpen" src="../../assets/icons/view-more.svg" alt="settings-icon">
      <div v-show="isSettingOpen" class="videoRoom__settingMenu">
        <div class="menuWrapper">
          <img src="../../assets/icons/arrow-head.svg" alt="arrow">
          <div @click="isUsersOpen = true" class="element">manage users</div>
          <div class="element">leave the party</div>
        </div>

      </div>
    </div>

    <div class="videoRoom__chat">
      <div class="videoRoom__message">
        <img src="../../assets/images/profile-image.svg" alt="message-sender">
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

      <div class="videoRoom__message">
        <img src="../../assets/images/profile-image.svg" alt="message-sender">
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

      <div class="videoRoom__message">
        <img src="../../assets/images/profile-image.svg" alt="message-sender">
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
      <div class="videoRoom__sendMessage">
        <input ref="messageInput" type="text" class="videoRoom__messageInput" placeholder="Type a message ">
        <img @click="isEmojiOpen = !isEmojiOpen" src="../../assets/icons/emoji.svg" alt="emoji">
      </div>
      <div class="emojiWrapper">
        <VuemojiPicker
            v-if="isEmojiOpen"
            :isDark="dark"
            @emojiClick="handleEmojiClick"/>
      </div>
    </div>

  </div>

</template>



<style lang="scss">

emoji-picker.dark {
  --background: rgb(15 23 42);
}

emoji-picker {
  width: 100%;
}
</style>