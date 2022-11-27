<template>
<the-header></the-header>
<router-view></router-view>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto&family=Nerko+One:wght@400;700&display=swap");

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
</style>
