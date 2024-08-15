import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'order',
        component: () => import('pages/order/OrderMusicPage.vue'),
        path: '/order-music/:id',
        meta: {
            title: 'Заказать трек',
            layout: MainLayout
        }
    },
    {
        name: 'edit-card',
        component: () => import('pages/edit-card/EditCardPage.vue'),
        path: '/edit-card',
        meta: {
            title: 'Редактировать карту',
            layout: MainLayout
        }
    },
    // add dynamic route for each dj id profile
	{
		name: 'dj-profile',
		component: () => import('pages/profile/ProfilePage.vue'),
		path: '/dj/:id',
		meta: {
			title: 'DJ Profile',
			layout: MainLayout,
		}
	}
] as RouteRecordRaw[]