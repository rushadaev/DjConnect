<template>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M5 12L4.46967 11.4697L3.93934 12L4.46967 12.5303L5 12ZM17 12.75C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25V12.75ZM8.46967 7.46967L4.46967 11.4697L5.53033 12.5303L9.53033 8.53033L8.46967 7.46967ZM4.46967 12.5303L8.46967 16.5303L9.53033 15.4697L5.53033 11.4697L4.46967 12.5303ZM5 12.75H17V11.25H5V12.75Z"
			:fill="iconColor"
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