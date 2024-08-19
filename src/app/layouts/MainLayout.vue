<template>
	<main
		class="bg-blackContent overflow-scroll h-full"
		:class="isMainButtonVisible ? 'pb-[0px]' : 'pb-[150px]'"
	>
		<div>
			<slot />
		</div>
		<WidgetsFooter v-if="!isMainButtonVisible" />
	</main>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/entities/session'
import { storeToRefs } from 'pinia'
import { WidgetsFooter } from 'widgets/footer'

const { isMainButtonVisible } = storeToRefs(useSessionStore())
</script>
