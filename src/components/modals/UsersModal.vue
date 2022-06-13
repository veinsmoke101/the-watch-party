<script setup>
import { ref} from "vue";
import { useStore } from "vuex";

import Modal from "../layouts/Modal.vue"
import {computed} from "vue";



const store = useStore()

const src = "/src/assets/images/"
const currentUsers = computed(() => store.getters.currentUsers)
const host = computed(() => store.getters.host)
const hostId = computed(() => store.getters.hostId)

const isDeleteOpen = ref(false)


defineEmits(["close"])

</script>


<template>
  <Modal>

    <div class="Modal__contentWrapper bg-white dark:bg-gray-900">
      <div class="userModal divide-y divide-gray-200 dark:divide-gray-600">
        <h3 class="userModal__title dark:text-white">13 users watching</h3>
        <div v-for="user in currentUsers" :key="user.id" class="userModal__userInfo">
          <img class="profile" :src="src+user.image" alt="user-profile">
          <p class="userModal__username text-black dark:text-white">
            {{ user.username }} {{user.id === hostId ? " (host)" : ""}}
          </p>
          <img v-if="host" @click="isDeleteOpen = true" class="manage" src="../../assets/icons/delete.svg" alt="manage">
        </div>

        <div v-if="isDeleteOpen" class="userModal__deleteConfirm shadow-2xl bg-slate-200 dark:bg-gray-700">
          <p class="text-black dark:text-white">You sure want to kick this user from the party ??</p>
          <div class="buttons">
            <button @click="isDeleteOpen = false" class="button button--confirm">Delete</button>
            <button @click="isDeleteOpen = false" class="button button--cancel">Cancel</button>
          </div>
        </div>
        <button @click="$emit('close')"  class="userModal__button bg-red-700">close</button>
      </div>
    </div>


  </Modal>

</template>



<style lang="scss" scoped>
@use '../../sass/base';

.Modal__contentWrapper{
  width: 400px;
  height: auto;
  max-height: 60vh;
  border-radius: 10px;
  padding: 2rem;
}

.userModal {
  @include base.flexColumn(flex-start, center);
  position: relative;

  div:first-of-type {
    border-top: none;
  }


  &__userInfo {
    padding: 0.5rem 0;
    width: 100%;
    @include base.flexRow(center, flex-start);
    font-size: 0.8rem;
    position: relative;
    .manage {
      margin-left: auto;
      width: 20px;
      cursor:pointer;
    }
    .profile {
      width: 40px;
      margin-right: 5%;
      border-radius: 50%;
    }
  }

  &__deleteConfirm {
    position: absolute;
    right: 0;
    width: 300px;
    height: 120px;
    z-index: 12;
    padding: 1rem;
    border-radius: 5px;
    font-size: 0.9rem;
    @include base.flexColumn(center, space-between);
    .buttons {
      width: 80%;
      @include base.flexRow(center, space-around);
      .button {
        padding: 0.3rem 1rem;
        border-radius: 5px;
        &--confirm {
          background-color: red;
          color: white;
        }
        &--cancel {
          background-color: #c4c4c4;
        }
      }
    }
  }

  &__button {
    color: white;
    padding: 0.3rem 1rem;
    font-size: 0.9rem;
    border-radius: 5px;
    border: none;
  }
}


</style>