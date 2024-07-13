<template>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="11"
			cy="11"
			r="7"
			:stroke="iconColor"
			stroke-width="1.5"
		/>
		<path
			d="M20 20L17 17"
			:stroke="iconColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
	iconColor: string,
}>(), {
	iconColor: '#ffffff',
})
</script>

<style scoped>

</style>