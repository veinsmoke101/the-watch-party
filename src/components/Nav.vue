<script setup>
import DarkModeToggle from './DarkModeToggle.vue'
import {computed, onMounted, ref} from 'vue'
import { useStore } from "vuex";
import lightLogo from '../assets/icons/the-watch-party-logo-light.png'
import darkLogo from '../assets/icons/the-watch-party-logo-dark.png'

// vuex states
const store = useStore()

// states
const logo = computed(() => store.getters.dark ? darkLogo : lightLogo)
const logged = computed(() => store.getters.logged )

const username = ref(localStorage.getItem('username'))
const isActive = ref(false)



onMounted(() => {
  window.onresize = () => {
    if (window.innerWidth >= 480){
      isActive.value = false;
    }}
})


const handleNavToggle = () => {
  isActive.value = !isActive.value
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

        <li v-if="logged" class="nav__item text-black dark:text-white mx-9 ">{{ username }}</li>
        <li v-if="logged" class="nav__item text-black dark:text-white mx-9 "><img src="" alt=""></li>
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

.nav {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  @include base.flexRow(center,center);
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
      height: 25vh;
      width: 100%;
      top: 0;
      left: 0;
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