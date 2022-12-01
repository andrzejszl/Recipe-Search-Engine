<template>
<main>
    <base-card>
        <h2>I'm feeling lucky! <br>Let's try some random food.</h2>
        <div class="buttons">
            <base-button @click="getRandomRecipe('vegetarian')">Vegetarian</base-button>
            <base-button @click="getRandomRecipe('dessert')">Dessert</base-button>
            <base-button @click="getRandomRecipe('')" mode="outlineLight">Something else</base-button>
        </div>
    </base-card>
    <div v-if="store.state.isLoading">
        <base-card>
            <base-spinner></base-spinner>
        </base-card>
    </div>
    <base-card v-if="store.state.randomRecipe.title && !store.state.isLoading" :title="store.state.randomRecipe.title" :image="store.state.randomRecipe.image" :summary="store.state.randomRecipe.summary" :id="store.state.randomRecipe.id" type="standard"></base-card>
    <base-card v-else-if="requestedResults && !store.state.isLoading"><h2>No recipe found</h2></base-card>
</main>
</template>

<script setup>
import { useStore } from 'vuex';
let requestedResults = false;
const store = useStore()
async function getRandomRecipe(tag) {
    store.state.isLoading = true
    requestedResults = true
    await store.dispatch('getRecipes', {
        tags: tag,
        type: 'random'
    });
    store.state.isLoading = false
}
</script>

<style lang="scss" scoped>
main {
    min-height: calc(100vh - 100px);
    background-color: #434242;
    padding: 30px;
    .card {
        margin: 20px auto;
        h2 {
            font-size: 2rem;
            text-align: center;
        }
        .buttons {
            display: flex;
            button:last-child {
                margin-left: auto;
            }
        }
    }
}
</style>