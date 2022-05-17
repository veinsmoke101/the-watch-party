<template>
  <div class="videoRoom__message">
    <img :src="imgSrc" alt="message-sender">
    <div class="videoRoom__messageInfo">
      <div class="videoRoom__sender">
        <p class="text-black dark:text-white">{{ author }}</p>
        <small class="text-black dark:text-white" style="color: #606060">{{ added_at }}</small>
      </div>
      <div class="videoRoom__messageBody text-black dark:text-white">
        {{ body }}
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
  author: String,
  added_at: String,
  body: String,
  src: String
})

const imgSrc = ref('/src/assets/images/' + props.src);

</script>

<style scoped>

</style>