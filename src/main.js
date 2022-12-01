import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaseButton from './ui/BaseButton.vue'
import BaseCard from './ui/BaseCard.vue'
import BaseBadge from './ui/BaseBadge.vue'
import BaseIcon from './ui/BaseIcon.vue'
import BaseSpinner from './ui/BaseSpinner.vue'
import BaseDialog from './ui/BaseDialog.vue'

const app = createApp(App)
app.use(store)
app.use(router)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-badge', BaseBadge)
app.component('base-icon', BaseIcon)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

app.mount('#app')
