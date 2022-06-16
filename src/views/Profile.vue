<template>
  <div class="profile bg-purple-400 bg-opacity-10 font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover " >



  <div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-32 lg:my-0">

    <!--Main Col-->
    <div id="profile" class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white dark:bg-gray-900 opacity-75 mx-6 lg:mx-0">


      <div class="p-4 md:p-12 text-center lg:text-left">
        <!-- Image for mobile view-->
        <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-32 w-32 bg-cover bg-center" :style="{backgroundImage: `url('${user.profileImage}')`}"></div>

        <h1 class="text-3xl font-bold dark:text-white pt-8 lg:pt-0">{{user.username}}</h1>
        <div class="dark:text-white mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-500 opacity-25"></div>
        <p class="dark:text-white pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p>

        <div class="pt-12 pb-8">
          <button class="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full">
            Edit profile
          </button>
        </div>

        <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->

      </div>

    </div>

    <!--Img Col-->
    <div class="w-full lg:w-2/5">
      <!-- Big profile image for side bar (desktop) -->
      <img alt="profile-image" :src="src" class="profile-desktop rounded-none lg:rounded-lg shadow-2xl hidden lg:block">
      <!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->

    </div>


    <!-- Pin to top right corner -->
    <div class="absolute top-0 right-0 h-12 w-18 p-4">
      <button class="js-change-theme focus:outline-none">🌙</button>
    </div>

  </div>



  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useStore} from "vuex";


const store = useStore()

const src = "/src/assets/images/"+localStorage.getItem('profileImage')

const user = ref({
  username: localStorage.getItem('username'),
  profileImage: src
})

const setMargin = (bool) => store.commit('setMargin', bool)
const setLogged = (bool) => store.commit('setLogged', bool)

onMounted(() => {
  setMargin(false)
  setLogged(true)

})

</script>

<style scoped>
.profile{
  background-color: rgba(122, 44, 191, 0.2);
  height:100vh;
}

.profile-desktop{
  width: 500px;
  height: 296px;
  border-radius: 0 5px 5px 0;

}
</style>