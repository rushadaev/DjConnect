<template>
	<div class="fixed bottom-0 w-full bg-lightGrey text-white flex justify-between py-[20px] px-[20px]">
		<div class="flex justify-between w-full">
			<router-link
				v-for="route in filteredRoutes"
				:key="route.path"
				:to="{ name: route.name, params: {flow} }"
				class="flex flex-col items-center flex-1"
				active-class="text-routerLime"
			>
				<span class="w-[23px] h-[27px] mb-[6px]">{{ route.icon }}</span>
				<span class="text-xs">{{ route.label }}</span>
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
import { computed } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session.store'

const { user } = useSessionStore()
const route = useRoute() // Access the current route
const flow = route.params.flow ?? 'user' // Default to 'user' if flow is not set

const routes: Array<Partial<RouteRecordRaw> & { icon: string, label: string, name: string, onlyDJ?: boolean }> = [
    { name: 'main', icon: '⭐', label: 'Профиль' },
    { name: 'orders', icon: '📣', label: 'Заказы', onlyDJ: true },
    { name: 'story', icon: '⏳', label: 'История' },
    { name: 'finance', icon: '🛍️', label: 'Финансы', onlyDJ: true },
]

const filteredRoutes = computed(() => {
  return routes.filter(route => !route.onlyDJ || (user?.is_dj && flow == 'dj'))
})
</script>

<style scoped>
.flex-col span:first-child {
    font-size: 1.5rem;
}
</style>