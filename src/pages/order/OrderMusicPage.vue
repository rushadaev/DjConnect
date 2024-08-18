<template>
	<div
		class="px-6 pt-11 pb-4"
	>
		<h1 class="text-2xl">
			Заказ трека
		</h1>
		<p
			v-if="currentStep === 1 && !isLoading"
			class="flex flex-col justify-center items-center pt-[30px] pb-[20px] text-7xl"
		>
			<span>💿</span>
		</p>
		<div
			v-if="currentStep === 1 && !isLoading"
			class="flex-grow"
		>
			<div class="mb-4">
				<!-- <label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label> -->
				<div
					class="flex-col gap-4 mb-2"
				>
					<CustomPriceInput
						v-if="djStore?.currentDJ?.price"
						v-model:modelValue="newPrice"
						label="Укажите сумму которую вы готовы заплатить за трек"
						class="py-3"
						:price-change-allowed="true"
						:min-price="djStore.currentDJ.price"
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
			v-if="currentStep === 2 && !isLoading"
			class="flex flex-col justify-center items-center pt-[30px] pb-[30px] text-7xl"
		>
			<span>⌛</span>
		</p>
		<div
			v-if="currentStep === 2 && !isLoading"
			class="flex-grow"
		>
			<div class="mb-4">
				<!-- <label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label> -->
				<div
					class="flex-col gap-4 mb-2"
				>
					<div class="flex flex-col w-full gap-1">
						<label
							class="text-sm font-medium text-gray-700 pb-4"
						>Выберите трек из списка</label>
					</div>
					<VDropdown
						v-model="djStore.selectedTrack"
						class="flex-1 text-base text-white"
						:options="djData.tracks"
						:on-change="onSelect"
					/>
					<div class="text-center mt-4">
						<span class="or-text">или</span>
					</div>
					<VInput
						v-model="customTrack"
						label="Введите свой трек"
						required
						@change="customTrackUpdate"
					/>
					<div class="mt-4">
						<label
							class="text-sm font-medium text-gray-700"
						>Сообщение</label>
						<CustomTextInput
							v-model:modelValue="message"
							:show-label="false"
							class="py-3"
						/>
					</div>
					<div
						v-if="djStore.selectedTrack || customTrack"
						class="flex flex-col gap-3"
					>
						<div class="text-sm font-medium text-gray-700 mt-10 flex flex-col gap-2">
							<div>Выбранный трек: <b class="font-bold">{{ djStore.selectedTrack?.name || customTrack }}</b></div>
							<div>Стоимость: <b class="font-bold">{{ newPrice }} ₽</b></div>
						</div>
						<VButton
							:color="ButtonColors.Green"
							class="mx-auto mt-5"
							@click="handleSubmitForm"
						>
							<span class="flex gap-[5px] items-center justify-center">
								<IconWallet icon-color="#131313" />
								Отправить на согласование
							</span>
						</VButton>
					</div>
				</div>
			</div>
		</div>

		<!-- Step 3 -->
		<VLoader
			v-if="isLoading"
			:is-loading="isLoading"
		/>
		<p
			v-if="currentStep === 3 && !isLoading"
			class="flex flex-col justify-center items-center py-[170px]"
		>
			<span class="text-7xl">💿</span>
			<span class="text-lg mt-4">🎉 Заказ отправлен</span>
			<span class="text-lg mt-4 font-bold">Ожидайте ответа от диджея</span>
		</p>
		<div
			v-if="currentStep === 3 && !isLoading"
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
						@click="orderMore"
					>
						<span class="flex gap-[5px] items-center">
							Заказать еще
						</span>
					</VButton>
					<VButton
						:color="ButtonColors.Green"
						class="mx-auto mt-5"
						@click="closeModal"
					>
						<span class="flex gap-[5px] items-center">
							Закрыть окно
						</span>
					</VButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { VInput } from 'shared/components/Input'
import { useDJStore } from 'entities/dj'
import { VButton, ButtonColors } from 'shared/components/Button'
import {  IconMusic, IconHome, IconWallet } from 'shared/components/Icon'
import VDropdown, { DropdownOption } from 'shared/components/Dropdown/VDropdown.vue'
import { useRoute, useRouter } from 'vue-router'
import CustomPriceInput from '@/features/order-music/ui/CustomPriceInput.vue'
import CustomTextInput from '@/features/order-music/ui/CustomTextInput.vue'
import { VLoader } from '@/shared/components/Loader'
import { twa } from '@/shared/lib/api/twa'
import { useSessionStore } from '@/entities/session'
import { storeToRefs } from 'pinia'

