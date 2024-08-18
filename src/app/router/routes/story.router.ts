import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'story',
        component: () => import('pages/history/HistoryPage.vue'),
        path: '/:flow(user|dj)?/history',
        meta: {
            title: 'History',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]