<template>
	<div
		v-if="!isLoading"
		class="px-6 pt-11 overflow-y-auto overflow-x-hidden"
	>
		<h1 class="text-2xl pb-4">
			Список заказов ✨
		</h1>
		<OrderList
			class="px-6"
			:items="orders"
		/>
	</div>
	<div
		v-if="isLoading"
		class="flex items-center justify-center h-[100vh]"
	>
		<div class="px-6 pt-11 pb-4">
			<div
				class="flex flex-col justify-center items-center py-[170px] text-7xl"
			>
				<span>💿</span>
				<h1 class="text-2xl pt-4">
					Ожидание
				</h1>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { StatusVariable } from '@/shared/components/Status/config'
	// import MusicList from '@/widgets/music-list/MusicList.vue'
	import OrderList from '@/features/order-music/ui/OrderList.vue'

	// import { useRoute } from 'vue-router'
	import { useDJStore } from 'entities/dj'
	import { ref, onMounted, computed } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { useOrdersStore } from 'features/order-music/model/use-orders-store'
	import { storeToRefs } from 'pinia'
	const ordersStore = useOrdersStore()
	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { user } = storeToRefs(sessionStore)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const orders = ref<any>([])
	const isLoading = computed(() => djStore.isLoading)

	onMounted(async () => {
		if(user.value?.is_dj && user.value.dj) {
			const orderList = await djStore.fetchDJOrders(+user.value.dj.id)
			const tracks = await djStore.fetchTracks(+user.value.dj.id)
			for(let order of orderList) {
				const track = tracks.find(track => +track.id === +order.track_id)
				orders.value.push({
					id: +order.id,
					photo: '/public/cabinet_bg.png',
					title: track?.name || '',
					text: user.value.dj.stage_name,
					statusColor: order.is_paid? 'green' as StatusVariable : order.status === 'pending'? 'orange' as StatusVariable : 'red' as StatusVariable,
					statusText: order.is_paid? 'Оплачено' : order.status === 'pending'? 'Ожидание' : 'Отменен',
					routeParams: { name: 'review-order', params: { id: +order.id } }
				})
			}
		} else {
			const orderList = await ordersStore.fetchOrders()
			if(orderList)
				for (let order of orderList) {
					const dj = await djStore.fetchDJProfile(+order.dj_id)
					const tracks = await djStore.fetchTracks(+order.dj_id)
					const track = tracks.find(track => +track.id === +order.track_id)
					orders.value.push({
						id: +order.id,
						photo: '/public/cabinet_bg.png',
						title: track?.name || '',
						text: dj?.stage_name,
						statusColor: order.is_paid? 'green' as StatusVariable : order.status === 'pending'? 'orange' as StatusVariable : 'red' as StatusVariable,
						// 'Оплачено' | 'Ожидание' | 'Отменен'
						statusText: order.is_paid? 'Оплачено' : order.status === 'pending'? 'Ожидание' : 'Отменен',
						routeParams: { name: 'review-order', params: { id: +order.id } }
					})
			}
		}
	})
</script>

<style scoped>

</style>