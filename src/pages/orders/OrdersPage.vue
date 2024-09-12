<template>
	<div class="px-6 relative z-10 pt-[20px] w-full overflow-x-hidden">
		<h1 class="text-2xl pb-4">
			Статистика
		</h1>
		<div
			class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center"
		>
			<span class="text-sm text-[#FFFFFF4D] pb-2">Заработано за все время</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.total_income || 0 }} ₽</span>
		</div>
		<div
			class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center"
		>
			<span class="text-sm text-[#FFFFFF4D] pb-2">Заработано за месяц</span>
			<span class="text-5xl text-white">{{ djStore?.stats?.income_current_month || 0 }} ₽</span>
		</div>
		<div
			class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center"
		>
			<span class="text-sm text-[#FFFFFF4D] pb-2">Принято заказов</span>
			<span class="text-5xl text-white">{{
				djStore?.stats?.total_accepted_orders || 0
			}}</span>
		</div>
		<div
			class="mb-4 w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center"
		>
			<span class="text-sm text-[#FFFFFF4D] pb-2">Отклонено заказов</span>
			<span class="text-5xl text-white">{{
				djStore?.stats?.total_rejected_orders || 0
			}}</span>
		</div>
		<h1 class="text-xl py-4">
			Больше всего заказывают
		</h1>
		<OrderList
			class="w-full"
			:items="orders"
			text-color="green"
		/>
	</div>
	<VLoader
		:is-loading="isLoading"
		text="считаем деньги 💸"
		bg="backdrop-blur-[2px]"
	/>
</template>

<script setup lang="ts">
	import { StatusVariable } from '@/shared/components/Status/config'
	import OrderList from '@/features/order-music/ui/OrderList.vue'
	// import { useRoute } from 'vue-router'
	import { useDJStore } from 'entities/dj'
	import { ref, onMounted, computed } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { storeToRefs } from 'pinia'
	import VLoader from '@/shared/components/Loader/VLoader.vue'

	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { user } = storeToRefs(sessionStore)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const orders = ref<any>([])
	const isLoading = computed(() => djStore.isLoading)

	onMounted(async () => {
		if (user.value?.is_dj && user.value.dj) {
			const stats = await djStore.fetchDJStatistics(+user.value.dj.id)
			if (stats?.most_popular_tracks) {
				for (let track of stats.most_popular_tracks) {
					orders.value.push({
						id: +track.track_id,
						photo: '/cabinet_bg.png',
						title: track?.track_name || '',
						text: user?.value?.dj?.stage_name || '',
						statusColor: 'white' as StatusVariable,
						statusText: `Заказан ${track.count} раз`
						// routeParams: { name: 'review-order', params: { id: +order.id } }
					})
				}
			}
		}
	})
</script>

<style scoped></style>
