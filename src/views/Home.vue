<script setup>
import Footer from '../components/Footer.vue'
import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import watchLight from "../assets/images/how-to-watch.svg"
import watchDark from "../assets/images/how-to-watch-dark.svg"
import syncLight from "../assets/images/sync.svg"
import syncDark from "../assets/images/sync-dark.svg"
import textLight from "../assets/images/text-chat.svg"
import textDark from "../assets/images/text-chat-dark.png"
import voiceLight from "../assets/images/voice-chat.svg"
import voiceDark from "../assets/images/voice-chat-dark.svg"
import uploadLight from "../assets/images/upload-file.svg"
import uploadDark from "../assets/images/upload-file-dark.svg"
import youtubeLight from "../assets/images/youtube.svg"
import youtubeDark from "../assets/images/youtube-dark.svg"





const store     = useStore()
const hoToWatch = computed(() => store.getters.dark ? watchDark : watchLight)
const sync      = computed(() => store.getters.dark ? syncDark : syncLight)
const text      = computed(() => store.getters.dark ? textDark : textLight)
const voice     = computed(() => store.getters.dark ? voiceDark : voiceLight)
const upload    = computed(() => store.getters.dark ? uploadDark : uploadLight)
const youtube   = computed(() => store.getters.dark ? youtubeDark : youtubeLight)

const setLogged = (bool) => store.commit('setLogged', bool)


onMounted(() => {
  setLogged(false)
})



</script>


<template>
  <main class="container bg-gradient-to-t from-purple-700 via-purple-500 to-purple dark:from-purple-700 dark:to-blue-gray-900">
    <div class="main">
      <h1 class="main__title text-white drop-shadow-2xl">
        The easiest way to make a watch party
      </h1>
      <p class="main__description">
        Watch a synchronized movie, song or any video with friends and react in real time now with the watch party
      </p>
      <div class="main__buttons">
        <a class="main__button main__button--white" href="#">Get Started</a>
        <a class="main__button main__button--transparent" href="#">Get Started</a>
      </div>
    </div>
  </main>
  <section class="room-page bg-gradient-to-b from-purple-700 via-purple-500 to-blue-gray-900 dark:from-purple-700 dark:to-blue-gray-900">
    <img src="../assets/images/TWP.PNG" alt="">
  </section>

  <section class="howToWatch">
    <div class="howToWatch__container">
      <div class="howToWatch__info">
        <h3 class="howToWatch__header">
          How to watch ?
        </h3>
        <p class="howToWatch__paragraph text-black dark:text-white">
          Just create your account and create a room, then share the link with your friends.<br>
          Pretty simple Huh ?
        </p>
      </div>
      <div class="howToWatch__illustration">
        <img :src="hoToWatch" alt="how-to-watch">
      </div>
    </div>
  </section>

  <section class="noAds">
    <h3 class="noAds__header">
      No ads or third parties
    </h3>
    <h2 class="noAds__header2 text-black dark:text-white">
      Very Fast <br>
      Very Effective
    </h2>
    <p class="noAds__paragraph text-black dark:text-white">
      Wacth a synchronized movie, song or any video with friends and react in real time now with the watch party
    </p>
  </section>

  <section class="features">
    <h3 class="features__header" >
      Features
    </h3>
    <div class="features__cards">
      <div class="features__card">
        <img :src="sync" alt="">
        <p class="text-black dark:text-white">
          Watch videos synchronisly with your friends
        </p>
      </div>
      <div class="features__card">
        <img :src="text" alt="">
        <p class="text-black dark:text-white">
          Support for Real-time text chat
        </p>
      </div>
      <div class="features__card">
        <img :src="voice" alt="">
        <p class="text-black dark:text-white">
          Support for Real-time voice chat
        </p>
      </div>
    </div>
  </section>

  <section class="waysToWatch">
    <h3 class="waysToWatch__header" >
        Available ways to watch
    </h3>
    <div class="waysToWatch__cards">
      <div class="waysToWatch__card">
        <img :src="upload" alt="">
        <p class="text-black dark:text-white">
          Upload your own file
        </p>
      </div>
      <div class="waysToWatch__card">
        <img :src="youtube" alt="">
        <p class="text-black dark:text-white">
          Watch youtube videos
        </p>
      </div>

    </div>
  </section>

  <section class="join">
    <div class="custom-shape-divider-top-1650680876">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path class="fill-white dark:fill-gray-900" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" ></path>
      </svg>
    </div>
    <div class="join__container">
      <img class="join__illustration" src="../assets/images/home-cinema.svg" alt="home-cinema">
      <div class="join__info">
        <p class="join__paragraph">
          What are you waiting for ? <br>
          pick something to watch and call the homies
        </p>
        <a href="" class="join__button">New Room</a>
      </div>
    </div>
  </section>

  <Footer />