const djStore = useDJStore()
const { customTrack } = storeToRefs(djStore)
const sessionStore = useSessionStore()

const djData = computed(()=>({
	name: `${djStore.currentDJ?.stage_name}`,
	price: `${Math.floor(djStore.currentDJ?.price || 0)} ₽`,
	tracks: djStore.tracks.map(track => ({ label: track.name, value: `${track.id}`, additional: `${Math.floor(djStore.currentDJ?.price || 0)} ₽` } as DropdownOption))
}))

const newPrice = ref(`${Number(djStore?.currentDJ?.price)}`)
const message = ref('')

const isLoading = computed(() => djStore.isLoading)
const currentStep = ref(1)
const stepSubmitted = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSelect = (val: any) => {
	djStore.selectTrack(val)
	djStore.clearCustomTrack()
}
const customTrackUpdate = () => {
	djStore.clearSelectedTrack()
}
const router = useRouter()
const route = useRoute()

const handleNextStep = () => {
	if(!newPrice.value || Number(newPrice.value) < Number(djStore.currentDJ?.price)) {
		return
	}
  stepSubmitted.value = true
    if (currentStep.value < 3) {
		currentStep.value++
		stepSubmitted.value = false
    } else {
		router.push({ name: 'dj-profile', params: { id: route.params.id } })
    }
}

const handleSubmitForm = () => {
	twa?.showPopup({
		title: 'Подтверждение заказа',
		message: `Вы уверены, что хотите заказать трек ${djStore.selectedTrack?.name || customTrack.value} за ${newPrice.value} ₽?`,
		buttons: [{ id:'cancel', text: 'Отмена', type: 'destructive' }, { id:'success', text: 'Подтвердить', type: 'default' }],
	}, (buttonId) => {
		if (buttonId === 'success') {
			if((djStore.selectedTrack || djStore.customTrack ) && newPrice.value) {
				djStore.orderTrackRequest(+newPrice.value, message.value).then(async () => {
					console.log('djStore.orderTrackRequest() finished with success')
					currentStep.value++
					twa?.showAlert('🎉 Заказ успешно отправлен')
					await updateTracks()
				}).catch((e)=>{
					twa?.showAlert('Произошла ошибка. Попробуйте позже')
					console.log(e)
				})
			}
		}})
}

const buttonClass = ref(`mt-[${djStore.tracks.length*30}px] m-[auto]`)
// const buttonMarginRef = ref(`${djStore.tracks.length*10}px`)

// const sessionStore = useSessionStore()
// const { user } = storeToRefs(sessionStore)

const backButtonCallback = () => {
	if (currentStep.value > 1) {
		currentStep.value--
	} else {
		router.back()
	}
}

const orderMore = () => {
	currentStep.value = 1
}

const closeModal = () => {
	twa?.close()
}

const updateTracks = async () => {
	const id = route.params.id
	const tracksList = await djStore.fetchTracks(id)
	djData.value.tracks = tracksList.map(track => ({ label: track.name, value: `${track.id}`, additional: `${Math.floor(djStore.currentDJ?.price || 0)} ₽` } as DropdownOption))
	buttonClass.value = `mt-[${tracksList.length * 30}px] m-[auto]`
}

onMounted(async () => {
	// Null form
	djStore.clearSelectedTrack()
	djStore.clearCustomTrack()
	newPrice.value = `${Number(djStore.currentDJ?.price)}`

	const id = route.params.id
	if (id && !djStore.currentDJ) {
		const dj = await djStore.fetchDJProfile(+id)
		djData.value.name = dj.stage_name
		djData.value.price = `${Math.floor(dj.price || 0)} ₽`
		newPrice.value = `${Number(dj.price)}`
		const tracksList = dj.tracks
		djData.value.tracks = tracksList.map(track => ({ label: track.name, value: `${track.id}`, additional: `${Math.floor(dj.price || 0)} ₽` } as DropdownOption))
		buttonClass.value = `mt-[${tracksList.length * 30}px] m-[auto]`
	}

	console.log('twa', twa)
	console.log('test', currentStep.value)

	//Make back button to reduce step
	sessionStore.setNewBackButtonCallback(backButtonCallback)
}
)

onBeforeUnmount(() => {
	sessionStore.setNewBackButtonCallback(undefined, backButtonCallback)
})
</script>

<style scoped>
.margin-button-dynamic {
  /* margin-top: v-bind(buttonMarginRef); */
}
</style>