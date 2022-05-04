<template>
  <div class="wrapper" :class="theme">


    <section class="sideForm bg-white dark:bg-gray-900" >
      <div class="sideForm__container">
        <div class="sideForm__heading">
          <h3 class="sideForm__title dark:text-white">Sign up. </h3>
          <p class="sideForm__subTitle dark:text-white">My mom will be happy to have you with us</p>
        </div>
        <form method="POST" action="" class="sideForm__form">
          <label class="sideForm__label dark:text-white" for="name">
            Enter your full name
          </label>
          <input name="name" id="name" required value="name"  type="text" class="sideForm__input sideForm__input--name " placeholder="name@example.com">
          <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>

          <label class="sideForm__label dark:text-white" for="email">
            Enter your email address
          </label>
          <input name="email" id="email" required value=""  type="email" class="sideForm__input sideForm__input--email " placeholder="name@example.com">

          <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>

          <label class="sideForm__label dark:text-white" for="password">
            Enter your password
          </label>
          <input name="password" id="password" required type="password" class="sideForm__input sideForm__input--password " placeholder="at least 8 characters">

          <span class="invalid-feedback" role="alert">
                        <strong> message </strong>
                    </span>

          <label class="sideForm__label dark:text-white" for="password-confirm">
            Confirm password
          </label>
          <input name="password_confirmation" id="password-confirm" required type="password" class="sideForm__input sideForm__input--password" placeholder="confirm password">

          <input class="sideForm__submit" type="submit" name="submit" value="Register">
        </form>
        <hr>
        <p class="sideForm__register dark:text-white"> You don’t have an account ? <a href=""> Sign up now </a> </p>

      </div>

    </section>
    <section class="greeting">
      <h1 class="greeting__title">Work <span class="greeting__span text-gray-700 dark:text-white">Hard !</span> </h1>
      <h1 class="greeting__title"><span class="greeting__span text-gray-700 dark:text-white"> Play </span>Hard !</h1>
      <img class="greeting__illustration" :src="illustration" alt="login-ils">
    </section>
  </div>

</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import illustrationLight from "../assets/images/new-room.svg"
import illustrationDark from "../assets/images/new-room-dark.svg"

const store  = useStore()

const color = computed(() => store.getters.dark ? 'white' : '#7B2CBF')
const illustration = computed(() => store.getters.dark ? illustrationDark : illustrationLight)
const theme = computed(() => store.getters.dark ? 'dark' : 'light')
const setNavBg = (bool) => store.commit('setNavBg', bool)

onMounted(() => {
  setNavBg(false)
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
  display: none;
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
    font-size: 72px;
    color: base.$main;
    @include base.large-tablet {
      font-size: 52px;
    }
  }
  .greeting__span{
    font-size: 72px;
  }

}

.sideForm {
  width: 30%;
  height: 100%;
  @include base.flexColumn(center, center);

  .sideForm__container {
    @include base.flexColumn(flex-start, center);
    width: 80%;
    margin-top: 10%;
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
      }

      .sideForm__label {
        margin: 10px 0;
      }

      .sideForm__forgotPassword {
        color: base.$main;
        margin: 20px 0;
        text-decoration: underline;
      }

      .sideForm__submit {
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
      margin: 30px 0;

    }

    .sideForm__register a {
      color: base.$main;
      text-decoration: underline;
    }

    .sideForm__heading {
      @include base.flexColumn(flex-start, center);
      .sideForm__title {
        font-size: 28px;
        font-weight: bolder;
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
  }
}

</style>