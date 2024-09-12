<template>
	<div
		style="border-bottom: 1px solid #ffffff10"
		class="flex w-full justify-between items-center p-[10px] h-[66px] border-b-2 border-white cursor-pointer hover:opacity-70"
		@click="goto"
	>
		<div class="flex gap-[10px]">
			<div class="flex flex-col justify-center">
				<h3
					:class="!props?.titleFull ? 'max-w-[300px]' : ''"
					class="text-white text-md font-bold"
				>
					<span class="font-black">{{ title }}</span>
				</h3>
				<p class="text-xs font-light text-greenYellow">
					{{ text }}
				</p>
			</div>
		</div>
		<div>
			<slot name="status" />
		</div>
		<!-- </div> -->
	</div>
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
		if (props.routeParams) router.push(props.routeParams)
	}
</script>
