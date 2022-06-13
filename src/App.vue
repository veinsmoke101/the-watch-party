<script setup>
import { useStore } from "vuex"
import {computed, onMounted} from "vue"
import Nav from "./components/Nav.vue"

const store  = useStore()
const dark = computed( () => store.getters.dark)
const margin = computed( () => store.getters.margin ? '50px' : '0')

onMounted(() => {

})


</script>

<template>
  <div class=".root" :class="dark ? 'dark' : 'light'">
    <div
        id="app"
        class="bg-white dark:bg-gray-900"
        :style="{marginTop: margin}"
    >

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
}
html{
  font-size: 14px;

  @include base.phone{
    font-size: 12px;
  }
}
</style>
