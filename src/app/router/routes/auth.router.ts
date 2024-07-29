import { RouteRecordRaw } from 'vue-router'
import { AuthLayout } from 'app/layouts'

export default [
    {
        name: 'auth',
        component: () => import('pages/auth/AuthPage.vue'),
        path: '/auth',
        meta: {
            title: 'Auth',
            layout: AuthLayout
        }
    }
] as RouteRecordRaw[]