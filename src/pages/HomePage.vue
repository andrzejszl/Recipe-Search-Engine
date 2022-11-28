<template>
<main>
    <base-card>
        <h2>I'm feeling lucky! <br>Let's try some random food.</h2>
        <div class="buttons">
            <base-button @click="getRandomRecipe('vegetarian')">Vegetarian</base-button>
            <base-button @click="getRandomRecipe('dessert')">Dessert</base-button>
            <base-button @click="getRandomRecipe('')" mode="flat">Something else</base-button>
        </div>
    </base-card>
    <base-card v-if="store.state.randomRecipe.title" :title="store.state.randomRecipe.title" :image="store.state.randomRecipe.image" :summary="store.state.randomRecipe.summary"></base-card>
</main>
</template>

<script setup>
import { useStore } from 'vuex';
const store = useStore()
function getRandomRecipe(tag) {
    store.dispatch('getRandomRecipes', {
    tags: tag,
});
}
if (store.state.randomRecipe.title.length === 0) getRandomRecipe('');
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
                border: 1px solid #222222;
                margin-left: auto;
            }
            button:last-child:hover {
                background-color: #222222;
                color: white;
            }
        }
    }
}
</style>