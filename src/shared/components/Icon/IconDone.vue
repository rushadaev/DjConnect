<template>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M5 14L9 17L18 6"
			:stroke="iconColor"
			stroke-width="2"
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