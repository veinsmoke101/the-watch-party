<template>
  <div class="newRoom">
    <div class="newRoom__inputs">
      <div class="newRoom__searchVid  ">
        <form  @submit.prevent="handleSearch" >
          <input type="text" v-model="search" placeholder="Enter a youtube video URL"
                 class="bg-white text-black dark:text-white dark:bg-gray-800 ">
        </form>

      </div>
<!--      <div class="newRoom__upload text-gray-500 dark:text-white">-->
<!--        <img :src="uploadIcon" alt="upload">-->
<!--        Upload a video-->
<!--      </div>-->
    </div>
    <div class="newRoom__generate">
      <div class="newRoom__generateContainer">
        <div @click="isLinkOpen = true" class="newRoom__links ">
          <svg class="newRoom__link dark:fill-white fill-black " width="26" height="26" viewBox="0 0 26 26"
               fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.1731 0.41521C17.4407 0.61437 16.74 0.94067 16.1269 1.35459C15.8721 1.52983 14.5344 2.81163 13.1572 4.18911L10.6492 6.70513H11.6047C12.5919 6.70513 13.3007 6.81667 14.1764 7.11125L14.686 7.27843L16.3341 5.63835C18.3247 3.66391 18.4919 3.56043 19.686 3.56043C20.3628 3.56043 20.4902 3.58435 20.9042 3.79131C21.4455 4.07003 21.8994 4.53179 22.2099 5.12901C22.4007 5.50315 22.4249 5.63861 22.4327 6.30733C22.4327 7.55741 22.4488 7.53349 19.1762 10.8298C17.6396 12.3744 16.2065 13.7597 15.9834 13.911C14.9005 14.6593 13.3959 14.5319 12.4643 13.6164C12.1697 13.3299 12.0743 13.2821 11.6999 13.2504C11.1346 13.2025 10.9675 13.2982 10.0598 14.2137L9.31152 14.97L9.6061 15.3761C10.6968 16.8571 12.8387 17.8045 14.7814 17.6693C15.9836 17.5817 17.0348 17.2154 17.9583 16.5466C18.5634 16.1088 24.3437 10.3124 24.6942 9.78691C25.0844 9.21361 25.4029 8.48899 25.5857 7.74071C25.8327 6.77741 25.7768 5.36015 25.4583 4.41271C24.8294 2.54175 23.4519 1.17233 21.557 0.527269C20.6733 0.224109 19.073 0.176271 18.1731 0.41521Z"/>
            <path
                d="M10.554 8.38501C9.92502 8.48849 9.04908 8.81505 8.42014 9.18919C7.97424 9.45205 7.25768 10.1208 4.77364 12.5889C3.0696 14.2769 1.533 15.8691 1.35802 16.132C0.904056 16.7848 0.537976 17.6207 0.378596 18.3612C0.171636 19.2847 0.243136 20.6942 0.529916 21.554C1.17472 23.4489 2.5444 24.8264 4.41536 25.4553C5.3628 25.7738 6.78006 25.8295 7.74336 25.5827C8.5634 25.3758 9.27996 25.0495 9.92502 24.5874C10.1957 24.3883 11.5175 23.1226 12.8789 21.761L15.3471 19.285H14.3916C13.4043 19.285 12.6958 19.1735 11.8199 18.8789L11.3103 18.7117L9.67022 20.3359C7.6638 22.3184 7.48856 22.4299 6.31024 22.4299C5.68936 22.4219 5.4902 22.3902 5.1717 22.2388C4.61426 21.9682 4.06488 21.4347 3.80228 20.9011C3.58726 20.4872 3.56334 20.3598 3.56334 19.683C3.56334 18.409 3.53942 18.4491 6.81178 15.1606C8.35644 13.616 9.79762 12.2307 10.0124 12.0793C11.0953 11.3308 12.6002 11.4582 13.5317 12.3739C13.8263 12.6605 13.9217 12.7083 14.2961 12.74C14.8614 12.7879 15.0286 12.6922 15.9362 11.7686L16.6848 11.0123L16.3585 10.5745C15.7373 9.75443 14.5273 8.93439 13.4363 8.59197C12.5284 8.30545 11.4775 8.23369 10.554 8.38501Z"/>
          </svg>
          <p class="text-black dark:text-white">Get Room Link</p>
        </div>
        <p class="newRoom__or">OR</p>
        <div @click="isIdOpen = true" class="newRoom__links ">
          <svg class="newRoom__link dark:fill-white fill-black " width="20" height="29" viewBox="0 0 20 29"
               fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_398_287)">
              <path
                  d="M14.2894 10.252C13.9391 10.4431 13.5018 10.3133 13.3137 9.96405C13.1233 9.61241 13.2526 9.17344 13.6029 8.98464C15.258 8.08311 16.0292 6.91726 16.1843 5.77736C16.2666 5.16848 16.1726 4.55723 15.9445 3.99082C15.7118 3.41734 15.3427 2.89577 14.8748 2.47569C13.965 1.65912 12.6884 1.22959 11.3554 1.56236C10.8146 1.69688 10.3468 1.96828 9.9377 2.3506C9.50276 2.75653 9.1266 3.28754 8.79746 3.9153C8.61173 4.26931 8.1768 4.40383 7.8265 4.21975C7.47385 4.0333 7.33984 3.5967 7.52322 3.24505C7.92759 2.47569 8.40014 1.81488 8.95968 1.29095C9.54508 0.745787 10.2245 0.354022 11.0145 0.15814C12.8482 -0.297345 14.595 0.283222 15.8364 1.39715C16.4664 1.96356 16.9672 2.66921 17.2822 3.44802C17.5996 4.23391 17.7289 5.09768 17.609 5.97325C17.3951 7.53558 16.3983 9.10264 14.2894 10.252ZM8.77395 15.9562C6.04678 12.2792 5.98096 8.79584 9.29117 5.55788L6.90725 4.23627C4.99824 3.4905 1.49524 8.987 2.84942 10.4549L4.70671 13.2209L4.3235 14.0233C4.2177 14.2617 4.32115 14.4292 4.57976 14.5449L4.83132 14.6133L0 24.2115L0.978018 26.3049L2.93405 25.7267L3.43717 24.7449L2.95521 23.8386L4.01787 23.6097L4.26472 23.1283L3.70989 22.2787L4.07429 21.5683L5.1346 21.4338L5.48019 20.7612L4.88774 19.9847L5.26625 19.2484L6.34771 19.0714L7.81944 16.2512L8.06865 16.388C8.50123 16.6524 8.72458 16.4824 8.77395 15.9562ZM13.9062 18.2619L13.1868 20.9571L12.1876 21.3535L11.9784 22.1394L12.7072 22.7601L12.5168 23.4752L11.5293 23.8245L11.3271 24.5797L12.0348 25.2759L11.8984 25.788L10.9275 26.2294L11.5763 26.9964L11.2966 28.0419L9.54508 29.0024L8.1768 27.2017L10.7864 17.4241L10.154 17.2542C10.0247 17.2188 9.94475 17.0842 9.98002 16.9521L10.2457 15.9585C8.33196 14.5024 7.38451 11.9819 8.04279 9.51092C8.88915 6.33669 12.0818 4.42035 15.2463 5.13308C15.2604 5.303 15.258 5.47528 15.2345 5.64756C15.1757 6.07709 14.99 6.51841 14.6468 6.94558C14.5997 7.00222 14.5504 7.06122 14.4986 7.11786C13.4877 7.05178 12.5403 7.70786 12.2675 8.7274C12.15 9.16636 12.1759 9.61005 12.3146 10.0089C12.3475 10.1505 12.4016 10.2874 12.4721 10.4219C12.639 10.7287 12.8835 10.9623 13.1703 11.111C13.3584 11.2361 13.57 11.3305 13.798 11.3942C14.9336 11.6987 16.0973 11.0426 16.4359 9.92157C16.7791 9.61713 17.0777 9.29616 17.334 8.96576C17.8324 8.32147 18.1733 7.63706 18.3755 6.94086C19.7484 8.42767 20.3527 10.5682 19.7908 12.6734C19.1325 15.1443 17.0518 16.853 14.6726 17.1527L14.407 18.1463C14.3717 18.2761 14.2377 18.3563 14.106 18.3209L13.9062 18.2619Z"/>
            </g>
            <defs>
              <clipPath id="clip0_398_287">
                <rect width="20" height="29" fill="white"/>
              </clipPath>
            </defs>
          </svg>

          <p class="text-black dark:text-white">Get Room Id</p>
        </div>
      </div>
    </div>
  </div>


  <LinkModal
      @close="isLinkOpen = false"
      v-if="isLinkOpen"
      title="Get Room URL"
      description="lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum "
      :link="link"
  />


  <LinkModal
      @close="isIdOpen = false"
      v-if="isIdOpen"
      title="Get Room Identifier"
      description="lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum lorem ipqum "
      :link="id"
  />
