<template>
	<div

		class="px-6 pt-11 h-full min-h-[100vh] overflow-y-auto overflow-x-hidden"
	>
		<h1 class="text-2xl pb-4">
			Список заказов ✨
		</h1>
		<OrderList

			:items="orders"
		/>
	</div>
	<VLoader :is-loading="isLoading" />
</template>

<script setup lang="ts">
	import OrderList from '@/features/order-music/ui/OrderList.vue'
	import { VLoader } from '@/shared/components/Loader/'

	import { useDJStore } from 'entities/dj'
	import { ref, onMounted } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { useOrdersStore } from 'features/order-music/model/use-orders-store'
	import { storeToRefs } from 'pinia'
	import { useRoute } from 'vue-router'
import { getStatusText } from '@/shared/utils/helpers'
	const ordersStore = useOrdersStore()
	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { user } = storeToRefs(sessionStore)
	const route = useRoute()
	const flow = route.params.flow ?? 'user' // Default to 'user' if flow is not set
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const orders = ref<any>([])
	const { isLoading }  = storeToRefs(ordersStore)

	onMounted(async () => {
		if(user.value?.is_dj && user.value.dj && flow !== 'user') {
			const orderList = await djStore.fetchDJOrders(+user.value.dj.id)
			// const tracks = await djStore.fetchTracks(+user.value.dj.id)
			for(let order of orderList) {
				const track = order.track
				const { statusText: statusText, statusColor: color } = getStatusText(order.status, order.is_paid)
				orders.value.push({
					id: +order.id,
					photo: '/public/cabinet_bg.png',
					title: track?.name || '',
					text: user.value.dj.stage_name,
					statusColor: color,
					statusText: statusText,
					routeParams: { name: 'review-order', params: { id: +order.id, flow: 'dj' } }
				})
			}
		} else {
			const orderList = await ordersStore.fetchOrders()
			if(orderList)
				for (let order of orderList) {
					// const dj = await djStore.fetchDJProfile(+order.dj_id)
					// const tracks = await djStore.fetchTracks(+order.dj_id)
					// const track = tracks.find(track => +track.id === +order.track_id)
					let track = order?.track
					let dj = order?.dj
					const { statusText: statusText, statusColor: color } = getStatusText(order.status, order.is_paid)
					orders.value.push({
						id: +order.id,
						photo: '/public/cabinet_bg.png',
						title: track?.name || '',
						text: dj?.stage_name,
						statusColor: color,
						// 'Оплачено' | 'Ожидание' | 'Отменен'
						statusText: statusText,
						routeParams: { name: 'review-order', params: { id: +order.id, flow: 'user' } }
					})
			}
		}
	})
</script>

<style scoped>

</style>