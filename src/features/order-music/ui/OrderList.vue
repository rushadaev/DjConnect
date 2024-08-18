<template>
	<VCard
		v-for="item in props.items"
		:key="item.id"
		:photo="item.photo"
		:title="item.title"
		:text="item.text"
		:route-params="item.routeParams"
		:text-color="props?.textColor"
		class="mb-[7px]"
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
import { useRoute } from 'vue-router'

const props = defineProps<{
	textColor?: string,
    items: {
        id: number,
        photo: string,
        title: string,
        text: string,
        statusColor?: StatusVariable,
        statusText?: string | 'Оплачено' | 'Ожидание' | 'Отменен'
		routeParams?: { name: string , params: { id: number, flow: 'user'} }
    }[]
}>()
const route = useRoute()
// const items = ref([
//     {
//         id: 1,
//         photo: 'cabinet_bg.png',
//         title: 'Title 1',
//         text: 'Text 1',
//         statusColor: 'green' as StatusVariable,
//         statusText: 'Оплачено'
//     },
//     {
//         id: 2,
//         photo: 'cabinet_bg.png',
//         title: 'Title 2',
//         text: 'Text 2',
//         statusColor: 'orange' as StatusVariable,
//         statusText: 'Ожидание'
//     },
//     {
//         id: 2,
//         photo: 'cabinet_bg.png',
//         title: 'Title 2',
//         text: 'Text 2',
//         statusColor: 'red' as StatusVariable,
//         statusText: 'Отменен'
//     }
// ])
</script>

<style scoped></style>