import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'story',
        component: () => import('pages/story/StoryPage.vue'),
        path: '/history',
        meta: {
            title: 'Story',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]