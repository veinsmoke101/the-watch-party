<template>
  <div class="userModal__userInfo">
    <img class="profile" :src="src+user.image" alt="user-profile">
    <p class="userModal__username text-black dark:text-white">
      {{ user.username }} {{user.id === hostId ? " (host)" : ""}}
    </p>
    <img v-if="host" @click="isDeleteOpen = true" class="manage" src="../../assets/icons/delete.svg" alt="manage">
    <div v-if="isDeleteOpen" class="userModal__deleteConfirm shadow-2xl bg-slate-200 dark:bg-gray-700">
      <p class="text-black dark:text-white">You sure want to kick this user from the party ??</p>
      <div class="buttons">
        <button @click="handleKick" class="button button--confirm">Delete</button>
        <button @click="isDeleteOpen = false" class="button button--cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useStore} from "vuex";
import {computed, ref} from "vue";
import axios from "axios";


const props = defineProps({
  user: Object
})


const store = useStore()
const roomRef = computed(() => store.getters.roomRef)
const host = computed(() => store.getters.host)
const hostId = computed(() => store.getters.hostId)

const src = "/src/assets/images/"
const isDeleteOpen = ref(false)

let data = {
  roomRef: roomRef.value,
  userId: localStorage.getItem('userId'),
  userToKick: props.user.id
}

const handleKick = () => {
  axios.post('http://localhost:8080/kick/user', data, {withCredentials: true})
      .then((response) => console.log(response))
      .catch((response) => console.log(response))
  isDeleteOpen.value = false
}

</script>

<style scoped>

</style>