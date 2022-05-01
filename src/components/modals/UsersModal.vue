<script setup>
import {computed} from "vue";
import { useStore } from "vuex";

import Modal from "../layouts/Modal.vue"
import viewMoreDark from "../../assets/icons/view-more.svg"
import viewMoreLight from "../../assets/icons/view-more-dark.svg"


const store = useStore()

const viewMore = computed(() => store.getters.dark ? viewMoreDark : viewMoreLight )

defineEmits(["close"])

</script>


<template>
  <Modal>

    <div class="Modal__contentWrapper bg-white dark:bg-gray-900">
      <div class="userModal divide-y divide-gray-200 dark:divide-gray-600">
        <h3 class="userModal__title dark:text-white">13 users watching</h3>
        <div class="userModal__userInfo">
          <img class="profile" src="../../assets/images/profile-image.svg" alt="user-profile">
          <p class="userModal__username text-black dark:text-white">Taha Lechgar</p>
          <img class="manage" :src="viewMore" alt="manage">
        </div>

        <div class="userModal__userInfo">
          <img class="profile" src="../../assets/images/profile-image.svg" alt="user-profile">
          <p class="userModal__username text-black dark:text-white">Taha Lechgar</p>
          <img class="manage" :src="viewMore" alt="manage">
        </div>

        <div class="userModal__userInfo">
          <img class="profile" src="../../assets/images/profile-image.svg" alt="user-profile">
          <p class="userModal__username text-black dark:text-white">Taha Lechgar</p>
          <img class="manage" :src="viewMore" alt="manage">
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


  div:first-of-type {
    border-top: none;
  }


  &__userInfo {
    padding: 0.5rem 0;
    width: 100%;
    @include base.flexRow(center, flex-start);
    font-size: 0.8rem;
    .manage {
      margin-left: auto;
      width: 35px;
      cursor:pointer;
    }
    .profile {
      width: 40px;
      margin-right: 5%;
      border-radius: 50%;
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