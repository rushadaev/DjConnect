import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'orders',
        component: () => import('pages/profile/ProfilePage.vue'),
        path: '/orders',
        meta: {
            title: 'Profile',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]