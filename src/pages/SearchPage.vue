<template>
<main>
    <base-card>
        <form action="submit" @submit.prevent="sendPhraseRequest">
            <h2>Phrase Search</h2>
            <input type="text" name="search" id="search" v-model="searchPhrase">
            <base-button mode="outlineLight">Search</base-button>
        </form>
    </base-card>
    <base-card>
        <h2>Advanced Search</h2>
        <form action="submit" @submit.prevent="sendAdvancedRequest">
            <fieldset>
                <legend>Diet:</legend>
                <div>
                    <input type="checkbox" id="vegetarian" name="vegetarian" v-model="diets.vegetarian">
                    <label for="vegetarian">Vegetarian</label>
                </div>
                <div>
                    <input type="checkbox" id="vegan" name="vegan" v-model="diets.vegan">
                    <label for="vegan">Vegan</label>
                </div>
                <div>
                    <input type="checkbox" id="glutenFree" name="glutenFree" v-model="diets.glutenFree">
                    <label for="glutenFree">Gluten Free</label>
                </div>
                <div>
                    <input type="checkbox" id="dairyFree" name="dairyFree" v-model="diets.dairyFree">
                    <label for="dairyFree">Dairy Free</label>
                </div>
                <div>
                    <input type="checkbox" id="pescetarian" name="pescetarian" v-model="diets.pescetarian">
                    <label for="pescetarian">Pescetarian</label>
                </div>
                <div>
                    <input type="checkbox" id="whole30" name="whole30" v-model="diets.whole30">
                    <label for="whole30">Whole30</label>
                </div>
            </fieldset>
            <fieldset>
                <legend>Cuisine:</legend>
                <select name="cuisine" id="cuisine" v-model="cuisine">
                    <option value=""></option>
                    <option value="african">African</option>
                    <option value="american">American</option>
                    <option value="british">British</option>
                    <option value="cajun">Cajun</option>
                    <option value="caribbean">Caribbean</option>
                    <option value="european">European</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="greek">Greek</option>
                    <option value="indian">Indian</option>
                    <option value="irish">Irish</option>
                    <option value="italian">Italian</option>
                    <option value="japanese">Japanese</option>
                    <option value="jewish">Jewish</option>
                    <option value="korean">Korean</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="mexican">Mexican</option>
                    <option value="nordic">Nordic</option>
                    <option value="southern">Southern</option>
                    <option value="spanish">Spanish</option>
                    <option value="thai">Thai</option>
                    <option value="vietnamese">Vietnamese</option>
                </select>
            </fieldset>
            <base-button mode="outlineLight">Search</base-button>
        </form>
    </base-card>
    <base-card v-if="store.state.searchedRecipes.title" :title="store.state.searchedRecipes.title" :image="store.state.searchedRecipes.image" :summary="store.state.searchedRecipes.summary"></base-card>
    <ul v-if="store.state.searchedRecipes" >
        <li><base-card v-for="recipe in store.state.searchedRecipes" :key="recipe.id" type="mini" :title="recipe.title" :image="recipe.image"></base-card></li>
    </ul>
    
</main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

const searchPhrase = ref()

const diets = reactive({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    pescetarian: false,
    whole30: false,
})
const cuisine = ref()

function sendPhraseRequest() {
    store.dispatch('getRecipes', {
    query: searchPhrase.value,
    type: 'complexSearch'
    })
}
function sendAdvancedRequest() {
    let filteredDiet = ''
    for (let diet in diets) {
        if (diets[diet] === true) filteredDiet += diet + ','
    }
    store.dispatch('getRecipes', {
        type: 'complexSearch',
        diet: filteredDiet,
        cuisine: cuisine.value,
    })
}
</script>

<style lang="scss" scoped>
main {
    min-height: calc(100vh - 100px);
    background-color: #434242;
    padding: 20px;
    h2 {
        text-align: center;
        width: 100%;
        font-size: 2rem;
    }
    #search {
        width: 100%;
        font-size: 1.5rem;
        // border-color: #166967;
        border: 1px solid #434242;
        &:focus-visible {
            outline: 3px solid #434242;
        }
    }
    ul {
        list-style: none;
        padding: 0;
    }
    .card {
        margin: 20px auto;
        form {
            display: flex;
            flex-direction: column;
            fieldset {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                legend {
                    font-size: 1.8rem;
                }
                select {
                    font-size: 1.5rem;
                    width: 300%;
                    cursor: pointer;
                    border: 1px solid #434242;
                    &:focus-visible {
                        outline: 3px solid #434242;
                    }
                }
                font-size: 1rem;
                label {
                    font-size: 1.2rem;
                    font-family: 'Roboto', sans-serif;
                    cursor: pointer;
                }
                input {
                    cursor: pointer;
                    margin: 5px;
                    &:hover {
                        box-shadow: 0 0 5px 0 #434242;
                        transform: scale(1.2);
                    }
                }
            }
            button {
                margin: 20px auto;
            }
        }
    }
}
</style>