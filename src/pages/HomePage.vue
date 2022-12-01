<template>
    <main>
        <base-dialog :show="!!store.state.error" title="An error occured!" @close="store.state.error=null">
            <p class="error-text">{{ store.state.error }}</p>
        </base-dialog>
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
        <transition name="result" mode="out-in">
            <base-card v-if="store.state.randomRecipe.title && !store.state.isLoading" :title="store.state.randomRecipe.title" :image="store.state.randomRecipe.image" :summary="store.state.randomRecipe.summary" :id="store.state.randomRecipe.id" type="standard"></base-card>
            <base-card v-else-if="requestedResults && !store.state.isLoading"><h2>No recipe found</h2></base-card>
        </transition>
    </main>
</template>

<script setup>
import { useStore } from 'vuex';
let requestedResults = false;
const store = useStore()
async function getRandomRecipe(tag) {
    store.state.isLoading = true
    requestedResults = true
    try {
        await store.dispatch('getRecipes', {
            tags: tag,
            type: 'random'
        });
    } catch (error) {
        store.state.error = error.message || 'Something went wrong!'
    }
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
.error-text {
    font-size: 1.4rem;
    font-family: 'Roboto', sans-serif;
}

.result-enter-from,
.result-leave-to {
  transform: translateY(100%);
}
.result-enter-active {
  transition: transform .3s ease-out;
}
.result-leave-active {
  transition: transform .3s ease-in;
}
.result-enter-to, .result-leave-from {
  transform: translateY(0);
}
</style>