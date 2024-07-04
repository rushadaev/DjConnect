<template>
	<component :is="layout">
		<router-view />
	</component>
</template>

<script setup lang="ts">
import { shallowRef, watch, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { MainLayout } from './layouts'
import { useLocaleStore } from '@/shared/lib/i18n'

const localeStore = useLocaleStore()
localeStore.initializeLocale('ru')

const route = useRoute()

const layout = shallowRef<Component>(MainLayout)

watch(() => route?.meta?.layout, (newLayoutComponent) => {
	layout.value = newLayoutComponent || MainLayout
})
</script>

<style lang="scss" src="shared/styles/index.scss" />
