<template>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.2222 12L17.5698 15.64C18.117 16.0124 18.4444 16.6314 18.4444 17.2933V19.5C18.4444 19.7761 18.2206 20 17.9444 20H6.5C6.22386 20 6 19.7761 6 19.5V17.2933C6 16.6314 6.32746 16.0124 6.87462 15.64L12.2222 12ZM12.2222 12L17.5698 8.36004C18.117 7.9876 18.4444 7.36858 18.4444 6.7067V4.5C18.4444 4.22386 18.2206 4 17.9444 4H6.5C6.22386 4 6 4.22386 6 4.5V6.7067C6 7.36858 6.32746 7.9876 6.87462 8.36004L12.2222 12Z"
			:stroke="iconColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12 12L17 9H7L12 12Z"
			fill="white"
		/>
		<path
			d="M12 19V13"
			:stroke="iconColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
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