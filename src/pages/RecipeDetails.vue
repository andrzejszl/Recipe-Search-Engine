<template>
    <main>
        <div v-if="store.state.isLoading">
            <base-card>
                <base-spinner></base-spinner>
            </base-card>
        </div>
        <base-card v-if="data && !store.state.isLoading">
            <h2>{{ data.title }}</h2>
            <img :src="data.image" alt="dish photo">
            <div class="ratings">
                <base-icon v-if="data.healthScore !== -1" text="Score" :value="`${data.healthScore}%`" icon="♕"></base-icon>
                <base-icon v-if="data.readyInMinutes !== -1" text="Ready in" :value="`${data.readyInMinutes}min`" icon="🕒"></base-icon>
                <base-icon v-if="data.pricePerServing !== -1" text="Price per serving" :value="`$${data.pricePerServing}`" icon="＄"></base-icon>
            </div>
            <p class="summary" v-html="data.summary"></p>
            <div class="container" v-if="data.cuisines.length > 0">
                <span class="tag">Cuisine</span>
                <base-badge v-for="cuisine in data.cuisines" :key="cuisine" :text="cuisine"></base-badge>
            </div>
            <div class="container" v-if="data.diets.length > 0">
                <span class="tag">Diets</span>
                <base-badge v-for="diet in data.diets" :key="diet" :text="diet"></base-badge>
            </div>
        </base-card>
        <base-card v-else-if="requestedResults && !store.state.isLoading"><h2>No recipe detials found</h2></base-card>
    </main>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

let requestedResults = false;
const store = useStore()
// eslint-disable-next-line
const props = defineProps({
    id: String
})
const data = computed(()=> {
    return store.state.storedRecipes[props.id]
})

async function getDetails() {
    store.state.isLoading = true
    requestedResults = true
    //dont request recipe info if already stored locally
    if (store.state.storedRecipes[props.id]) {
        store.state.isLoading = false
        return
    }
    await store.dispatch('getRecipeInfo', {id:props.id})
    store.state.isLoading = false
}
getDetails()
</script>

<style lang="scss" scoped>
main {
    min-height: calc(100vh - 100px);
    background-color: #434242;
    padding: 20px;
    .card {
        h2 {
            font-size: 2.5rem;
            text-align: center;;
        }
        .ratings {
            display: flex;
            justify-content: center;
            .rating-container {
                width: 150px;
            }
        }
        .summary {
            font-family: 'Roboto', sans-serif;
        }
        .container {
            position: relative;
            border: 1px solid #222;
            padding: 15px 5px 5px;
            margin: 10px 0;
            span.tag {
                position: absolute;
                top: 0;
                left: 10px;
                transform: translateY(-50%);
                background-color: #F3EFE0;
                padding: 0 5px;
            }
        }
    }
}
</style>