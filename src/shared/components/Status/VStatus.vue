<template>
	<div
		class="v-status"
		:class="[colorClass]"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { StatusVariable } from './config.ts'

const props = withDefaults(defineProps<{
    color?: StatusVariable,
}>(), {
    color: StatusVariable.Green,
})

const { color } = toRefs(props)

const colorClass = computed<string>(() => {
    if (color.value === StatusVariable.Green) return 'v-status--green'
    if (color.value === StatusVariable.Red) return 'v-status--red'
    if (color.value === StatusVariable.Orange) return 'v-status--orange'
    if (color.value === StatusVariable.White) return 'v-status--white'
    if (color.value === StatusVariable.Blue) return 'v-status--blue'

    return ''
})
</script>

<style lang="scss" scoped>
.v-status {
    @apply flex items-center justify-center text-red max-w-max h-[30px] py-0 px-[10px] text-sm rounded-[5px] cursor-pointer;

    &--white {
        @apply bg-[white] text-black
    }

    &--green {
        @apply bg-[#ADFF0040] text-[#ADFF00]
    }

    &--red {
        @apply bg-[#FF000040] text-[#FF5A5A]
    }
    &--orange {
        @apply bg-[#FF8A0040] text-[#FF8A00]
    }
    &--blue {
        @apply bg-[#00BFFF40] text-[#00BFFF]
    }

    &--default {
        @apply rounded-[16px];
    }

    &--rounding {
        @apply rounded-[40px];
    }
}
</style>
