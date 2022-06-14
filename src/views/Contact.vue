<template>
<section class="contact">
  
  <div class="contact__backgroundUp">
    <div class="contact__container">
      <div class="contact__heading">WHAT’S ON YOUR MIND</div>
      <div class="contact__formSection">
        <img class="contact__icon" src="@/assets/icons/contact.svg" alt="contact_icon"/>
        <div class="contact__formContainer">
          <form action="" class="contact__form">
            <input type="text" class="contact__input" placeholder="Your name"/>
            <input type="text" class="contact__input" placeholder="Your email"/>
            <textarea rows="4" type="text" class="contact__input contact__input--textarea" placeholder="Write your message here ..."/>
            <input type="submit" class="contact__input contact__input--submit" value="Send message"/>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <div class="contact__backgroundDown">
    <div class="custom-shape-divider-top-1650680876">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" ></path>
      </svg>
    </div>
  </div>
</section>
</template>

<script setup>

import { onMounted} from "vue";
import {useStore} from "vuex";

const store = useStore()

const setMargin = (bool) => store.commit('setMargin', bool)


onMounted(() => {
  setMargin(false)
})

</script>

<style lang="scss" scoped>
@use "../sass/base";

.contact{
  margin-top: 50px;
  width: 100%;
  height:90vh;
  min-height:90vh;
  @include base.flexColumn(center, space-around);
  &__backgroundUp{
    height: 75%;
    width: 100%;
    background-color: rgba(122, 44, 191, 0.2);
  }

  &__heading {
    font-size: 3rem;
    font-weight: bold;
    color: base.$main;
    margin: 20px 0;
  }

  &__icon {
    width: 300px;
    height: 300px;
  }

  &__container {
    @include base.flexColumn(center, center);
    width: 100%;
  }

  &__formSection {
    height: auto;
    width: 100%;
    @include base.flexRow(center, space-evenly)
  }

  &__formContainer {
    position: relative;
    z-index: 1;
    height: 100%;
    width: 30%;
    @include base.flexRow(center, center)
  }

  &__form {
    width: 100%;
    @include base.flexColumn(center, center)
  }

  &__input {
    width: 100%;
    border: 2px solid #c1c1c1;
    border-radius: 20px;
    margin: 1rem 0;
    padding: 0.7rem;
    background-color: base.$white;
    outline: none;
    &:focus{
      border-color: base.$main;
    }
    &--submit {
      border: none;
      background-color: base.$main;
      color: base.$white;
    }
  }

  &__backgroundDown{
    width: 100%;
    height: 30%;
    position: relative;

    .custom-shape-divider-top-1650680876 {
      fill:rgba(122, 44, 191, 0.2);
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }

    .custom-shape-divider-top-1650680876 svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 99px;
    }

  }

}
</style>