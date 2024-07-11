<template>
	<div class="flex justify-between items-center p-[10px] h-[66px] bg-lightGrey rounded-[5px]">
		<div class="flex gap-[10px]">
			<img
				:src="photo"
				alt="photo"
				class=""
			>
			<div class="flex  flex-col justify-center">
				<h3 class="text-white text-sm">
					{{ title }}
				</h3>
				<p class="text-[#FFFFFF4D] text-xs">
					{{ text }}
				</p>
			</div>
		</div>
		<div class="">
			<VStatus
				v-if="statusColor && statusText"
				:color="`${statusColor}`"
			>
				{{ statusText }}
			</VStatus>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { VStatus } from 'shared/components/Status' // Adjust the path as necessary
import { StatusVariable } from '../Status/config'

defineProps<{
    photo: string;
    title: string;
    text: string;
    statusColor: StatusVariable;
    statusText: string;
}>()
</script>
