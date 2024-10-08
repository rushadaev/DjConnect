import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'finance',
        component: () => import('pages/finance/FinancePage.vue'),
        path: '/:flow(user|dj)?/finance',
        meta: {
            title: 'Finance',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]