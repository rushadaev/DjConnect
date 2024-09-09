<template>
	<div
		v-if="!isLoading"
		class="mb-[80px]"
	>
		<div class="fixed top-0 left-0 w-full h-[350px] z-0">
			<img
				src="/cabinet_bg.png"
				alt=""
				class="w-full h-full object-cover"
			>
			<!-- Gradient overlay -->
			<div
				class="absolute inset-0 bg-gradient-to-b from-transparent to-blackContent"
			/>
		</div>
		<div class="relative z-10 pt-[250px]">
			<div
				class="bg-blackContent bg-opacity-70 backdrop-blur-md p-[25px] rounded-t-[20px]"
			>
				<div class="flex justify-between gap-[10px]">
					<div class="flex flex-col items-center justify-center">
						<span class="text-white text-xxl">{{
							'DJ ' + djStore.currentDJ?.stage_name
						}}</span>
					</div>
					<div class="flex gap-[10px] justify-center items-center">
						<a
							class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
							target="_blank"
							rel="noopener noreferrer"
							@click.prevent="copyLink"
						>
							<IconWorld
								v-if="!copiedNotification"
								icon-color="white"
								class="w-[18px] h-[18px]"
							/>
							<div
								v-if="copiedNotification"
								class="text-white text-xs"
							>✔️
							</div>
						</a>
					</div>
				</div>
				<div>
					<VButton
						:color="ButtonColors.Green"
						class="mt-[20px] m-[auto] mb-4"
						@click="orderTrack"
					>
						<span class="flex gap-[5px] items-center">
							<IconMusic icon-color="#131313" />
							Заказать трек
						</span>
					</VButton>
				</div>
				<div
					v-if="djStore.currentDJ"
					class="mt-[12px] flex flex-col gap-[5px]"
				>
					<div class="flex flex-col w-full gap-1">
						<label class="text-sm font-medium text-gray-700">Треки диджея</label>
					</div>
					<VCard
						v-for="track in djStore.currentDJ?.tracks as Track[]"
						:key="track.id"
						:title="track.name"
						:text="`Добавлен: ${new Date(track.created_at).toLocaleDateString()}`"
						:photo="'/cabinet_bg.png'"
					/>
				</div>
			</div>
		</div>
	</div>
	<VLoader
		v-if="isLoading"
		:is-loading="isLoading"
		bg="bg-black"
		text="DJ Connect"
	/>
</template>

<script setup lang="ts">
	import { onMounted, computed, ref } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	// import { useSessionStore } from '@/entities/session/model/session.store'
	import { useDJStore } from '@/entities/dj/model/dj.store'
	// import { storeToRefs } from 'pinia'
	import { IconMusic, IconWorld } from 'shared/components/Icon'
	import { VButton, ButtonColors } from 'shared/components/Button'
	import { VCard } from 'shared/components/Card'
	import { VLoader } from 'shared/components/Loader'
	import { Track } from '@/entities/dj'

	const router = useRouter()
	const route = useRoute()
	const djStore = useDJStore()
	const copiedNotification = ref(false)
	const isLoading = computed(() => djStore.isLoading)
	// Fetch DJ tracks if query is DJ

	onMounted(async () => {
		const id = route.params.id
		if ((id && !djStore.currentDJ) || djStore.currentDJ?.id !== +id) {
			await djStore.fetchDJProfile(+id)
		}
	})

	const orderTrack = () => {
		router.push({
			name: 'order',
			params: { id: route.params.id, flow: 'user' }
		})
	}
	const copyLink = () => {
		if (route.params.id) {
			const link = `https://t.me/DjConnect_bot/track?startapp=dj_${route.params.id}`
			navigator.clipboard.writeText(link)
			copiedNotification.value = true

			setTimeout(() => {
				copiedNotification.value = false
			}, 3000)
		}
	}
</script>

<style scoped>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
