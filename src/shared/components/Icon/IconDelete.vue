<template>
	<svg
		width="24"
		height="24"
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
			d="M9.00009 14.9996L15.0001 8.99963"
			:stroke="iconColor"
			stroke-width="1.5"
		/>
		<path
			d="M15 15L9 9"
			:stroke="iconColor"
			stroke-width="1.5"
		/>
	</svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	iconColor: string,
}>(), {
	iconColor: '#000000',
})
</script>

<style scoped>

</style>