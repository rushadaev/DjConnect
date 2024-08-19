import { createPinia } from 'pinia'
import { createApp, h } from 'vue'
import App from './App.vue'
import Router from './router'
import { i18n } from '@/shared/lib/i18n'
// import VuePaycard from 'vue-paycard'
import socketPlugin from './plugins/socket'

const app = createApp({ render: () => h(App), })

const pinia = createPinia()

app
	.use(socketPlugin)
	.use(i18n)
	.use(pinia)
	.use(Router)
	// .use(VuePaycard)

app.mount('#app')
