<template>
    <header>
        <router-link to="/home"><img src="../assets/logo.png" alt="logo"></router-link>
        <ul>
            <li><base-button :mode="currPath === '/home' ? 'outline' : ''" link to="/home">Home</base-button></li>
            <li><base-button :mode="currPath === '/search' ? 'outline' : ''" link to="/search">Search</base-button></li>
        </ul>
        <base-button :mode="currPath === '/account' ? 'outline' : 'flat'" link to="/account">My account</base-button>
        
    </header>
</template>

<script setup>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
const router = useRoute()
const currPath = computed(function () {
    return router.fullPath
})
</script>

<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #222222;
    height: 100px;
    padding: 0 30px;
    img {
        width: 150px;
        cursor: pointer;
    }
    ul {
        display: flex;
        margin: 0;
        list-style: none;
    }
}
</style>