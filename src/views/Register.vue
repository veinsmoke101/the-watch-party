<template>
  <div class="wrapper" :class="theme">


    <section class="sideForm bg-white dark:bg-gray-900" >
      <div class="sideForm__container">
        <div class="sideForm__heading">
          <h3 class="sideForm__title dark:text-white">Sign up. </h3>
          <p class="sideForm__subTitle dark:text-white">My mom will be happy to have you with us</p>
        </div>
        <form @submit="handleSubmit" method="POST" action="" class="sideForm__form">
          <label class="sideForm__label dark:text-white" for="name">
            Enter your full name
          </label>
          <input name="name" id="name" v-model="username" type="text" class="sideForm__input sideForm__input--name dark:bg-gray-800 dark:text-white dark:border-gray-200" placeholder="fatBatman">


          <label class="sideForm__label dark:text-white" for="email">
            Enter your email address
          </label>
          <input name="email" v-model="email" id="email" type="email" class="sideForm__input sideForm__input--email dark:bg-gray-800 dark:text-white dark:border-gray-200" placeholder="name@example.com">


          <label class="sideForm__label dark:text-white" for="password">
            Enter your password
          </label>
          <input name="password" v-model="password" id="password" type="password" class="sideForm__input sideForm__input--password dark:bg-gray-800 dark:text-white dark:border-gray-200" placeholder="at least 8 characters">



          <label class="sideForm__label dark:text-white" for="password-confirm">
            Confirm password
          </label>
          <input name="password_confirmation" v-model="confirmPassword" id="password-confirm" type="password" class="sideForm__input sideForm__input--password dark:bg-gray-800 dark:text-white dark:border-gray-200" placeholder="confirm password">
          <span class="invalid-feedback" role="alert">
                        <strong> {{ error }} </strong>
                    </span>
          <input class="sideForm__submit" type="submit" name="submit" value="Register">
        </form>
        <hr>
        <p class="sideForm__register dark:text-white"> You don’t have an account ? <a href=""> Sign up now </a> </p>

      </div>

    </section>
     <section class="greeting">
      <h1 class="greeting__title" :style="{color: color}">Let's get the party started</h1>
      <img class="greeting__illustration" :src="illustration" alt="login-ils">
    </section>
  </div>

</template>

<script setup>
import { useStore } from "vuex";
import {computed, onMounted, ref} from "vue";
import illustrationLight from "../assets/images/new-room.svg"
import illustrationDark from "../assets/images/new-room-dark.svg"
import {onUnmounted} from "vue";
import axios from "axios";
import router from "../router";

const store  = useStore()

const color = computed(() => store.getters.dark ? 'white' : '#7B2CBF')
const illustration = computed(() => store.getters.dark ? illustrationDark : illustrationLight)
const theme = computed(() => store.getters.dark ? 'dark' : 'light')

const username        = ref('')
const email           = ref('')
const password        = ref('')
const confirmPassword = ref('')
const error           = ref('')

const setMargin = (bool) => store.commit('setMargin', bool)

const handleSubmit = (e) => {
  e.preventDefault()
  console.log("i am username : " + username.value);
  if(email.value === '' || password.value === '' || username.value === '' || confirmPassword.value === ''){
    error.value = 'Please fill all the fields before submitting!'
    return
  }
  if(password.value.length < 8 ){
    error.value = 'Password must contain at least 8 characters'
    return
  }
  if(password.value !== confirmPassword.value){
    error.value = 'Password confirmation does not match'
    return
  }

    let data = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    axios.post('http://localhost:8080/register', data)
        .then((response) => {
          let data = response.data
          console.log(data)
          if(data.status === 'error'){
            error.value = data.message
            return
          }
          let userData = data.data
          localStorage.setItem('jwt', data.jwt)
          localStorage.setItem('userId', userData.id)
          localStorage.setItem('username', userData.username)
          localStorage.setItem('email', userData.email)
          localStorage.setItem('profileImage', userData.image)
          router.push('/main')
        })
        .catch((response) => {
          error.value = 'something went wrong!'
          console.log(response);
        })

}



onMounted(() => {
  setMargin(false)
})

onUnmounted(() => {
  setMargin(true)
})

</script>

<style lang="scss" scoped>
@use '../sass/base';


.wrapper {
  @include base.flexRow(center, center);
  font-size: 0.8rem ;
  width: 100vw;
  height: 100vh;

  &.light {
    background-color: rgba(123, 44, 191, 0.1);
  }
  &.dark {
    background-color: rgba(123, 44, 191, 0.3);
  }

}


.invalid-feedback {
  color: red;
}

.greeting {
  @include base.tablet() {
    display: none;
  }
  width: 70%;
  @include base.flexColumn(center, center);

  .greeting__illustration {
    width: 500px;
    height: auto;

  }

  .greeting__title {
    font-size: 64px;
    width: 95%;
    //color: base.$main;
    @include base.large-tablet {
      font-size: 52px;
    }
  }
  .greeting__span{
    font-size: 72px;
  }

}

.sideForm {

  width: 35%;
  height: auto;
  border-radius: 10px;
  margin:5% 0 10px 2%;
  padding-bottom: 10px;
  @include base.flexColumn(center, center);

  .sideForm__container {
    @include base.flexColumn(flex-start, center);
    width: 80%;
    height: 80%;

    .sideForm__form {
      @include base.flexColumn(flex-start, center);
      width: 100%;
      height: auto;

      .sideForm__input {
        margin-bottom: 10px;
        padding: 10px 20px;
        width: 100%;
        border: 1px solid #c1c1c1;
        outline: none;
      }

      .sideForm__label {
        margin: 5px 0;
      }

      .sideForm__forgotPassword {
        color: base.$main;
        margin: 10px 0;
        text-decoration: underline;
      }

      .sideForm__submit {
        margin-top: 20px ;
        width: 100%;
        padding: 6px 20px;
        background-color: base.$main;
        color: white;
        border-radius: 6px;
        border: none;
      }

    }

    hr {
      width: 100%;
      margin: 15px 0;
    }

    .sideForm__register a {
      color: base.$main;
      text-decoration: underline;
    }

    .sideForm__heading {
      @include base.flexColumn(flex-start, center);
      .sideForm__title {
        margin-top: 5px;
        font-size: 28px;
        font-weight: bolder;
        font-family: base.$montserrat;
      }

      .sideForm__subTitle {
        font-size: 12px;
        margin-bottom: 10px;
        color: #c1c1c1;
        text-align: start;
      }
    }
  }

  @include base.tablet {
    width: 100%;
    margin: 0;
    height: 100%;
  }
}

</style>