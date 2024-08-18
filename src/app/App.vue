<template>
	<div class="bg-black">
		<VLoader
			v-if="isLoading"
			:is-loading="isLoading"
			bg="bg-black"
			text="DJ Connect"
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
			<router-view />
		</component>
	</div>
</template>

<script setup lang="ts">
	import { shallowRef, watch, type Component, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { MainLayout } from './layouts'
	import { useLocaleStore } from '@/shared/lib/i18n'
	import { useSessionStore } from '@/entities/session/model/session.store'
	import { storeToRefs } from 'pinia'
	import { twa } from '@/shared/lib/api/twa'
	import { VLoader } from '@/shared/components/Loader'

	const localeStore = useLocaleStore()
	localeStore.initializeLocale('ru')

	const sessionStore = useSessionStore()
	const { isLoading, error } = storeToRefs(sessionStore)

	const route = useRoute()
	const flow = route.params.flow ?? 'user'
	const router = useRouter()

	const layout = shallowRef<Component>(MainLayout)

	watch(
		() => route?.meta?.layout,
		newLayoutComponent => {
			layout.value = newLayoutComponent || MainLayout
		}
	)

	onMounted(async () => {
		await sessionStore.initSession()
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
		}
		//route.query.role
	})

	function goToNextRoute(nextRoute: string, id: string) {
		router.push({ name: nextRoute, params: { id, flow } })
	}
</script>

<style lang="scss" src="shared/styles/index.scss" />
