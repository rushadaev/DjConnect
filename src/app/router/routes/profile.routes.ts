import { RouteRecordRaw } from 'vue-router'
import { MainLayout } from 'app/layouts'

export default [
    {
        name: 'order',
        component: () => import('pages/order/OrderMusicPage.vue'),
        path: '/order/:id',
        meta: {
            title: 'Заказать трек',
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