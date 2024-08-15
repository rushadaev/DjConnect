<template>
	<svg
		:width="size"
		:height="size"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			opacity="0.7"
			cx="12"
			cy="12"
			r="9"
			:stroke="iconColor"
		/>
		<path
			d="M15 12L9 12"
			:stroke="iconColor"
			stroke-width="1.5"
			stroke-linecap="square"
		/>
	</svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    iconColor: string,
	size: number
}>(), {
    iconColor: '#ffffff',
	size : 24
})

</script>

<style scoped>

</style>