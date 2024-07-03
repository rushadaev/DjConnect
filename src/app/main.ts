import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import { i18n } from '@/shared/lib/i18n'

const app = createApp(App)
const pinia = createPinia()

app
	.use(i18n)
	.use(pinia)
	.use(Router)

app.mount('#app')