</template>

<script setup>



// components
import LinkModal from "../../components/modals/LinkModal.vue"

// icons
import uploadLight from "../../assets/icons/upload.svg"
import uploadDark from "../../assets/icons/upload-dark.svg"

// utilities
import { ref, computed } from "vue";
import {useStore} from "vuex";


// vuex store
const store = useStore()


// modals states
const isLinkOpen = ref(false)
const isIdOpen = ref(false)
const id = computed(() => store.getters.roomRef)
const link = computed(() =>`http://localhost:3000/room/${store.getters.roomRef}`)

const uploadIcon = computed(() => store.getters.dark ? uploadDark : uploadLight)
let search = ref(null)


const handleSearch = () => {

  let data = {
    roomRef: store.getters.roomRef,
    videoUrl: search.value
  }

  fetch("http://localhost:8080/new/vid", {
    method: "post",
    body: JSON.stringify(data),
  })
      .then(response => response.json())
      .then((response) => console.log("response :" + response))
      .catch((error) => console.log("error :" + error));

}


</script>

<style lang="scss" scoped>

@use "../../sass/base";

.newRoom {
  margin-top: 3rem;
  @include base.flexRow(center, space-between);
  width: 100%;
  padding: 0 1rem;
  @include base.tablet{
    //flex-direction: column;
  }

&__inputs {
   @include base.flexColumn(flex-start, center);
   width: 71%;
 }

&__searchVid {
 //background-color: #c4c4c4;
   width: 100%;
   border-radius: 10px;
   outline: none;

form {
  width: 100%;
  @include base.flexRow(center, flex-start);
  input {
    width: 100%;
    border-radius: 10px;
    padding: 0.6rem 1rem;
    margin: 0.6rem 0;
    border: 2px solid #c4c4c4;
    outline: none;
    font-size: 0.9rem;
    &:focus{
      border-color: base.$main;
    }
  }
}

}

&__upload {
   margin-top: 1rem;
   @include base.flexRow(center, center);
   font-weight: bold;
   text-decoration: underline;
   cursor: pointer;
  font-size: 0.9rem;

img {
  width: 25px;
  margin-right: 0.5rem;
  height: auto;
}
}

&__generate {
   width: 28%;
  margin-bottom: auto;
  margin-top: 1%;
   @include base.flexRow(center, center)
 }

&__generateContainer {
   width: 90%;
  height: 100%;
   @include base.flexRow(center, space-around)
 }


&__links {
   @include base.flexColumn(center, center);
   cursor: pointer;
   font-size: 12px;
    @include base.tablet{
      margin-top: 10px;
      font-size: 9px;
    }
  svg{
    @include base.tablet{
      width: 15px;
      height: 15px;
    }
  }


&:hover {
p {
  color: base.$main;
}

svg {
  fill: base.$main;
}
}
}

&__or {
   color: #606060;
   font-weight: bold;
 }
}

</style>