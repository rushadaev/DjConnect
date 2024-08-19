<template>
	<div
		v-if="djStore?.currentDJ?.price && orders.length && !stepSubmitted && !isLoading"
		class="px-6 pt-11 pb-4 overflow-y-auto"
	>
		<div class="relative h-[350px] overflow-hidden">
			<img
				src="/cabinet_bg.png"
				alt=""
				class="absolute inset-0 w-full h-full object-cover"
			>
		</div>
		<div
			class="flex justify-between pt-6 pb-3"
		>
			<h1
				v-if="user?.is_dj && flow !== 'user'"
				class="text-2xl"
			>
				Заказ №{{ route.params.id }}👇
			</h1>
			<h1
				v-else
				class="text-2xl"
			>
				Заказ №{{ route.params.id }}
			</h1>
			<!-- container centralized for status vertical and horizontally -->
			<div class="flex flex-col items-center justify-center">
				<VStatus
					:color="statusColor"
				>
					{{ statusText }}
				</VStatus>
			</div>
		</div>
		<OrderList
			:title-full="true"
			:items="orders"
		/>

		<div
			v-if="orders[0]?.message.length > 0"
			class="text-xs bg-lightGrey bg-opacity-50 p-3 italic rounded-md"
		>
			📨 {{ orders[0]?.message }}
		</div>
		<CustomPriceInput
			v-if="orders.length && djStore?.currentDJ?.price"
			v-model:modelValue="newPrice"
			label="Стоимость за трек"
			class="py-3"
			:price-change-allowed="priceChangeAllowed"
			:disabled="!priceChangeAllowed || !user?.is_dj && flow !== 'user' "
			:min-price="djStore.currentDJ.price"
		/>
		<CustomTextInput
			v-if="orders.length && (user?.is_dj && flow !== 'user' && djWantsToChangeMessage || (!user?.is_dj && flow !== 'user' && newMessage ))"
			v-model:modelValue="newMessage"
			label="Сообщение от диджея:"
			class="pt-2"
			:disabled="incorrectOrderState || !user?.is_dj && flow !== 'user'"
		/>
		<VButton
			v-if="!djFlow && orders[0].is_paid"
			type="button"
			:color="ButtonColors.Green"
			class="mt-4 mb-4"
			@click="goToOrderMusicPage"
		>
			<span class="flex gap-[5px] items-center">
				Заказать еще
			</span>
		</VButton>
		<VButton
			v-if="!djFlow && !orders[0].is_paid && orders[0]?.transactions?.length"
			type="button"
			:color="ButtonColors.Blue"
			class="mt-4 mb-4"
			@click="payForOrder"
		>
			<span class="flex gap-[5px] items-center">
				Оплатить
			</span>
		</VButton>
		<div
			v-if="!incorrectOrderState"
			class="flex flex-col items-start justify-start"
		>
			<VButton
				v-if="!djWantsToChangeMessage && djFlow"
				type="button"
				:color="ButtonColors.Green"
				class="mt-2"
				@click="acceptOrder"
			>
				<span class="flex gap-[5px] items-center">
					<IconChecked icon-color="#131313" />
					Принять заказ
				</span>
			</VButton>
			<VButton
				v-if="!priceChangeAllowed && djFlow"
				type="button"
				:color="ButtonColors.Blue"
				class="mt-2"
				@click="increaseOrderPrice"
			>
				<span class="flex gap-[5px] items-center">
					<IconLightningRing icon-color="#131313" />
					Поднять стоимость
				</span>
			</VButton>
			<VButton
				v-if="!djWantsToChangeMessage && !priceChangeAllowed && orders[0].status == 'pending'"
				type="button"
				:color="ButtonColors.Red"
				class="mt-2 border-red-custom"
				@click="cancelOrder"
			>
				<span class="flex gap-[5px] items-center">
					<IconClose :icon-color="ButtonColors.Red" />
					{{ djFlow ? 'Отказать' : 'Отменить заказ' }}
				</span>
			</VButton>
			<VButton
				v-if="!djWantsToChangeMessage && djFlow"
				type="button"
				:color="ButtonColors.White"
				class="mt-2"
				@click="startWritingMessage"
			>
				<span class="flex gap-[5px] items-center">
					<IconMessage icon-color="#131313" />
					Написать сообщение
				</span>
			</VButton>
			<!-- отправить сообщение -->
			<VButton
				v-if="djWantsToChangeMessage"
				type="button"
				:color="ButtonColors.Green"
				class="mt-2"
				@click="acceptOrder"
			>
				<span class="flex gap-[5px] items-center">
					<IconMessage icon-color="#131313" />
					Отправить сообщение
				</span>
			</VButton>
		</div>
	</div>
	<div
		v-if="stepSubmitted && !isLoading"
		class="flex items-center justify-center h-[100vh]"
	>
		<div class="px-6 pt-11 pb-4">
			<div
				class="flex flex-col justify-center items-center py-[170px] text-7xl"
			>
				<span class="text-7xl">💿</span>
				<span class="text-lg mt-4">🎉 Заказ отправлен</span>
				<span class="text-lg mt-4 font-bold">Ожидайте ответа от пользователя</span>
			</div>
			<VButton
				v-if="djFlow"
				type="button"
				:color="ButtonColors.Green"
				class="mb-4"
				@click="hideStepSubmitted"
			>
				<span class="flex gap-[5px] items-center">
					Вернуться к заказу
				</span>
			</VButton>
		</div>
	</div>
	<VLoader
		v-if="isLoading && !stepSubmitted"
		:is-loading="isLoading"
	/>
</template>

