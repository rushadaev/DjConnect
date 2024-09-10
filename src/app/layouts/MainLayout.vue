<template>
	<main
		class="bg-main overflow-scroll h-full scrollbar-hide"
		:class="isMainButtonVisible ? 'pb-[0px]' : 'pb-[150px]'"
	>
		<div class="z-[1] relative">
			<slot />
		</div>
		<div class="bg-pattern" />
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

	.bg-main {
		background-color: #0a0a0a;
		position: relative;
	}

	.bg-pattern {
		opacity: 0.4;
		position: fixed;
		background-image: url('/bgorders.png');
		background-size: cover;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0; /* Ensures the image stays behind the content */
	}
</style>
