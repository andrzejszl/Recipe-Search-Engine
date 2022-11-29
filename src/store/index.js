import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      randomRecipe: {
        id: '',
        title: '',
        image: '',
        summary: '',
      },
      searchedRecipes: {

      }
    }
  },
  getters: {
  },
  mutations: {

  },
  actions: {
    async getRecipes(context, payload) {
      // const api = '?apiKey=42f5299519244e28bfdda5914b136733';
      const api = '?apiKey=1f0c11959ff6405eb834f3da2290dcb5';
      let url ='https://api.spoonacular.com/recipes/';
      let type = payload.type
      let fullUrl = url + type + api

      //home page search
      if (payload.tags) fullUrl += '&tags=' + payload.tags

      //custom search
      if (payload.diet) fullUrl += '&diet=' + payload.diet
      if (payload.cuisine) fullUrl += '&cuisine=' + payload.cuisine

      //query search
      if (payload.query) fullUrl += '&query=' + payload.query
      
      
      let response = await fetch(fullUrl);

      const responseData = await response.json();
      let dataContainer;

      let data;
      if (payload.type === 'random') {
        data = await responseData.recipes[0];
        dataContainer = context.state.randomRecipe
      }
      else if (payload.type === 'complexSearch') {
        data = await responseData.results
        dataContainer = context.state.searchedRecipes;
      }
      if (payload.type === 'random') {
      dataContainer.id = data.id;
      dataContainer.title = data.title;
      dataContainer.image = data.image;
        dataContainer.summary = data.summary;
      } else if (payload.type === 'complexSearch') {
        data.forEach((recipe, index) => {
          dataContainer[index] = recipe
        });
      }

      console.log(fullUrl);
      console.log(context.state.searchedRecipes);
    },
  },
  modules: {
  }
})
