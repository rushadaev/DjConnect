<template>
	<div>
		<VCard
			v-for="item in items"
			:key="item.id"
			:photo="item.photo"
			:title="item.title"
			:text="item.text"
		>
			<template #status>
				<VStatus :color="item.statusColor">
					{{ item.statusText }}
				</VStatus>
			</template>
		</VCard>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VCard } from '@/shared/components/Card'
import { VStatus } from '@/shared/components/Status'
import { StatusVariable } from '@/shared/components/Status/config'

const items = ref([
    {
        id: 1,
        photo: 'cabinet_bg.png',
        title: 'Title 1',
        text: 'Text 1',
        statusColor: 'green' as StatusVariable,
        statusText: 'Оплачено'
    },
    {
        id: 2,
        photo: 'cabinet_bg.png',
        title: 'Title 2',
        text: 'Text 2',
        statusColor: 'orange' as StatusVariable,
        statusText: 'Ожидание'
    },
    {
        id: 2,
        photo: 'cabinet_bg.png',
        title: 'Title 2',
        text: 'Text 2',
        statusColor: 'red' as StatusVariable,
        statusText: 'Отменен'
    }
])
</script>

<style scoped></style>