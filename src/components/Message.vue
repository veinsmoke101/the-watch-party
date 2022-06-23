<template>
  <div class="videoRoom__message">
    <img :src="src" alt="message-sender">
    <div class="videoRoom__messageInfo">
      <div class="videoRoom__sender">
        <p class="flex flex-row text-black dark:text-white">
          {{ author }}
          <img v-if="premium" src="/src/assets/icons/premium.svg" alt="premium" class="videoRoom_premium"/>
        </p>
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
  src: String,
  premium: Boolean
})

const imgSrc = ref('/src/assets/images/' + props.src);

</script>

<style scoped>
.videoRoom_premium{
  width: 20px;
  height: 20px;
}
</style>