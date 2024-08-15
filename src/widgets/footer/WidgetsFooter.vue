<template>
	<div class="fixed bottom-0 w-full bg-lightGrey text-white flex justify-between py-[10px] px-[20px]">
		<div class="flex justify-between w-full">
			<router-link
				v-for="route in filteredRoutes"
				:key="route.path"
				:to="route.path"
				class="flex flex-col items-center flex-1"
				active-class="text-routerLime"
			>
				<span class="w-[23px] h-[27px] mb-[6px]">{{ route.icon }}</span>
				<span class="text-xs">{{ route.label }}</span>
			</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session.store'

const { user } = useSessionStore()

const routes: Array<Partial<RouteRecordRaw> & { icon: string, label: string, path: string, onlyDJ?: boolean }> = [
    { path: '/', icon: '⭐', label: 'Профиль' },
    { path: '/orders', icon: '📣', label: 'Заказы', onlyDJ: true },
    { path: '/history', icon: '⏳', label: 'История' },
    { path: '/finance', icon: '🛍️', label: 'Финансы', onlyDJ: true },
    { path: '/support', icon: '🔊', label: 'Поддержка' }
]

const filteredRoutes = computed(() => {
  return routes.filter(route => !route.onlyDJ || user?.is_dj)
})
</script>

<style scoped>
.flex-col span:first-child {
    font-size: 1.5rem;
}
</style>