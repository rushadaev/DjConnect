<template>
	<div class="main-page">
		<h1 class="text-2xl font-bold mb-4">
			Добро пожаловать, {{ user?.name }}!
		</h1>
		<CabinetInteraction />
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSessionStore } from '@/entities/session/model/session.store'
import CabinetInteraction from '@/widgets/cabinet/CabinetInteraction.vue'

const sessionStore = useSessionStore()
const { user } = storeToRefs(sessionStore)
</script>