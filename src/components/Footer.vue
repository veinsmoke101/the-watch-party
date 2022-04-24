<script setup>
import {computed} from 'vue'
import { useStore } from "vuex";
import lightLogo from '../assets/icons/the-watch-party-logo-light.png'
import darkLogo from '../assets/icons/the-watch-party-logo-dark.png'
import lightFacebook from '../assets/images/facebook.svg'
import darkFacebook from '../assets/images/facebook-dark.svg'
import lightInstagram from '../assets/images/instagram.svg'
import darkInstagram from '../assets/images/instragram-dark.svg'
import lightTwitter from '../assets/images/twitter.svg'
import darkTwitter from '../assets/images/twitter-dark.svg'
import lightGithub from '../assets/images/github.svg'
import darkGithub from '../assets/images/github-dark.svg'

const store = useStore()
const logo = computed(() => store.getters.dark ? darkLogo : lightLogo)
const facebook = computed(() => store.getters.dark ? darkFacebook : lightFacebook)
const twitter = computed(() => store.getters.dark ? darkTwitter : lightTwitter)
const github = computed(() => store.getters.dark ? darkGithub : lightGithub)
const instagram = computed(() => store.getters.dark ? darkInstagram : lightInstagram)
</script>

<template>
  <footer class="footer">
    <div class="footer__info">

      <div class="footer__logo">
        <img :src="logo" alt="" class="footer__logo">
      </div>

      <div class="footer__links">

        <a href="#" class="footer__link text-black dark:text-white">Terms</a>
        <a href="#" class="footer__link text-black dark:text-white">Privacy</a>
        <a href="#" class="footer__link text-black dark:text-white">FAQ</a>

      </div>

      <div class="footer__socials">
        <div class="footer__social"><a href=""><img :src="github" alt="github"></a></div>
        <div class="footer__social"><a href=""><img :src="instagram" alt="instagram"></a></div>
        <div class="footer__social"><a href=""><img :src="facebook" alt="facebook"></a></div>
        <div class="footer__social footer__social--twitter"><a href=""><img :src="twitter" alt="twitter"></a></div>
      </div>
    </div>
    <div class="footer__copyright">
      <small> &copy 2022 TheWatchParty’s Team. All rights reserved</small>
    </div>
  </footer>
</template>



<style lang="scss" scoped>
@use '../sass/base';

.footer {
  width: 100%;
  position: relative;
  @include base.flexColumn(center, center);
  &__info {
    margin: 2.5rem 0;
    width: 90%;
    @include base.flexRow(center, space-between);
    @include base.phone{
      flex-direction: column;
    }
  }
  &__logo {
    width: 20%;
    @include base.large-tablet{
      width: 30%;
    }
    @include base.phone{
      width: 60%;
      margin: 1rem 0;
      @include base.flexRow(center, center)
    }
    img{
      width: 10rem;
      min-width: 75px;

    }
  }

  &__links {
    width: 20%;
    font-weight: bold;
    @include base.flexRow(center, space-between);
    @include base.large-tablet{
      width: 30%;
    }
    @include base.phone{
      width: 60%;
      margin: 1rem 0;
    }
  }

  &__socials {
    @include base.flexRow(center, space-between);
    width: 20%;
    @include base.large-tablet{
      width: 30%;
    }
    @include base.phone{
      width: 60%;
      margin: 1rem 0;
    }
  }
  &__social a img{
    width: 2rem;
  }
  &__social--twitter a img{
    width: 2.5rem;
  }
  &__copyright {
    color: #c4c4c4;
    position: absolute;
    bottom: 0;
  }
}
</style>