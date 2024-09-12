import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
	{
		name: 'main',
		component: () => import('pages/main/MainPage.vue'),
		path: '/:flow(user|dj)?',
		meta: {
			title: 'order me',
			layout: MainLayout,
			meta: { requiresAuth: true }
		}
	}
] as RouteRecordRaw[]
