<template>
	<TabsList
		v-bind="delegatedProps"
		:class="cn(
			'w-[100%] inline-flex h-[44px] items-center gap-[5px] border-custom justify-center rounded-[5px]  p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
			props.class,
		)"
	>
		<slot />
	</TabsList>
</template>

<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { TabsList, type TabsListProps } from 'radix-vue'
import { cn } from '../../../lib/shadcn'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props

    return delegated
})
</script>

