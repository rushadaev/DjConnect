<template>
	<div class="px-6 pt-11 pb-4">
		<h1 class="text-2xl">
			Заказать трек
		</h1>
		<p
			v-if="currentStep === 1"
			class="flex flex-col justify-center items-center py-[170px] text-7xl"
		>
			<span>💿</span>
		</p>
		<div
			v-if="currentStep === 1"
			class="flex-grow"
		>
			<div class="mb-4">
				<!-- <label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label> -->
				<div
					class="flex-col gap-4 mb-2"
				>
					<VInput
						v-model="djData.name"
						:disabled="true"
						class="flex-1 text-base"
						label=""
					/>
					<VInput
						v-model="djData.price"
						:disabled="true"
						class="flex-1 text-base"
						label=""
					/>
					<VButton
						:color="ButtonColors.Green"
						class="mt-[20px] m-[auto]"
						@click="handleNextStep"
					>
						<span class="flex gap-[5px] items-center">
							<IconMusic icon-color="#131313" />
							Предложить
						</span>
					</VButton>
				</div>
			</div>
		</div>

		<!-- Step 2 -->
		<p
			v-if="currentStep === 2"
			class="flex flex-col justify-center items-center py-[170px]"
		>
			<span class="text-7xl">⌛</span>
			<span class="text-base my-4">Выберите нужный трек</span>
		</p>
		<div
			v-if="currentStep === 2"
			class="flex-grow"
		>
			<div class="mb-4">
				<!-- <label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label> -->
				<div
					class="flex-col gap-4 mb-2"
				>
					<VDropdown
						class="flex-1 text-base text-white"
						:options="djData.tracks"
						:on-change="onSelect"
					/>
					<VButton
						v-if="djStore.selectedTrack"
						:color="ButtonColors.Green"
						class="mx-auto mt-5"
						@click="handleNextStep"
					>
						<span class="flex gap-[5px] items-center">
							<IconWallet icon-color="#131313" />
							Оплатить
						</span>
					</VButton>
				</div>
			</div>
		</div>

		<!-- Step 3 -->
		<p
			v-if="currentStep === 3"
			class="flex flex-col justify-center items-center py-[170px]"
		>
			<span class="text-7xl">⌛</span>
			<span class="text-base my-4">В течение 15 минут диджей поставит ваш трек. Благодарим за заказ.</span>
		</p>
		<div
			v-if="currentStep === 3"
			class="flex-grow"
		>
			<div class="mb-4">
				<!-- <label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label> -->
				<div
					class="flex-col gap-4 mb-2"
				>
					<VButton
						:color="ButtonColors.Green"
						class="mx-auto mt-5"
						@click="handleNextStep"
					>
						<span class="flex gap-[5px] items-center">
							<IconHome icon-color="#131313" />
							На главную
						</span>
					</VButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { VInput } from 'shared/components/Input'
import { useDJStore } from 'entities/dj'
import { VButton, ButtonColors } from 'shared/components/Button'
import {  IconMusic, IconHome, IconWallet } from 'shared/components/Icon'
import VDropdown, { DropdownOption } from 'shared/components/Dropdown/VDropdown.vue'
import { useRoute, useRouter } from 'vue-router'

const djStore = useDJStore()
const djData = ref({
	name: `${djStore.currentDJ?.stage_name}`,
	price: `${Math.floor(djStore.currentDJ?.price || 0)} ₽`,
	tracks: djStore.tracks.map(track => ({ label: track.name, value: `${track.id}`, additional: `${Math.floor(djStore.currentDJ?.price || 0)} ₽` } as DropdownOption))
})

const currentStep = ref(1)
const stepSubmitted = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSelect = (val: any) => {
	djStore.selectTrack(val)
}
const router = useRouter()
const route = useRoute()

const handleNextStep = () => {
  stepSubmitted.value = true

    if (currentStep.value < 3) {
		currentStep.value++
		stepSubmitted.value = false
		if(currentStep.value === 3) {
			if(djStore.selectedTrack) {
					djStore.orderTrackRequest().then(() => {
						console.log('djStore.orderTrackRequest() finished with success')
					}).catch((e)=>{
					console.log(e)
				})
			}else {
				currentStep.value--
			}
		}
    } else {
		router.push({ name: 'dj-profile', params: { id: route.params.id } })
    }
}

const buttonClass = ref(`mt-[${djStore.tracks.length*30}px] m-[auto]`)
// const buttonMarginRef = ref(`${djStore.tracks.length*10}px`)

// const sessionStore = useSessionStore()
// const { user } = storeToRefs(sessionStore)

onMounted(async () => {
	const id = route.params.id
	if (id) {
		await djStore.fetchDJProfile(+id)
		const tracksList = await djStore.fetchTracks(+id)
		buttonClass.value = `mt-[${tracksList.length * 30}px] m-[auto]`
	}
}
)
</script>

<style scoped>
.margin-button-dynamic {
  /* margin-top: v-bind(buttonMarginRef); */
}
</style>