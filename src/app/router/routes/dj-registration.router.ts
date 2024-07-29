import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from '@/app/layouts'

export default [
    {
        path: '/dj-registration',
        name: 'dj-registration',
        component: () => import('@/pages/dj-registration/DJRegistrationPage.vue'),
        meta: {
            layout: MainLayout,
            requiresAuth: true,
        },
    },
] as RouteRecordRaw[]