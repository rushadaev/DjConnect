<template>
	<div
		v-if="isLoading"
		class="flex items-center justify-center h-screen"
	>
		<p class="text-xl">
			Загрузка...
		</p>
	</div>
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
</template>

<script setup lang="ts">
import { shallowRef, watch, type Component, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MainLayout } from './layouts'
import { useLocaleStore } from '@/shared/lib/i18n'
import { useSessionStore } from '@/entities/session/model/session.store'
import { storeToRefs } from 'pinia'
import { twa } from '@/shared/lib/api/twa'

const localeStore = useLocaleStore()
localeStore.initializeLocale('ru')

const sessionStore = useSessionStore()
const { isLoading, error } = storeToRefs(sessionStore)

const route = useRoute()
const router = useRouter()

const layout = shallowRef<Component>(MainLayout)

watch(() => route?.meta?.layout, (newLayoutComponent) => {
  layout.value = newLayoutComponent || MainLayout
})

onMounted(async () => {
  await sessionStore.initSession()
  await twa?.ready()
  if(twa?.initDataUnsafe.start_param){
	const nextRoute = twa?.initDataUnsafe.start_param.split(':')[0] === 'dj' ? 'dj-profile' : 'review-order'
	const id = twa?.initDataUnsafe.start_param.split(':')[1]
	router.push({ name: nextRoute, params: { id } })
	}
// 	else if (isAuthenticated.value && user.value && !user.value.is_dj) {
//     // Если пользователь аутентифицирован, но не диджей, перенаправляем на главную страницу
// 	router.push({ name: 'main' })
//   } else if (!isAuthenticated.value) {
//     // Если пользователь не аутентифицирован, перенаправляем на страницу входа или регистрации
//     router.push({ name: 'login' })
//   }
})
</script>

<style lang="scss" src="shared/styles/index.scss" />