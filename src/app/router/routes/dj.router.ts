import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from '@/app/layouts'

export default [
    {
        path: '/dj/profile',
        name: 'dj-profile',
        component: () => import('@/pages/dj-profile/DJProfilePage.vue'),
        meta: {
            layout: MainLayout,
            requiresAuth: true,
            requiresDJ: true
        }
    }
] as RouteRecordRaw[]