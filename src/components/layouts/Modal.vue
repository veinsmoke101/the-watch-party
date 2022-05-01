<template>
  <div class="Modal bg-black bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-60" >
    <slot />
  </div>
</template>

<script>
export default {
  name: "Modal"
}
</script>

<style lang="scss" scoped>


@use '../../sass/base';
body{
  position: relative !important;
}
.Modal {
  position: fixed;
  top: -100px;
  left: 0;
  right: 0;
  bottom: -122px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

}

</style>