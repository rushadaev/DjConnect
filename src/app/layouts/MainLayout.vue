<template>
	<main
		class="bg-blackContent overflow-scroll h-full scrollbar-hide"
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

<style>
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
