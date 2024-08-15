<template>
	<div
		v-if="!isLoading"
		class="mb-[80px]"
	>
		<div class="relative h-[350px] overflow-hidden">
			<img
				:src="imageSrc"
				alt=""
				class="absolute inset-0 w-full h-full object-cover"
			>
		</div>
		<div class="bg-blackContent p-[25px]">
			<div class="flex justify-between gap-[10px]">
				<div class="flex flex-col items-center justify-center">
					<span class="text-white text-xxl">{{ 'DJ ' + djStore.currentDJ?.stage_name }}</span>
				</div>
				<div class="flex gap-[10px] justify-center items-center">
					<a
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
						:href="djStore.currentDJ?.website"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconWorld
							icon-color="white"
							class="w-[18px] h-[18px]"
						/>
					</a>
				</div>
			</div>
			<div
				v-if="djStore.currentDJ"
				class="mt-[12px] flex flex-col gap-[5px]"
			>
				<VCard
					v-for="track in djStore.tracks"
					:key="track.id"
					:title="track.name"
					:text="`Добавлен: ${new Date(track.created_at).toLocaleDateString()}`"
					:photo="'/public/cabinet_bg.png'"
				/>
			</div>
			<div>
				<VButton
					:color="ButtonColors.Green"
					class="mt-[20px] m-[auto]"
					@click="becomeDJ"
				>
					<span class="flex gap-[5px] items-center">
						<IconMusic icon-color="#131313" />
						Заказать трек
					</span>
				</VButton>
			</div>
		</div>
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
import { onMounted, ref, computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import { useSessionStore } from '@/entities/session/model/session.store'
import { useDJStore } from '@/entities/dj/model/dj.store'
// import { storeToRefs } from 'pinia'
import { IconMusic, IconWorld } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'

const imageSrc = ref('/DjConnect/cabinet_bg.png')
const router = useRouter()
const route = useRoute()
const djStore = useDJStore()
const isLoading = computed(() => djStore.isLoading)
// Fetch DJ tracks if query is DJ

onMounted(async () => {

	const id =  route.params.id
	if (id) {
		await djStore.fetchDJProfile(+id)
		await djStore.fetchTracks(+id)
	}
})

const becomeDJ = () => {
  router.push({ name: 'order', params: { id: route.params.id } })
}

</script>

<style scoped></style>