</template>



<style lang="scss" scoped>
@use '../sass/base';

.container{
  min-width: 100%;
  @include base.flexRow(center, center);
}
.main {
  width: 80%;
  min-height: 90vh;
  @include base.flexColumn(center, center);
  gap: 20px;
  &__title {
    text-shadow: 0 2px 12px rgba(103,77,77,0.45);
    font-size: 4rem;
    font-family: base.$montserrat;
    color:#ffffffee;
    @include base.tablet{
      //font-size: 3rem;
    }
  }
  &__description {
    font-size: 1.2rem;
    width: 80%;
    color: base.$white;
  }
  &__button{
    display: inline-block;
    text-decoration: none;
    padding: 0.5rem 2rem;
    background-color: base.$white;
    color: base.$main;
    border-radius: 20px;
    margin: 0 3rem;
    transform:translateY(0);
    transition:transform 0.5s ease 0s;

    &:hover{
      transform: translateY(-10%);
      transition:transform 0.5s ease 0s;
    }
    &--transparent{
      border: 0.1rem solid white;
      color: white;
      background-color: transparent;
    }
    @include base.phone{
      margin: 0 0.5rem;
      padding: 0.5rem 1.5rem;

    }

  }
  @include base.phone{
    width: 95%;
    min-height: 65vh;
    justify-content: center;
  }
}
.room-page {
  width: 100%;
  @include base.flexColumn(center,center);
  img{
    width: 80%;
    height: auto;
    @include base.phone{
      width: 95%;
    }
  }

}

.howToWatch{
  margin: 5rem 0;
  width: 100%;
  @include base.flexColumn(center, center);
  &__container{
    width: 80%;
    @include base.flexRow(space-evenly, center);
    @include base.phone{
      flex-direction: column;
    }
  }
  &__info {
    width:45%;
    @include base.flexColumn(center, flex-start);
    @include base.phone{
      width: 100%;
      margin-bottom: 4rem;
    }
  }
  &__paragraph{
    font-size: 1.2rem;
    width: 90%;
  }
  &__header {
    color: base.$main;
    font-size:1.5rem ;
    font-weight: bold;
  }

  &__illustration {
    width: 50%;
    @include base.flexRow(center, center);
    @include base.phone{
      width: 100%;
    }
   img{
     width: 250px;
     min-width: 200px;
   }
  }

}

.noAds {
  margin: 5rem 0;
  width: 100%;
  @include base.flexColumn(center, center);
  &__paragraph{
    font-size: 1.2rem;
    width: 40%;
    @include base.tablet{
      width: 60%;
      margin-top: 2rem ;
    }
    @include base.phone{
      width:80%;
    }
  }

  &__header {
    color: base.$main;
    font-size:1.5rem ;
    font-weight: bold;
  }

  &__header2 {
    font-size: 2rem;
    font-family: base.$montserrat;
    font-weight: bold;
  }
}

.features,.waysToWatch {
  margin: 5rem 0;
  @include base.flexColumn(center, space-around);
  width: 100%;

  &__header {
    color: base.$main;
    font-size:1.5rem ;
    font-weight: bold;
    margin-bottom: 3rem ;
  }

  &__cards {
    width: 80%;
    @include base.flexRow(center, space-evenly);
    @include base.phone{
      flex-direction: column;
    }
  }
  &__card {
    width: 33%;
     @include base.flexColumn(center, center);
    img{
      width: 80px;
      height: auto;
      margin-bottom: 1rem;
    }
    p{
      width: 70%;
    }
    @include base.phone{
      width: 100%;
      margin-bottom: 2rem ;
    }
  }
  .waysToWatch__card {
    width: 50%;
    @include base.phone{
      width: 100%;
    }
  }
}

.join{
  width: 100%;
  background-color: base.$main;
  @include base.flexColumn(center, center);
  position: relative;
  &__wave {
    width: 100%;
  }

  &__container {
    margin: 5rem;
    width: 80%;
    @include base.flexRow(center, space-between);
    @include base.tablet{
      width: 100%;
      flex-direction: column;
    }
  }
  &__illustration{
    max-width: 300px;
    @include base.phone{
      width: 150px;
    }

  }

  &__info{

    color: base.$white;
    @include base.flexColumn(flex-start, space-around);
    height: 180px;
    @include base.tablet{
      align-items: center;
    }

  }
  &__paragraph{
    text-align: start;
    font-size: 1.2rem;
    @include base.tablet{
      text-align: center;
    }
  }
  &__button {
    display: inline-block;
    text-decoration: none;
    padding: 0.5rem 2rem;
    background-color: base.$white;
    color: base.$main;
    border-radius: 20px;

  }

  .custom-shape-divider-top-1650680876 {
    position: absolute;
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
</style>