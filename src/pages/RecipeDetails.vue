<template>
    <main>
        <base-dialog :show="!!store.state.error" title="An error occured!" @close="store.state.error=null">
            <p class="error-text">{{ store.state.error }}</p>
        </base-dialog>
        <div v-if="store.state.isLoading">
            <base-card>
                <base-spinner></base-spinner>
            </base-card>
        </div>
        <div class="recipe-container" v-if="data && !store.state.isLoading">
            <base-card>
                <h2>{{ data.title }}</h2>
                <img :src="data.image" alt="dish photo" v-if="data.image">
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
            <base-card>
                <h2>Ingredients list:</h2>
                    <div class="ingredients" id="ingredientsList">
                        <div class="ingredient-container" v-for="ingredient in data.extendedIngredients" :key="ingredient">
                            <img :src="`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`" v-if="ingredient.image" :alt="ingredient.name">
                            <img src="https://spoonacular.com/cdn/ingredients_100x100/no.jpg" v-else :alt="ingredient.name">
                            <div class="amount">
                                <span class="name">{{ ingredient.name }}</span>
                                <span class="value">{{ ingredient.measures.metric.amount }} {{ ingredient.measures.metric.unitLong }}</span>
                            </div>
                        </div>
                    </div>
            </base-card>
            <base-card v-if="data.analyzedInstructions[0]">
                <h2>Instructions</h2>
                <ul class="steps">
                    <li class="step" v-for="step in data.analyzedInstructions[0].steps" :key="step">
                        <div class="ingredients">
                            <div class="ingredient-container" v-for="ingredient in step.ingredients" :key="ingredient">
                                <img :src="`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`" v-if="ingredient.image" :alt="ingredient.name">
                                <img src="https://spoonacular.com/cdn/ingredients_100x100/no.jpg" v-else :alt="ingredient.name">
                                <div class="amount">
                                    <span class="name">{{ ingredient.name }}</span>
                                    <!-- <span class="value">{{ ingredient.measures.metric.amount }} {{ ingredient.measures.metric.unitLong }}</span> -->
                                </div>
                            </div> 
                        </div>
                        <p class="text"><span class="number">{{ step.number }}. </span>{{ step.step }}</p>
                    </li>
                </ul>
                <h2>Have a great meal!</h2>
            </base-card>
        </div>
        <base-card v-else-if="requestedResults && !store.state.isLoading"><h2>No recipe detials found</h2></base-card>
        <div @click="scrollUp" id="up" v-if="isScrollVisible"><span>&#8679;</span></div>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue';
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

const isScrollVisible = ref(false)
document.addEventListener('scroll', ()=> {
    if (!document.getElementById('ingredientsList')) return
    const list = document.getElementById('ingredientsList')
    if (window.scrollY > list.offsetTop) isScrollVisible.value = true
    if (window.scrollY < list.offsetTop) isScrollVisible.value = false
})
function scrollUp() {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

async function getDetails() {
    store.state.isLoading = true
    requestedResults = true
    //dont request recipe info if already stored locally
    if (store.state.storedRecipes[props.id]) {
        store.state.isLoading = false
        return
    }
    try {
        await store.dispatch('getRecipeInfo', {id:props.id})
    } catch (error) {
        store.state.error = error.message || 'Something went wrong!'
    }
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
        margin: 20px auto;
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
            text-align: justify;
            font-size: 1.2rem;
            padding: 20px;
            :-webkit-any-link {
                cursor: default;
                color: black;
                font-family: 'Roboto', sans-serif;
                text-decoration: none;
            }
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
    .ingredients {
        font-family: 'Roboto', sans-serif;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .ingredient-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 180px;
            height: 180px;
            padding: 10px 0;
            border: 1px solid #222;
            box-shadow: 0 0 3px 0 #222;
            border-radius: 10px;
            margin: 3px;
            img {
                max-width: 100px;
                max-height: 100px;
            }
            .amount {
                display: flex;
                flex-direction: column;
                text-align: center;
                align-items: center;
                span.name {
                    margin: 5px 0;
                    font-weight: bold;
                }
                span.value {
                    font-size: 0.9rem;
                }
            }
        }
    }
    ul.steps {
        font-family: 'Roboto', sans-serif;
        list-style: none;
        padding: 0;
        margin: 0;
        li.step {
            border: 1px solid #222;
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 1.2rem;
            .number {
                font-family: 'Nerko One', cursive;
                font-size: 2rem;
            }
        }
    }
}
.error-text {
    font-size: 1.4rem;
    font-family: 'Roboto', sans-serif;
}
#up {
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 75px;
    height: 75px;
    background-color: #22A39F;
    border-radius: 50%;
    span {
        transition: transform .2s ease-in-out;
        font-size: 3rem;
        color: #F3EFE0;
    }
    &:hover {
        box-shadow: 0 0 10px 5px #222;
        span {
            transform: translateY(-15px);
        }
    }
}
</style>