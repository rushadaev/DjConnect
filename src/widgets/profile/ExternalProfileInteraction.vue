<template>
	<div class="mb-[80px]">
		<div class="fixed top-0 left-0 w-full h-[350px] z-0">
			<img
				v-if="currentDJ?.photo_url"
				:src="currentDJ?.photo_url"
				alt=""
				class="w-full h-full object-cover"
			>
			<img
				v-else
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
			<div class="flex justify-between items-center mb-[20px] px-[20px]">
				<div class="flex flex-col font-['Unbounded']">
					<VClipboard :text-to-copy="getLink">
						<span
							class="text-white text-2xl font-bold font-['Unbounded']"
						>
							{{ `${currentDJ?.stage_name}` }}
						</span>
					</VClipboard>
					<span class="text-[#FFFFFF30] text-sm font-light">
						Просмотров за месяц: более
						{{ currentDJ?.views }}
					</span>
				</div>
			</div>
			<div
				class="bg-blackContent bg-opacity-70 backdrop-blur-md p-[25px] rounded-t-[20px]"
			>
				<div
					class="text-xl font-light font-['Montserrat'] whitespace-break-spaces mb-10"
				>
					{{ currentDJ?.description }}
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
			</div>
		</div>
		<VLoader
			v-if="isLoading"
			:is-loading="isLoading"
			bg="bg-black"
			text="Загрузка профиля"
		/>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, computed } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { useDJStore } from '@/entities/dj/model/dj.store'
	import { IconMusic } from 'shared/components/Icon'
	import { VButton, ButtonColors } from 'shared/components/Button'
	import { VLoader } from 'shared/components/Loader'
	import VClipboard from 'shared/components/Clipboard/VClipboard.vue'
	import { storeToRefs } from 'pinia'

	const router = useRouter()
	const route = useRoute()
	const djStore = useDJStore()
	const isLoading = computed(() => djStore.isLoading)
	const { currentDJ } = storeToRefs(djStore)
	// Fetch DJ tracks if query is DJ

	onMounted(async () => {
		const id = route.params.id

		if ((id && !currentDJ.value) || currentDJ?.value?.id !== +id) {
			await djStore.fetchDJProfile(+id)
		}
	})

	const orderTrack = () => {
		router.push({
			name: 'order',
			params: { id: route.params.id, flow: 'user' }
		})
	}

	const getLink = computed(() => {
		if (route.params.id) {
			return `https://t.me/DjConnect_bot/track?startapp=dj_${route.params.id}`
		}
		return ''
	})
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
