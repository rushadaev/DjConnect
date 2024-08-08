<template>
	<div
		class="px-6 pt-11 overflow-y-auto overflow-x-hidden"
	>
		<h1 class="text-2xl pb-4">
			Статистика 📈
		</h1>
		<div class="w-full h-[118px] border-solid border-[1px] border-[#FFFFFF1A] bg-[#0A0A0A] rounded-md flex flex-col items-center justify-center">
			<span class="text-sm text-[#FFFFFF4D] pb-2">Заработано за все время</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.total_income || 1500000 }} ₽</span>
		</div>
		<h1 class="text-xl py-4">
			Больше всего заказывают
		</h1>
		<OrderList
			class="px-6"
			:items="orders"
			text-color="green"
		/>
	</div>
</template>

<script setup lang="ts">
	import { StatusVariable } from '@/shared/components/Status/config'
	// import MusicList from '@/widgets/music-list/MusicList.vue'
	import OrderList from '@/features/order-music/ui/OrderList.vue'

	// import { useRoute } from 'vue-router'
	import { useDJStore } from 'entities/dj'
	import { ref, onMounted } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { useOrdersStore } from 'features/order-music/model/use-orders-store'
	import { storeToRefs } from 'pinia'
	const ordersStore = useOrdersStore()
	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { user } = storeToRefs(sessionStore)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const orders = ref<any>([])

	onMounted(async () => {

		if(user.value?.is_dj && user.value.dj) {
			await djStore.fetchDJStatistics(+user.value.dj.id)
			const orderList = await djStore.fetchDJOrders(+user.value.dj.id)
			const tracks = await djStore.fetchTracks(+user.value.dj.id)
			for(let order of orderList) {
				const track = tracks.find(track => +track.id === +order.track_id)
				orders.value.push({
					id: +order.id,
					photo: '/public/cabinet_bg.png',
					title: track?.name || '',
					text: `Заказан ${Math.floor(Math.random()*100)} раз`,
					statusColor: 'white' as StatusVariable,
					statusText: '20300 ₽',
					// routeParams: { name: 'review-order', params: { id: +order.id } }
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
						statusColor: 'white' as StatusVariable,
						statusText: '20300 ₽',
					})
			}
		}
	})
</script>

<style scoped>

</style>