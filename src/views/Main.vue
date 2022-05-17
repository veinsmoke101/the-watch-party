<script setup>
 import Footer from "../components/Footer.vue"
 import {useStore} from "vuex";
 import {computed, onMounted} from "vue"
 import illustrationLight from "../assets/images/new-room.svg"
 import illustrationDark from "../assets/images/new-room-dark.svg"
 import router from "../router";

 const store = useStore()

 const illustration = computed( () => store.getters.dark ? illustrationDark : illustrationLight )
 const setNav = (bool) => store.commit('setNav', bool)
 const setRoomId = (roomId) => store.commit('setRoomId', roomId)
 const setRoomRef = (roomRef) => store.commit('setRoomRef', roomRef)



 onMounted(() => {
   setNav(true)


 })

 const handleNewRoom = () => {

  let data = new FormData()
   data.append('title', 'beautiful room')
   data.append('author', "1")

   fetch("http://localhost:8080/new/room", {
     method: "post",
     body: data,
   })
       .then(response => response.json())
       .then((response) => {
         if(response.status === "success")
             setRoomId(response.data.id)
             setRoomRef(response.data.unique_reference)
             router.push('/room/'+response.data.unique_reference)
           }
       )
       .catch((error) => console.log("error :" + error))
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
        <input class="newRoom__input" placeholder="Room ID"/>
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
    width: 80%;
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