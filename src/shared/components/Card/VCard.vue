<template>
	<button
		class="flex w-full justify-between items-center p-[10px] h-[66px] bg-lightGrey rounded-[5px]"
		:class="{'cursor-pointer': props?.routeParams}"
		@click="goto"
	>
		<div class="flex gap-[10px]">
			<img
				:src="photo"
				alt="photo"
				class="w-[48px] h-[48px] rounded-[5px]"
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
		<!-- </div> -->
	</button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps<{
	photo: string
	title: string
	text: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	routeParams?: any
}>()

const goto = () => {
	if(props.routeParams) router.push(props.routeParams)
}
</script>