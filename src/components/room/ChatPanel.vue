<script setup>

// modals
import UsersModal from "../../components/modals/UsersModal.vue"
import Message from "../Message.vue"

// utilities
import { VuemojiPicker } from 'vuemoji-picker'
import insertText from 'https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js'
import {ref, computed, onMounted} from "vue";
import { useStore } from "vuex";


const store = useStore()
const dark = computed(() => store.getters.dark)
const messages = computed(() => store.getters.messages)
const userId = computed(() => store.getters.userId)
const userName = computed(() => store.getters.userName)
const profileImage = computed(() => store.getters.profileImage)
const addMessage = (message) => store.commit('addMessage', message)

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
const messageBody = ref('')

const getCurrentTime = () => {
  let date = new Date()
  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  let seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}



onMounted(() => {
  let joinedMessage = {
    id: 1,
    src: profileImage,
    author: userName,
    added_at: getCurrentTime(),
    body: messageBody.value
  }
  addMessage(joinedMessage)

})

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

      <Message
          v-for = "message in messages"
          key="message.id"
          :src = "message.src"
          :author = "message.author"
          :added_at = "message.added_at"
          :body = "message.body"
      />

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