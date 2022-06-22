<template>
      <Modal>
        <div class="Modal__contentWrapper bg-white dark:bg-gray-900">
          <div class="linkModal">
            <h3 class="linkModal__title dark:text-white">{{ title }}</h3>
<!--            <p class="linkModal__description dark:text-white">{{ description }}</p>-->
            <div class="linkModal__linkWrapper">
              <input type="text" class="linkModal__link text-gray-700 dark:text-white bg-white dark:bg-slate-700 border-2 border-gray-400 dark:border-slate-600" name="link" :value="link">
              <div class="relative">
                <button class="linkModal__button linkModal__button--copy" @click="handleClick">Copy</button>
                <div v-if="copiedFeedback" class="absolute bottom-8 right-0 bg-purple-100 rounded-lg py-2 px-2.5 mb-3 text-purple-700 inline-flex items-center " role="alert">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                  </svg>
                  Copied
                </div>
              </div>
            </div>
            <div class="linkModal__note bg-purple-100 bg-opacity-70 dark:text-white dark:bg-purple-800 dark:bg-opacity-20">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur eaque exercitationem iure iusto laudantium molestiae mollitia quos. Adipisci beatae consequuntur numquam officia quam quasi qui suscipit tempora voluptas voluptatum.

            </div>
            <button @click="$emit('close')"  class="linkModal__button bg-red-700">close</button>
          </div>

        </div>
      </Modal>

</template>

<script setup>
  import Modal from "../layouts/Modal.vue"
  import copyTextToClipboard from "../../js/copyToClipboard"
  import {ref} from "vue";


  const props = defineProps({
    title: String,
    link: String,
    description: String
  })

  defineEmits(["close"])

  const copiedFeedback = ref(false)

  const handleClick = () => {
    copyTextToClipboard(props.link)
    copiedFeedback.value = true
    setTimeout(() => copiedFeedback.value = false, 2000)
  }

</script>

<style lang="scss" scoped>
@use '../../sass/base';



.Modal__contentWrapper{
  width: 50%;
  height: auto;
  border-radius: 10px;
  padding: 3rem 2rem;
}

.linkModal {
  @include base.flexColumn(flex-start, center);
  gap: 20px;
  &__title {
    font-weight: bold;
  }
  &__description {
    font-size: 0.8rem;
    text-align: start;
  }

  &__linkWrapper {
    @include base.flexRow(center, center);
    width: 100%;
    gap: 10px;
  }
  &__link{
    //color: base.$main;
    outline: none;
    padding: 0.5rem;
    border-radius: 5px;
    flex-grow: 1;
    font-size: 0.8rem;
  }

  &__button {
    color: white;
    padding: 0.5rem 2rem;
    font-size: 0.9rem;
    border-radius: 5px;
    &--copy {
      background-color: base.$main;
    }
  }

  &__note {
    font-size: 0.8rem;
    font-style: italic;
    padding: 0.5rem;
    border-radius: 5px;
  }

}

</style>