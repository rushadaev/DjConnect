import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'support',
        component: () => import('pages/support/SupportPage.vue'),
        path: '/:flow(user|dj)?/support',
        meta: {
            title: 'Support',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]