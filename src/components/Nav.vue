<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
import {computed, onMounted, ref} from 'vue'
import { useStore } from "vuex";
import lightLogo from '../assets/icons/the-watch-party-logo-light.png'
import darkLogo from '../assets/icons/the-watch-party-logo-dark.png'
import router from "../router";

// vuex states
const store = useStore()


// states
const logo = computed(() => store.getters.dark ? darkLogo : lightLogo)
const logged = computed(() => store.getters.logged )

const username = computed(() => store.getters.username)
const isActive = ref(false)

const dropdown = ref(false)



onMounted(() => {
  window.onresize = () => {
    if (window.innerWidth >= 480){
      isActive.value = false;
    }}


})


const handleNavToggle = () => {
  isActive.value = !isActive.value
}

const handleLogout = () => {

  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('profileImage')
  localStorage.removeItem('email')

  router.push('/login')

}
</script>

<template>

  <nav class="nav bg-white dark:bg-gray-900" >
    <div class="nav__container">
      <div class="nav__logo">
        <img :src="logo" alt="watch-party-logo">
      </div>
      <ul class="nav__links" :class="{'active': isActive, 'bg-white dark:bg-gray-900': isActive }">
        <li class="nav__item">
          <DarkModeToggle />
        </li>

        <li v-if="logged" class="nav__item relative text-black dark:text-white mx-9 flex align-center flex-row">{{ username }}
          <svg v-if="!isActive" @click="dropdown=!dropdown" xmlns="http://www.w3.org/2000/svg" width="33" height="18" viewBox="0 0 33 18" class="user-more mt-1 mx-2 fill-gray-800 dark:fill-white">
            <path d="M15.2315 16.5261L0.945369 3.2364C0.542145 2.8613 0.338867 2.4149 0.338867 1.9003C0.338867 1.3857 0.542145 0.939301 0.945369 0.5642C1.34859 0.1891 1.82846 0 2.38165 0L30.9572 0C31.5104 0 31.9903 0.1891 32.3935 0.5642C32.7967 0.939301 33 1.3857 33 1.9003C33 2.4149 32.7967 2.8582 32.3935 3.2364L18.1074 16.5261C17.7042 16.9012 17.2243 17.0903 16.6711 17.0903C16.1179 17.0903 15.638 16.9043 15.2315 16.5261Z" />
          </svg>
          <ul v-if="dropdown" class="py-1 divide-y bg-white border dark:bg-gray-800  border-gray-200 nav__dropdown">
            <li>
              <router-link to="/profile" href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</router-link>
            </li>
            <li>
              <router-link to="/main" href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Main</router-link>
            </li>
            <li>
              <router-link to="/contact" href="#" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Contact</router-link>
            </li>
            <li >
              <router-link to="" href="#" @click="handleLogout"  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</router-link>
            </li>

          </ul>
        </li>

        <li v-if="logged && isActive" class="nav__item "><router-link class="text-black dark:text-white" to="/main">Main</router-link></li>
        <li v-if="logged && isActive" class="nav__item "><router-link class="text-black dark:text-white" to="/register">Contact</router-link></li>
        <li v-if="logged && isActive" @click="handleLogout" class="nav__item "><router-link class="text-black dark:text-white" to="">Logout</router-link></li>

        <li v-if="!logged" class="nav__item "><router-link class="text-black dark:text-white" to="/contact">Contact</router-link></li>
        <li v-if="!logged" class="nav__item "><router-link class="text-black dark:text-white" to="/register">Sign up</router-link></li>
        <li v-if="!logged"  class="nav__item "><router-link class="nav__item--button " to="/login">Login</router-link></li>
      </ul>
      <button class="hamburger" :class="{'is-active': isActive }" @click="handleNavToggle">
        <span class="bg-gray-900 dark:bg-white"></span>
        <span class="bg-gray-900 dark:bg-white"></span>
        <span class="bg-gray-900 dark:bg-white"></span>
      </button>
    </div>
  </nav>

</template>



<style lang="scss" scoped>
@use '../sass/base';

.user-more {
  width: 15px;
  height: 15px;

}

.nav {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  @include base.flexRow(center,center);

  &__dropdown{
    position: absolute;
    right: 5px;
    top: 2rem;
    border-radius: 5px;
  }

  &__container{
    width: 95%;
    @include base.flexRow(center,space-between);
  }
  &__logo{
    width: 10rem;
    min-width: 75px;
  }
  &__links {
    @include base.flexRow(center, space-between);
    &.active{
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      position: absolute;
      z-index: -1;
      height: auto;
      width: 100%;
      top: 0;
      left: 0;
      margin: 50px 0;
      .nav__item {
        margin:1rem 0;
      }
    }
    @include base.phone{
      display: none;
    }
  }

  .hamburger{
    display: none;
    position: relative;
    z-index: 1;
    user-select: none;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &.is-active span:nth-child(1){
      transform: translate(0px, -2px) rotate(45deg);
      background-color: base.$main;
    }
    &.is-active span:nth-child(2){
      opacity: 0;
      transform: translateX(15px);
    }
    &.is-active span:nth-child(3){
      transform: translate(-3px, 3px) rotate(-45deg);
      background-color: base.$main;
    }
    span{
      display: block;
      height: 4px;
      width: 33px;
      margin-bottom: 5px;
      position: relative;
      border-radius: 6px;
      z-index: 1;
      transform-origin: 0 0;
      transition: 0.4s;
    }
    @include base.phone {
      display: block;
    }
  }

  &__item {
    margin-left:2rem;
    &--button{
      background-color: white;
      color: base.$main;
      border: 1px solid base.$main;
      border-radius: 20px;
      padding: 0.2rem 1rem;
    }

  }

}


</style>