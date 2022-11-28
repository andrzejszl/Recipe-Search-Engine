import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseButton from './ui/BaseButton.vue'
import BaseCard from './ui/BaseCard.vue'


const app = createApp(App)
app.use(store)
app.use(router)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)

app.mount('#app')
