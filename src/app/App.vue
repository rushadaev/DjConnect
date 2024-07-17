<template>
	<div
		v-if="isLoading"
		class="flex items-center justify-center h-screen"
	>
		<p class="text-xl">
			Loading...
		</p>
	</div>
	<div
		v-else-if="error"
		class="flex items-center justify-center h-screen"
	>
		<p class="text-xl text-red-500">
			Error: {{ error }}
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

const localeStore = useLocaleStore()
localeStore.initializeLocale('ru')

const sessionStore = useSessionStore()
const { isLoading, error, user, isAuthenticated } = storeToRefs(sessionStore)

const route = useRoute()
const router = useRouter()

const layout = shallowRef<Component>(MainLayout)

watch(() => route?.meta?.layout, (newLayoutComponent) => {
  layout.value = newLayoutComponent || MainLayout
})

onMounted(async () => {
  await sessionStore.initSession()
  if (isAuthenticated.value && user.value && !user.value.is_dj) {
    // Если пользователь аутентифицирован, но не диджей, перенаправляем на страницу регистрации диджея
    router.push({ name: 'dj-registration' })
  } else if (!isAuthenticated.value) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа или регистрации
    router.push({ name: 'login' })
  }
})
</script>

<style lang="scss" src="shared/styles/index.scss" />