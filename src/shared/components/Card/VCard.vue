<template>
	<div class="flex justify-between items-center p-[10px] h-[66px] bg-lightGrey rounded-[5px]">
		<div class="flex gap-[10px]">
			<img
				:src="photo"
				alt="photo"
				class=""
			>
			<div class="flex flex-col justify-center">
				<h3 class="text-white text-sm">
					{{ title }}
				</h3>
				<p class="text-[#FFFFFF4D] text-xs">
					{{ text }}
				</p>
			</div>
		</div>
		<div>
			<slot name="status" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
	photo: string
	title: string
	text: string
}>()
</script>