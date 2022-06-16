<script setup>

// modals
import UsersModal from "../../components/modals/UsersModal.vue"
import Message from "../Message.vue"

// utilities
import { VuemojiPicker } from 'vuemoji-picker'
import insertText from 'https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js'
import {ref, computed, onMounted, onUpdated, inject} from "vue";
import { useStore } from "vuex";
import { getCurrentTime } from "../../js/getCurrentTime";
import axios from "axios";
import router from "../../router";


const store = useStore()
const dark = computed(() => store.getters.dark)
const messages = computed(() => store.getters.messages)
const roomUsersCount = computed(() => store.getters.roomUsersCount)
const roomRef = computed(() => store.getters.roomRef)
const addMessage = (message) => store.commit('addMessage', message)

const setRoomUsersCount = (count) => store.commit('setRoomUsersCount', count)


// modals states
const isUsersOpen = ref(false)
const isSettingOpen = ref(false)
const isEmojiOpen = ref(false)
const box = ref(null)

// add emoji to message input
const messageInput = ref(null)

const handleEmojiClick = (detail) => {
  insertText(messageInput.value, detail.unicode)
  window.console.log(detail)
}

const reRender    = ref(0)
const messageBody = ref('')



const leaveRoom = inject("leaveRoom")

const leaveParty = async () => {
  await leaveRoom()
  router.push({ name: 'Main' })
}


onMounted(() => {
  let joinedMessage = {
    id: localStorage.getItem('userId'),
    src: localStorage.getItem('profileImage'),
    author: localStorage.getItem('username'),
    added_at: getCurrentTime(),
    body: 'Joined the party!',
    premium: localStorage.getItem('premium')
  }

  let data = {
    roomRef: store.getters.roomRef,
    message: JSON.stringify(joinedMessage)
  }

  axios.post("http://localhost:8080/new/message", data)
      .then((response) => console.log("response :" + response))
      .catch((error) => console.log("error :" + error));

  let newData = {
    room_ref: roomRef.value,
    count:  true
  }

  // get current room users count
  axios.post("http://localhost:8080/room/current/users", newData)
      .then(response => {
        setRoomUsersCount(response.data.data)
      })
      .catch(response => console.log(response))
})



onUpdated( () => {
  box.value.scrollTop = box.value.scrollHeight;
})


const handleMessageSubmit = (event) => {
  event.preventDefault()

  if(messageBody.value === '') return

  let newMessage = {
    id: localStorage.getItem('userId'),
    src: localStorage.getItem('profileImage'),
    author: localStorage.getItem('username'),
    added_at: getCurrentTime(),
    body: messageBody.value,
    premium: localStorage.getItem('premium')

  }
  messageBody.value = ''

  //message to send other users
  let messageData = {
    roomRef: store.getters.roomRef,
    message: JSON.stringify(newMessage)
  }

  // addMessage(data)
  axios.post("http://localhost:8080/new/message", messageData)
      .then((response) => console.log("response :" + response))
      .catch((error) => console.log("error :" + error));

  // box.value.scrollTop = box.value.scrollHeight ;
  // messageInput.value.scrollIntoView({behavior: "smooth"})

}



</script>

<template>
  <UsersModal
      @close="isUsersOpen = false"
      v-if="isUsersOpen"
  />

  <div class="videoRoom__chatPanel">
    <div class="videoRoom__settings">
      <p class="text-white">{{ roomUsersCount }} users watching</p>
      <img @click="isSettingOpen = !isSettingOpen" src="@/assets/icons/view-more.svg" alt="settings-icon">
      <div v-show="isSettingOpen" class="videoRoom__settingMenu">
        <div class="menuWrapper">
          <img src="@/assets/icons/arrow-head.svg" alt="arrow">
          <div @click="isUsersOpen = true" class="element">manage users</div>
          <div @click="leaveParty" class="element">leave the party</div>
        </div>
      </div>
    </div>


    <div class="videoRoom__chat" ref="box" >

      <Message
          v-for = "message in messages"
          :key="message.id"
          :src = "message.src"
          :author = "message.author"
          :added_at = "message.added_at"
          :body = "message.body"
          :premium="(message.premium === '1')"
      />
    </div>
    <div  class="videoRoom__sendMessage">
      <form action="" @submit="handleMessageSubmit" style="width: 100%">
        <input v-model="messageBody" ref="messageInput" type="text" class="videoRoom__messageInput" placeholder="Type a message ">
      </form>
      <img @click="isEmojiOpen = !isEmojiOpen" src="@/assets/icons/emoji.svg" alt="emoji">
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
@use '../../sass/base';


emoji-picker.dark {
  --background: rgb(15 23 42);
  --emoji-size: 1rem;
}
//.emojiWrapper{
//  position: relative;
//  bottom: 0;
//  width: 100%;
//}
emoji-picker {
  width: 100%;
  @include base.tablet(){
    height: 350px;
  }
}
</style>