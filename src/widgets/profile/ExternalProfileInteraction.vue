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
			<div>
				<VButton
					:color="ButtonColors.Green"
					class="mt-[20px] m-[auto]"
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
					<label
						class="text-sm font-medium text-gray-700"
					>Треки диджея</label>
				</div>
				<VCard
					v-for="track in djStore.currentDJ?.tracks"
					:key="track.id"
					:title="track.name"
					:text="`Добавлен: ${new Date(track.created_at).toLocaleDateString()}`"
					:photo="'/public/cabinet_bg.png'"
				/>
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
import { onMounted, ref, computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import { useSessionStore } from '@/entities/session/model/session.store'
import { useDJStore } from '@/entities/dj/model/dj.store'
// import { storeToRefs } from 'pinia'
import { IconMusic, IconWorld } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'
import { VLoader } from 'shared/components/Loader'

const imageSrc = ref('/DjConnect/cabinet_bg.png')
const router = useRouter()
const route = useRoute()
const djStore = useDJStore()
const isLoading = computed(() => djStore.isLoading)
// Fetch DJ tracks if query is DJ

onMounted(async () => {

	const id =  route.params.id
	if ((id && !djStore.currentDJ) || djStore.currentDJ?.id !== +id) {
		await djStore.fetchDJProfile(+id)
	}
})

const orderTrack = () => {
  router.push({ name: 'order', params: { id: route.params.id } })
}

</script>

<style scoped></style>