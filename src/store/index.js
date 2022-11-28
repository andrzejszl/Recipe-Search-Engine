import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      randomRecipe: {
        id: '',
        title: '',
        image: '',
        summary: '',
      }
    }
  },
  getters: {
  },
  mutations: {

  },
  actions: {
    async getRandomRecipes(context, payload) {
      const url ='https://api.spoonacular.com/recipes/random';
      const api = '?apiKey=42f5299519244e28bfdda5914b136733';
 
      const response = await fetch(url + api + '&tags=' + payload.tags);
      const responseData = await response.json();
      const data = await responseData.recipes[0]

      context.state.randomRecipe.id = data.id;
      context.state.randomRecipe.title = data.title;
      context.state.randomRecipe.image = responseData.recipes[0].image;
      context.state.randomRecipe.summary = responseData.recipes[0].summary;
    }
  },
  modules: {
  }
})
