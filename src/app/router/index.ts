import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import routes from './routes'
import { useSessionStore } from '@/entities/session/model/session.store'

const BASE_URL = 'DjConnect'

const router = createRouter({
	history: createWebHistory(BASE_URL),
	routes: routes as RouteRecordRaw[]
})

router.beforeEach((to: RouteLocationNormalized, _: RouteLocationNormalized, next: NavigationGuardNext) => {
	const sessionStore = useSessionStore()
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

	if (requiresAuth && !sessionStore.isAuthenticated) {
		next({ name: 'login' })
	} else {
		next()
	}
})

export default router