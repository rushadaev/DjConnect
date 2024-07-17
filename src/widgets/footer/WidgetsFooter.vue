<template>
	<div class="fixed bottom-0 w-full bg-lightGrey text-white flex justify-between py-[10px] px-[20px]">
		<div class="flex justify-between w-full">
			<router-link
				v-for="route in routes"
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
import { RouteRecordRaw } from 'vue-router'

const routes: Array<Partial<RouteRecordRaw> & { icon: string, label: string, path: string }> = [
    { path: '/', icon: '⭐', label: 'Профиль' },
    { path: '/orders', icon: '📣', label: 'Заказы' },
    { path: '/history', icon: '⏳', label: 'История' },
    { path: '/finance', icon: '🛍️', label: 'Финансы' },
    { path: '/support', icon: '🔊', label: 'Поддержка' }
]
</script>

<style scoped>
.flex-col span:first-child {
    font-size: 1.5rem;
}
</style>