<template>
<the-header></the-header>
<router-view v-slot="slotProps">
  <transition name="route" mode="out-in">
    <component :is="slotProps.Component"></component>
  </transition>
</router-view>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Nerko+One:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}
html {
  /* font-family: "Roboto", sans-serif; */
  font-family: 'Nerko One', cursive;
}
body {
  margin: 0;
  padding: 0;
}
button, a {
  font-family: 'Nerko One';
}

.route-enter-from {
  transform: translateX(-100%) rotate3d(1, 1, 0, 45deg);
}
.route-leave-to {
  transform: translateX(100%) rotate3d(1, 1, 0, -45deg);
}

.route-enter-active {
  transition: transform .3s ease-out;
}
.route-leave-active {
  transition: transform .3s ease-in;
}

.route-enter-to, .route-leave-from {
  transform: translateX(0) rotate3d(0, 0, 0, 0);
}
#app {
  background-color: #434242;
}
</style>
