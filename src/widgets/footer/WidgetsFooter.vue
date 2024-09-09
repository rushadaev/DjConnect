<template>
	<div
		class="fixed bottom-0 w-full bg-lightGrey text-white flex justify-between py-[20px] pb-[35px] px-[20px] z-20"
	>
		<div class="flex justify-between w-full">
			<router-link
				v-for="rte in filteredRoutes"
				:key="rte.path"
				:to="{ name: rte.name, params: { flow } }"
				class="flex flex-col items-center flex-1"
				active-class="text-routerLime"
			>
				<span class="w-[23px] h-[27px] mb-[6px]">{{ rte.icon }}</span>
				<span class="text-xs">{{ rte.label }}</span>
			</router-link>
			<a
				key="support"
				href="https://t.me/dmitrynovikov21"
				class="flex flex-col items-center flex-1"
				active-class="text-routerLime"
			>
				<span class="w-[23px] h-[27px] mb-[6px]">🔊</span>
				<span class="text-xs">Поддержка</span>
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect } from 'vue'
	import { RouteRecordRaw, useRoute } from 'vue-router'
	import { useSessionStore } from '@/entities/session/model/session.store'
	import { storeToRefs } from 'pinia'

	const session = useSessionStore()
	const { user } = storeToRefs(session)
	const route = useRoute() // Access the current route
	// const flow = route.params.flow ?? 'user' // Default to 'user' if flow is not set
	const flow = ref(route.params.flow ?? 'user') // Default to 'user' if flow is not set
	const isReady = ref(false)
	const routes: Array<
		Partial<RouteRecordRaw> & {
			icon: string
			label: string
			name: string
			onlyDJ?: boolean
		}
	> = [
		{ name: 'main', icon: '⭐', label: 'Профиль' },
		{ name: 'orders', icon: '📣', label: 'Заказы', onlyDJ: true },
		{ name: 'story', icon: '⏳', label: 'История' },
		{ name: 'finance', icon: '🛍️', label: 'Финансы', onlyDJ: true }
	]

	watchEffect(() => {
		const routeFlow = route.params.flow
		flow.value = routeFlow
		if (routeFlow && user?.value) {
			isReady.value = true
			// if (user.value.is_dj && routeFlow == 'user') {
			// 	flow.value = 'dj'
			// }
		}
	})
	const filteredRoutes = computed(() => {
		return routes.filter(
			route => !route.onlyDJ || (user.value?.is_dj && flow.value == 'dj')
		)
	})
</script>

<style scoped>
	.flex-col span:first-child {
		font-size: 1.5rem;
	}
</style>
