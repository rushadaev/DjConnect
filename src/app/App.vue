<template>
	<div class="main-block bg-black h-[100dvh]">
		<VLoader
			v-if="isLoading"
			:is-loading="isLoading"
			bg="bg-black"
			text="order me"
		/>
		<div
			v-else-if="error"
			class="flex items-center justify-center h-screen"
		>
			<p class="text-xl text-red-500">
				Ошибка: {{ error }}
			</p>
		</div>
		<component
			:is="layout"
			v-else
		>
			<router-view :key="$route.fullPath" />
		</component>
	</div>
</template>

<script setup lang="ts">
	import {
		shallowRef,
		watch,
		type Component,
		onMounted,
		ref,
		watchEffect
	} from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { MainLayout } from './layouts'
	import { useLocaleStore } from '@/shared/lib/i18n'
	import { useSessionStore } from '@/entities/session/model/session.store'
	import { storeToRefs } from 'pinia'
	import { twa } from '@/shared/lib/api/twa'
	import { VLoader } from '@/shared/components/Loader'
	import { useSocket } from '@/shared/lib/sockets/useSocket'

	const localeStore = useLocaleStore()
	localeStore.initializeLocale('ru')

	const sessionStore = useSessionStore()
	const { isLoading, error, user } = storeToRefs(sessionStore)

	const route = useRoute()
	const flow = ref(route.params.flow)
	const isReady = ref(false)
	const router = useRouter()

	const layout = shallowRef<Component>(MainLayout)

	watch(
		() => route?.meta?.layout,
		newLayoutComponent => {
			layout.value = newLayoutComponent || MainLayout
		}
	)

	const activeSocketUnMount = ref<any>()

	onMounted(async () => {
		await sessionStore.initSession()
	})
	const initApp = async () => {
		await twa?.ready()
		if (twa?.initDataUnsafe.start_param) {
			console.log('startparam', twa?.initDataUnsafe.start_param)
			const startParam = twa?.initDataUnsafe.start_param

			const getPrefix = startParam.split('_')[0]
			const id = startParam.split('_')[1]

			switch (getPrefix) {
				case 'dj':
					goToNextRoute('dj-profile', id)
					break
				case 'order':
					goToNextRoute('review-order', id)
					break
				default:
					break
			}

			//remove prefix after redirect
			twa.initDataUnsafe.start_param = ''
		}

		subscribeToSocket()
	}

	watchEffect(() => {
		const routeFlow = route.params.flow
		flow.value = routeFlow
		console.log('routerFlow', route.params)
		if (routeFlow && user.value) {
			isReady.value = true
			initApp()
		}
	})
	export type PopupButton = {
		id?: string
		type: 'default' | 'destructive'
		text: string
	}

	const subscribeToSocket = () => {
		if (flow.value === 'dj' && user.value?.dj) {
			twa?.SettingsButton.show()
			twa?.SettingsButton.onClick(() => {
				router.push({ name: 'dj-profile-edit', params: { flow: 'dj' } })
			})

			const dj_id = user.value?.dj?.id
			const channelName = `order_created_${dj_id}`
			if (activeSocketUnMount.value) {
				activeSocketUnMount.value()
			}
			const { data, unmount: unMountDj } = useSocket(channelName)
			activeSocketUnMount.value = unMountDj
			watch(data, newData => {
				if (newData) {
					const order = newData.data.order
					twa?.showPopup(
						{
							title: 'Новый заказ',
							message: `У вас новый заказ на трек ${order.track.name} за ${order.price}₽`,
							buttons: [
								{
									id: 'cancel',
									text: 'Позже',
									type: 'destructive'
								},
								{
									id: 'success',
									text: 'Перейти к заказу',
									type: 'default'
								}
							]
						},
						buttonId => {
							if (buttonId === 'success') {
								router.push({
									name: 'review-order',
									params: { id: order.id, flow: flow.value }
								})
							}
						}
					)
				}
			})

			const { data: orderData, unmount: unMountOrder } = useSocket(
				`order_updated_dj_${dj_id}`
			)
			activeSocketUnMount.value = unMountOrder
			watch(orderData, newData => {
				if (newData) {
					const order = newData.data.order
					if (order.is_paid && !order.time_slot) {
						twa?.showPopup(
							{
								title: '🎉 Заказ оплачен',
								message: `Заказ на трек ${order.track.name} за ${order.price}₽ оплачен! Ожидаем ввод времени от пользователя!`,
								buttons: [
									{
										id: 'success',
										text: 'Супер!',
										type: 'default'
									}
								]
							},
							buttonId => {
								if (buttonId === 'success') {
									console.log('success')
								}
							}
						)
					} else if (order.time_slot) {
						twa?.showPopup(
							{
								title: '🎉 Время указано',
								message: `Пользователь просит воспроизвести трек ${order.track.name} в ${order.time_slot.slice(11, 16)}`,
								buttons: [
									{
										id: 'success',
										text: 'Супер!',
										type: 'default'
									},
									{
										id: 'goToOrder',
										text: 'Перейти к заказу',
										type: 'default'
									}
								]
							},
							buttonId => {
								if (buttonId === 'goToOrder') {
									router.push({
										name: 'review-order',
										params: {
											id: order.id,
											flow: flow.value
										}
									})
								}
							}
						)
					}
				}
			})
		} else if (flow.value === 'user' && user.value?.id) {
			const channelName = `order_updated_user_${user.value?.id}`
			if (activeSocketUnMount.value) {
				activeSocketUnMount.value()
			}
			const { data, unmount: unMountUser } = useSocket(channelName)
			activeSocketUnMount.value = unMountUser
			watch(data, newData => {
				if (newData) {
					const order = newData.data.order
					if (order.is_paid && !order.time_slot) {
						twa?.showPopup(
							{
								title: '⌚️Укажите время',
								message: `Вы оплатили заказ на трек ${order.track.name}. Теперь укажите время воспроизведения!`,
								buttons: [
									{
										id: 'success',
										text: 'Супер!',
										type: 'default'
									}
								]
							},
							buttonId => {
								if (buttonId === 'success') {
									console.log('success')
								}
							}
						)
					} else {
						let isCurrentRouteIsOrder =
							router.currentRoute.value.name === 'review-order'
						let buttons = []
						if (isCurrentRouteIsOrder) {
							buttons = [
								{
									id: 'success',
									text: 'Супер!',
									type: 'default'
								}
							]
						} else {
							buttons = [
								{
									id: 'cancel',
									text: 'Позже',
									type: 'destructive'
								},
								{
									id: 'success',
									text: 'Перейти к заказу',
									type: 'default'
								}
							]
						}

						twa?.showPopup(
							{
								title: 'Заказ обновлен',
								message: `Ваш заказ на трек ${order.track.name} за ${order.price}₽ обновлен!`,
								buttons: buttons as PopupButton[]
							},
							buttonId => {
								if (buttonId === 'success') {
									router.push({
										name: 'review-order',
										params: {
											id: order.id,
											flow: flow.value
										}
									})
								}
							}
						)
					}
				}
			})
		}
	}

	function goToNextRoute(nextRoute: string, id: string) {
		router.push({ name: nextRoute, params: { id, flow: flow.value } })
	}
</script>

<style lang="scss" src="shared/styles/index.scss" />
