<template>
	<div class="mb-[80px]">
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
						<IconGmail
							icon-color="white"
							class="w-[18px] h-[18px]"
						/>
					</a>
					<a
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
						:href="djStore.currentDJ?.website"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconTelegram
							class="w-[18px] h-[18px]"
							icon-color="#0085FF"
						/>
					</a>
					<a
						:href="djStore.currentDJ?.website"
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconGoogle
							icon-color="#28B447"
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import { useSessionStore } from '@/entities/session/model/session.store'
import { useDJStore } from '@/entities/dj/model/dj.store'
// import { storeToRefs } from 'pinia'
import {  IconGoogle, IconMusic, IconTelegram, IconGmail } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'

const imageSrc = ref('/DjConnect/cabinet_bg.png')
const router = useRouter()
const route = useRoute()
const djStore = useDJStore()

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