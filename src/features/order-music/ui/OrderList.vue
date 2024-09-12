<template>
	<VCard
		v-for="item in props.items"
		:key="item.id"
		:title-full="props.titleFull"
		:photo="item.photo"
		:title="item.title"
		:text="item.text"
		:route-params="item.routeParams"
		:text-color="props?.textColor"
		class="mb-[7px] w-full"
	>
		<template
			v-if="!!item.statusText"
			#status
		>
			<VStatus :color="item.statusColor">
				{{ item.statusText }}
			</VStatus>
		</template>
	</VCard>
</template>

<script setup lang="ts">
	import { VCard } from '@/shared/components/Card'
	import { VStatus } from '@/shared/components/Status'
	import { StatusVariable } from '@/shared/components/Status/config'

	const props = defineProps<{
		textColor?: string
		titleFull?: boolean
		items: {
			id: number
			photo: string
			title: string
			text: string
			statusColor?: StatusVariable
			statusText?: string | 'Оплачено' | 'Ожидание' | 'Отменен'
			routeParams?: { name: string; params: { id: number; flow: 'user' } }
		}[]
	}>()
</script>

<style scoped></style>
