<script setup>
import { useStore } from "vuex"
import { computed } from "vue"

const store  = useStore()
const dark = computed( () => store.getters.dark);

</script>

<template>
  <div :class="dark ? 'dark' : 'light'">
    <div
        id="app"
        class="bg-white dark:bg-gray-900"
    >
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
  @include base.tablet{
    font-size: 14px;
  }

  @include base.phone{
    font-size: 12px;
  }
}
</style>
