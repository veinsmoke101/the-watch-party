<script setup>
 import Footer from "../components/Footer.vue"
 import {useStore} from "vuex";
 import {computed, onMounted, ref} from "vue"
 import illustrationLight from "../assets/images/new-room.svg"
 import illustrationDark from "../assets/images/new-room-dark.svg"
 import router from "../router";
 import axios from "axios";

 const store = useStore()

 const roomId = ref("")
 const roomError = computed(() => store.getters.roomError)

 const illustration = computed( () => store.getters.dark ? illustrationDark : illustrationLight )
 const setRoomId = (roomId) => store.commit('setRoomId', roomId)
 const setRoomRef = (roomRef) => store.commit('setRoomRef', roomRef)
 const setLogged = (bool) => store.commit('setLogged', bool)
 const setRoomError = (roomError) => store.commit('setRoomError', roomError)
 const setHost = (bool) => store.commit('setHost', bool)


 onMounted(() => {
   setLogged(true)
 })

 const handleNewRoom = () => {

   let data = {
     title  : 'another beautiful room',
     author : localStorage.getItem('userId')
   }

   axios.post("http://localhost:8080/new/room",data, {withCredentials: true})
   .then((response) => {
     let res = response.data.data
     console.log(res.id)
     setRoomId(res.id)
     setRoomRef(res.unique_reference)
     setHost(true)
     router.push('/room/' + res.unique_reference)
   }).catch((response) => {
     let res = response?.response?.data
     console.log(res?.message)
     if(res?.message !== "user not authorized"){
       localStorage.removeItem('userId')
       router.push('/login')
     }

   })


 }

 const handleJoinRoom = (e) => {
   e.preventDefault()
   if(roomId.value === ""){
     setRoomError("Enter a room ID")
     return
   }
   router.push('/room/' + roomId.value)
 }


</script>


<template>
  <section class="newRoom">
    <div class="newRoom__container">
      <div class="newRoom__info">
        <h3 class="newRoom__header text-black dark:text-white">
          What are you waiting for?
        </h3>
        <p class="newRoom__small text-black dark:text-white">
          create a room and get started
        </p>
        <button @click="handleNewRoom" class="newRoom__button">
          New Room
          <img src="../assets/icons/new-icon.svg" alt="new-room">
        </button>
        <p class="newRoom__small text-black dark:text-white">
          or join an existing room
        </p>
        <form @submit="handleJoinRoom" action="">
          <input class="newRoom__input" v-model="roomId" placeholder="Room ID"/>
        </form>
        <div class="font-bold text-red-600">{{roomError}}</div>


      </div>
      <div class="newRoom__illustration">
        <img :src="illustration" alt="illustration">
      </div>
    </div>
  </section>
<Footer />
</template>



<style lang="scss" scoped>
@use "../sass/base";

form{
  width: 80%;
}
.newRoom {
  width: 100%;
  height: 91vh;
  @include base.flexRow(center, center);
  background-color: rgba(122, 44, 191, 0.1);
  &__container {
    width: 80%;
    height: 70%;
    @include base.flexRow(center, center);
    @include base.tablet{
      flex-direction: column;
    }
  }
  &__info {
    width: 50%;
    height: 100%;
    @include base.flexColumn(flex-start, center);
    gap: 5%;
    @include base.tablet{
      flex-direction: column;
      width: 100%;
      order: 2;
    }

  }

  &__header {
    font-size: 2rem;
    font-weight: bold;
    text-align: start;
  }

  &__button {
    font-weight: bold;
    padding: 1rem 2rem ;
    width: 80%;
    @include base.flexRow(center, space-between);
    color: base.$white;
    background-color: base.$main;
    border-radius: 5px;
    @include base.tablet{
      width: 100%;
    }
    img{
      width: 25px;
    }
  }

  &__input {

    padding: 1rem 2rem ;
    width: 100%;
    color: black;
    background-color: base.$white;
    border-radius: 5px;
    border: 2px solid #c4c4c4;
    outline: none;
    @include base.tablet{
      width: 100%;
    }
  }

  &__illustration {
    width: 50%;
    @include base.tablet{
      flex-direction: column;
      width: 100%;
      order: 1;
    }
    img {
      min-width: 350px;
      @include base.tablet{
        width: 100%;
        min-width: 250px;
      }
    }
  }
}

</style>