<script setup lang="ts">
import {  IconChecked, IconLightningRing, IconClose, IconMessage } from 'shared/components/Icon'
// import { VInput } from '@/shared/components/Input'

import { VButton, ButtonColors } from '@/shared/components/Button'
import { VStatus } from '@/shared/components/Status'
import { VLoader } from '@/shared/components/Loader'
import { StatusVariable } from '@/shared/components/Status/config'
	// import MusicList from '@/widgets/music-list/MusicList.vue'
	import OrderList from '@/features/order-music/ui/OrderList.vue'
	import CustomPriceInput from '@/features/order-music/ui/CustomPriceInput.vue'
	import CustomTextInput from '@/features/order-music/ui/CustomTextInput.vue'
	import { useRoute, useRouter } from 'vue-router'
	import { useDJStore } from 'entities/dj'
	import { ref, onMounted, computed, watch } from 'vue'
	import { useSessionStore } from 'entities/session'
	import { useOrdersStore } from 'features/order-music/model/use-orders-store'
	import { storeToRefs } from 'pinia'
import { getStatusText } from '@/shared/utils/helpers'
import { Order } from '@/features/order-music/model'
import { useSocket } from '@/shared/lib/sockets/useSocket'
	const ordersStore = useOrdersStore()
	const route = useRoute()
	const router = useRouter()
	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const flow = route.params.flow ?? 'user' // Default to 'user' if flow is not set
	const incorrectOrderState = ref(true)

	const { user } = storeToRefs(sessionStore)
	const newPrice = ref(`${Number(djStore?.currentDJ?.price)}`)
	const newMessage = ref('')
	const djWantsToChangeMessage = ref(false)
	const startWritingMessage = () => {
		djWantsToChangeMessage.value = true
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const orders = ref<any>([])
	const stepSubmitted = ref(false)

	const isLoading = computed(() => djStore.isLoading || ordersStore.isLoading)
	// watch(newMessage, (value) => {
	// 	if(value!==orders.value[0]?.message){
	// 		djWantsToChangeMessage.value = true
	// 	}
	// })

	const statusColor = ref('green' as StatusVariable)
	const statusText = ref('')
	const priceChangeAllowed = ref(false)
	// watch(newPrice, (value) => {
	// 	console.log({ newPrice: value })
	// 	if(+value > djStore?.currentDJ?.price){
	// 		priceChanged.value = true
	// 	} else {
	// 		priceChanged.value = false
	// 	}
	// })
	const djFlow = computed(() => user?.value?.is_dj && flow !== 'user')
	async function increaseOrderPrice() {
		// await ordersStore.increaseOrderPrice(+route.params.id)
		priceChangeAllowed.value = true
	}
	const acceptOrder = async () => {
		if(newPrice?.value) {
			await ordersStore.acceptOrder(+route.params.id, +newPrice?.value, newMessage?.value)
			stepSubmitted.value = true
		}
	}
	const hideStepSubmitted = () => {
		stepSubmitted.value = false
		djWantsToChangeMessage.value = false
		priceChangeAllowed.value = false
	}
	const cancelOrder = async () => {
		if(djFlow.value){
			await ordersStore.declineOrder(+route.params.id,)
		} else {
			await ordersStore.cancelOrder(+route.params.id)
		}
	}
	const goToOrderMusicPage = () => {
		router.push({ name: 'order', params: { id: order.value?.id, flow: flow } })
	}

	const payForOrder = () => {
		let link = order.value?.transactions[0]?.payment_url
		if(link){
			window.open(link, '_blank')
		}
	}

	const order = ref(ordersStore.orders.find(order => +order.id === +route.params.id))
	onMounted(async () => {
		const order = await djStore.fetchOrder(+route.params.id)
		const channelName = `order_update_${route.params.id}`
		const { data } = useSocket(channelName)
		watch(data, (newValue) => {
			if (newValue) {
				updateOrder(newValue.data.order)
			}
		})
		console.log('subscribed toALARM', channelName)
		if(user.value?.is_dj && user.value.dj && flow !== 'user') {
			await djStore.fetchDJProfile(user?.value?.dj?.id)
			newPrice.value = `${Number(djStore?.currentDJ?.price)}`

			if(order){
				updateOrder(order)
			}

		} else {
			if(!djStore.currentDJ || +djStore.currentDJ.id !== +order?.dj_id){
				await djStore.fetchDJProfile(order?.dj_id)
			}
			if(order){
				updateOrder(order)
			}

		}

	})

	// const listenForOrderUpdates = () => {
    //   const eventSource = new EventSource(`https://dj-connect.xyz/order-updates/${route.params.id}`)

    //   eventSource.onmessage = (event) => {
	// 	let order = JSON.parse(event.data)
	// 	updateOrder(order)
    //   }
    // }

	const updateOrder = (orderUpdated: Order) => {
		orders.value = []
		orders.value.push({
					id: orderUpdated.id,
					photo: '/cabinet_bg.png?url',
					title: orderUpdated.track?.name,
					text: orderUpdated.dj.stage_name,
					is_paid: orderUpdated.is_paid,
					message: orderUpdated.message,
					transactions: orderUpdated.transactions
				})
		const { statusText: text, statusColor: color } = getStatusText(orderUpdated.status, orderUpdated.is_paid)
		//...
		incorrectOrderState.value = orderUpdated.status !== 'pending'
		statusText.value = text
		statusColor.value = color
		newMessage.value = orderUpdated.message
		newPrice.value = `${Number(orderUpdated?.price)}`
		order.value = orderUpdated
	}

</script>

<style scoped>
.border-red-custom {
	border-color: rgba(255, 63, 63, 1);
	border-width: 1px;
	border-style: solid;
}
</style>