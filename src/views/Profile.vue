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
          <button @click="openEditForm" class="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full">
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

  <form @submit.prevent="updateProfile" v-if="profileFormToggle" class="profile-edit absolute bg-white dark:bg-gray-800 p-12 h-96 shadow-2xl min-w-fit max-w-sm">
    <div class="md:flex md:items-center mb-12">
      <div class="md:w-1/3">
        <label  class="block text-gray-500 dark:text-gray-50 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
          Full Name
        </label>
      </div>
      <div class="md:w-2/3">
        <input v-model="newUsername" class="bg-gray-200 appearance-none border-2 border-gray-200 dark:border-gray-700 rounded w-full py-2 px-4 text-gray-700 dark:text-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" >
      </div>
    </div>
    <div class="md:flex md:items-center mb-12">
      <div class="md:w-1/3">
        <label class="block text-gray-500 dark:text-gray-50 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
          Profile
        </label>
      </div>
      <div class="md:w-2/3">
        <input @change="saveChanges" class="bg-gray-200 appearance-none border-2 border-gray-200 dark:border-gray-700 rounded w-full py-2 px-4 text-gray-700 dark:text-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="file">
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3"></div>
      <div class="md:w-2/3 flex flex-row justify-start">
        <button @click="updateProfile" class="shadow mr-6 bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white w-36 font-bold py-2  rounded" type="button">
          Save changes
        </button>
        <button @click="cancelChanges" class="shadow bg-red-600 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 w-36 rounded" type="button">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import {cloudinaryConfig} from "../js/constants";
import {toFormData} from "../js/helpers";


const store = useStore()

const src = "/src/assets/images/"+localStorage.getItem('profileImage')

const user = ref({
  username: localStorage.getItem('username'),
  profileImage: src
})

const profileFormToggle = ref(false)
const newUsername = ref('')
const newDescription = ref('')





const setMargin = (bool) => store.commit('setMargin', bool)
const setLogged = (bool) => store.commit('setLogged', bool)

const cloudinaryResponse = ref(null)


onMounted(async () => {
  setMargin(false)
  setLogged(true)

  const response = await axios.post("http://localhost:8080/cloudinary/signature")
  cloudinaryResponse.value = await response.data

})

const image = ref(null)

const saveChanges = (event) => {
  image.value = event.target.files[0]
}

const updateProfile = async () => {
  try{

    let newProfileData = {
      username: newUsername.value,
      description: newDescription.value
    }

    // prepare cloudinary data
    let cloudinaryData = {
      timestamp: cloudinaryResponse.value.timestamp,
      signature: cloudinaryResponse.value.signature,
      api_key: cloudinaryConfig.apiKey,
      file: image.value,
      folder: cloudinaryConfig.folder,
    };

    // prepare uploads
    const formData = toFormData(cloudinaryData);
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

    const imageData = await axios
        .post(url, formData)
        .then((res) => console.log(res.data))

    await axios.post('http://localhost:8080/profile/update', {
      ...newProfileData,
      images: imageData.public_id,
    });

  }catch (e) {
    console.log(e)
  }
}

const cancelChanges = () => {
  newUsername.value = ''
  profileFormToggle.value = false
}

const openEditForm = () => {
  newUsername.value = localStorage.getItem('username')
  profileFormToggle.value = true
}

</script>

<style scoped>

.profile-edit{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

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