<template>
	<div>
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				x="0.5"
				y="0.5"
				width="17"
				height="17"
				rx="3.5"
				stroke="white"
			/>
			<rect
				v-if="isActive"
				x="4"
				y="4"
				width="10"
				height="10"
				rx="2"
				fill="white"
				class="inner-rect"
			/>
		</svg>
	</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    iconColor: string,
    isActive: boolean
}>(), {
    iconColor: '#000000',
    isActive: false
})
</script>
