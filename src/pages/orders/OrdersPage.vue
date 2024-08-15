<template>
	<div
		v-if="!isLoading"
		class="px-6 pt-11 overflow-y-auto overflow-x-hidden"
	>
		<h1 class="text-2xl pb-4">
			Статистика 📈
		</h1>
		<div class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center">
			<span class="text-sm text-[#FFFFFF4D] pb-2">Заработано за все время</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.total_income || 0 }} ₽</span>
		</div>
		<div class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center">
			<span class="text-sm text-[#FFFFFF4D] pb-2">Заработано за месяц</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.income_current_month || 0 }} ₽</span>
		</div>
		<div class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center">
			<span class="text-sm text-[#FFFFFF4D] pb-2">Принято заказов</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.total_accepted_orders || 0 }}</span>
		</div>
		<div class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center">
			<span class="text-sm text-[#FFFFFF4D] pb-2">Отклонено заказов</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.total_rejected_orders || 0 }}</span>
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
	import OrderList from '@/features/order-music/ui/OrderList.vue'
	// import { useRoute } from 'vue-router'
	import { useDJStore } from 'entities/dj'
	import { ref, onMounted, computed } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { storeToRefs } from 'pinia'
	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { user } = storeToRefs(sessionStore)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const orders = ref<any>([])
	const isLoading = computed(() => djStore.isLoading)

	onMounted(async () => {

		if(user.value?.is_dj && user.value.dj) {
			const stats = await djStore.fetchDJStatistics(+user.value.dj.id)
			if(stats?.most_popular_tracks) {
				for(let track of stats.most_popular_tracks) {
					orders.value.push({
						id: +track.track_id,
						photo: '/public/cabinet_bg.png',
						title: track?.track_name || '',
						text: user?.value?.dj?.stage_name || '',
						statusColor: 'white' as StatusVariable,
						statusText: `Заказан ${track.count} раз`,
						// routeParams: { name: 'review-order', params: { id: +order.id } }
					})
				}
			}
		}
	})
</script>

<style scoped>

</style>