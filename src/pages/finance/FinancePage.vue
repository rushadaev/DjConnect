<template>
	<div class="px-6 relative z-10 pt-[20px] overflow-x-hidden">
		<h1 class="text-2xl pb-4">
			Финансы
		</h1>
		<div
			class="w-full h-[118px] border-none bg-[#131313] rounded-md flex flex-col items-center justify-center"
		>
			<span class="text-5xl text-white">{{ djStore?.availableBalance }} ₽</span>
			<span class="text-sm text-[#FFFFFF4D] pt-2">Баланс</span>
		</div>
		<button
			class="w-full flex items-center justify-center gap-2 mt-3 bg-[#131313] h-[55px] cursor-pointer rounded-md"
			@click="changeCard"
		>
			<span class="text-[24px]">💳</span><span class="text-[15px]">Изменить карту вывода</span>
		</button>
		<button
			class="w-full flex items-center justify-center gap-2 mt-3 bg-[#131313] h-[55px] cursor-pointer rounded-md"
			@click="payout"
		>
			<span class="text-[24px]">🚀</span><span class="text-[15px]">Вывести средства</span>
		</button>
		<h1 class="text-xl py-4">
			Выплаты
		</h1>
		<PaymentsList :items="payoutList" />
	</div>
	<VLoader
		bg="backdrop-blur-[2px]"
		text="считаем деньги 💸"
		:is-loading="isLoading"
	/>
</template>

<script setup lang="ts">
	// import { IconStat, IconWallet, IconMessage } from '@/shared/components/Icon'
	import { StatusVariable } from '@/shared/components/Status/config'
	// import MusicList from '@/widgets/music-list/MusicList.vue'
	import PaymentsList from 'features/order-music/ui/PaymentsList.vue'

	// import { useRoute } from 'vue-router'
	import { useDJStore } from 'entities/dj'
	import { ref, onMounted, computed } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'
	import VLoader from '@/shared/components/Loader/VLoader.vue'

	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { user } = storeToRefs(sessionStore)
	const router = useRouter()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const payoutList = ref<any>([])

	const changeCard = () => {
		router.push({ name: 'edit-card', params: { flow: 'dj' } })
	}
	const payout = () => {
		router.push({ name: 'payout', params: { flow: 'dj' } })
	}
	const isLoading = computed(() => djStore.isLoading)

	onMounted(async () => {
		if (user.value?.is_dj && user.value.dj) {
			const payouts = await djStore.fetchDJPayouts(+user.value.dj.id)
			// const tracks = await djStore.fetchTracks(+user.value.dj.id)
			if (payouts) {
				for (let payout of payouts.reverse()) {
					// const track = tracks.find(track => +track.id === +order.track_id)
					payoutList.value.push({
						id: +payout.id,
						photo: '/cabinet_bg.png',
						title: `-${payout.amount}₽`,
						// format payout.processed_at
						text: new Date(payout.created_at).toLocaleDateString(),
						statusColor:
							payout.status === 'pending'
								? ('orange' as StatusVariable)
								: payout.status === 'processed'
									? ('green' as StatusVariable)
									: ('red' as StatusVariable),
						statusText:
							payout.status === 'pending'
								? 'Ожидание'
								: payout.status === 'processed'
									? 'Успешно'
									: 'Отклонено'
					})
				}
			}
		}
	})
</script>

<style scoped></style>
