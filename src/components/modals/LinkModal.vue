<template>
  <div class="linkModal bg-black bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-60" >
      <div class="linkModal__contentWrapper bg-white dark:bg-gray-900">
        <h3 class="linkModal__title dark:text-white">{{ title }}</h3>
        <p class="linkModal__description dark:text-white">{{ description }}</p>
        <div class="linkModal__linkWrapper">
          <input type="text" class="linkModal__link text-gray-700 dark:text-white bg-white dark:bg-slate-700 border-2 border-gray-400 dark:border-slate-600" name="link" :value="link">
          <button class="linkModal__button linkModal__button--copy">Copy</button>

        </div>
        <div class="linkModal__note bg-purple-100 bg-opacity-70 dark:text-white dark:bg-purple-800 dark:bg-opacity-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur eaque exercitationem iure iusto laudantium molestiae mollitia quos. Adipisci beatae consequuntur numquam officia quam quasi qui suscipit tempora voluptas voluptatum.

        </div>
        <button @click="$emit('close')"  class="linkModal__button bg-red-700">close</button>
      </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    title: String,
    link: String,
    description: String
  })

  defineEmits(["close"])

</script>

<style lang="scss" >
@use '../../sass/base';
body{
  position: relative !important;
}
.linkModal {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  &__contentWrapper {
    position: relative;
    top: 10%;
    left: 27%;
    border-radius: 10px;
    padding: 3rem 2rem;
    width: 50%;
    @include base.flexColumn(flex-start, center);
    gap: 20px;
  }
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
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 5px;
    &--copy {
      background-color: base.$main;
      padding: 0.5rem;
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