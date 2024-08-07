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
    },
    {
        name: 'review-order',
        component: () => import('pages/review-order/DJOrderPage.vue'),
        path: '/order-review/:id',
        meta: {
            title: 'Review Order',
            layout: MainLayout
        }
    }
] as RouteRecordRaw[]