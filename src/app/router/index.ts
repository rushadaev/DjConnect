import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from './routes'
import { useSessionStore } from '@/entities/session/model/session.store'

const BASE_URL = '/DjConnect/'

const router = createRouter({
	history: createWebHashHistory(BASE_URL),
	routes: routes as RouteRecordRaw[]
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const appFlow = to.params.flow // Get the dynamic flow (user or dj) from the route
  console.log('appFlow', appFlow)
  console.log('to', to)
  console.log('from', from)
  if (to.name === 'main'){
	sessionStore.hideBackButton()
  } else{
	sessionStore.showBackButton()
  }

  // Save the dynamic flow to the store
  // If route has /:flow, then appFlow will be 'user' or 'dj'
  // It helps to determine the user role in the app and show the appropriate UI

  if (requiresAuth && !sessionStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router