<template>
	<div class="main-page">
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