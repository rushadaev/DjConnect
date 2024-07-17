import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'orders',
        component: () => import('pages/orders/OrdersPage.vue'),
        path: '/orders',
        meta: {
            title: 'Orders',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]