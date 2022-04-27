<script setup>
import { useStore } from "vuex"
import {computed, ref} from "vue"
import Nav from "./components/Nav.vue"

const store  = useStore()
const dark = computed( () => store.getters.dark);
const videoOptions = ref(
    {
      techOrder: ["youtube"],
      sources: [
        {
          type: "video/youtube",
          src: "https://www.youtube.com/watch?v=CB5ZoHGeRU8",
        },
      ],
      youtube: { iv_load_policy: 1 },
    }
)

</script>

<template>
  <div :class="dark ? 'dark' : 'light'">
    <div
        id="app"
        class="bg-white dark:bg-gray-900"
    >
<!--      <router-link to="/main">main</router-link>-->
<!--      <router-link to="/">home</router-link>-->
      <Nav />
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
@use './sass/base';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 50px;
}
html{
  font-size: 16px;
  @include base.tablet{
    font-size: 14px;
  }

  @include base.phone{
    font-size: 12px;
  }
}
</style>
