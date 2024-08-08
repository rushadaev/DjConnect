<template>
	<div
		class="px-6 pt-11 overflow-y-auto overflow-x-hidden"
	>
		<h1 class="text-2xl pb-4">
			Финансы 🛍
		</h1>
		<div class="w-full h-[118px] border-solid border-[1px] border-[#FFFFFF1A] bg-[#0A0A0A] rounded-md flex flex-col items-center justify-center">
			<span class="text-5xl text-white">{{ 1500 }} ₽</span>
			<span class="text-sm text-[#FFFFFF4D] pt-2">Баланс</span>
		</div>
		<!-- пополнить обменять отправить кнопки в горизонтальный ряд, 110px 65px -->
		<div class="flex justify-between mt-4 gap-2">
			<button
				class="w-1/3 h-[65px] bg-[#131313] rounded-md cursor-pointer"
			>
				<div class="flex flex-col items-center gap-3">
					<span
						class="w-[24px] h-[24px] text-[24px]"
					>📥</span>
					<span class="text-white text-[10px]">Пополнить</span>
				</div>
			</button>
			<button
				class="w-1/3 h-[65px] bg-[#ADFF00] rounded-md cursor-pointer"
			>
				<div class="flex flex-col items-center gap-3">
					<span
						class="w-[24px] h-[24px] text-[24px]"
					>💰</span>
					<span class="text-[#131313] text-[10px]">Обменять</span>
				</div>
			</button>
			<button
				class="w-1/3 h-[65px] bg-[#131313] rounded-md cursor-pointer"
			>
				<div class="flex flex-col items-center gap-3">
					<span
						class="w-[24px] h-[24px] text-[24px]"
					>📤</span>
					<span class="text-white text-[10px]">Отправить</span>
				</div>
			</button>
		</div>
		<button class="w-full flex items-center justify-center gap-2 mt-3 bg-[#131313] h-[55px] cursor-pointer rounded-md">
			<span class="text-[24px]">💳</span><span class="text-[15px]">Изменить карту вывода</span>
		</button>
		<h1 class="text-xl py-4">
			Выплаты
		</h1>
		<PaymentsList
			class="px-6"
			:items="orders"
		/>
	</div>
</template>

<script setup lang="ts">
	// import { IconStat, IconWallet, IconMessage } from '@/shared/components/Icon'
	import { StatusVariable } from '@/shared/components/Status/config'
	// import MusicList from '@/widgets/music-list/MusicList.vue'
	import PaymentsList from 'features/order-music/ui/PaymentsList.vue'

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
			// const tracks = await djStore.fetchTracks(+user.value.dj.id)
			for(let order of orderList) {
				// const track = tracks.find(track => +track.id === +order.track_id)
				orders.value.push({
					id: +order.id,
					photo: '/public/cabinet_bg.png',
					title: '+1500₽',
					text: '10.01.2021',
					statusColor: 'green' as StatusVariable,
					statusText: 'Выполнен',
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