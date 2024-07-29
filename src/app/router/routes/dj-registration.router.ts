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
    {
        path: '/dj-profile-edit',
        name: 'dj-profile-edit',
        component: () => import('@/pages/dj-profile-edit/DJProfileEditPage.vue'),
        meta: { requiresAuth: true, requiresDJ: true }
    },
] as RouteRecordRaw[]