<template>
	<button
		class="flex w-full justify-between items-center p-[10px] h-[66px] bg-lightGrey rounded-[5px]"
		:class="{'cursor-pointer': props?.routeParams}"
		@click="goto"
	>
		<div class="flex gap-[10px]">
			<img
				src="/cabinet_bg.png"
				alt="photo"
				class="w-[48px] h-[48px] rounded-[5px]"
			>
			<div class="flex flex-col justify-center">
				<h3
					:class="!props?.titleFull ? 'max-w-[100px]' : ''"
					class="text-white  text-sm"
				>
					<span v-if="props?.titleFull">{{ title }}</span>
					<span v-else>
						{{ title.substring(0, 10) }}{{ title?.length > 10 ? '...' : '' }}
					</span>
				</h3>
				<p
					class="text-xs"
					:class="{ 'text-[#F5E02C]': props?.textColor === 'green',
						'text-[#FFFFFF4D]': !props?.textColor
					}"
				>
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
	textColor?: string
	titleFull?: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	routeParams?: any
}>()
// const publicPath = process.env.BASE_URL || '/DjConnect'
const goto = () => {
	if(props.routeParams) router.push(props.routeParams)
}
</script>