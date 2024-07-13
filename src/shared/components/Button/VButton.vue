<template>
	<button
		class="v-button"
		:class="[colorClass]"
		:size="size"
		@click="onButtonClicked"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { ButtonColors } from './config.ts'

const emit = defineEmits<{
    (event: 'click'): void
}>()

const props = withDefaults(defineProps<{
    color?: ButtonColors,
    size?: 'large' | 'default' | 'small',
}>(), {
    color: ButtonColors.Green,
    size: 'default',
})

const { color, size } = toRefs(props)

const colorClass = computed<string>(() => {
    if (color.value === ButtonColors.Green) return 'v-button--green'
    if (color.value === ButtonColors.None) return 'v-button--none'
    if (color.value === ButtonColors.Blue) return 'v-button--blue'
    if (color.value === ButtonColors.White) return 'v-button--white'
    if (color.value === ButtonColors.Red) return 'v-button--red'
    return ''
})

const onButtonClicked = () => {
    emit('click')
}
</script>

<style lang="scss" scoped>
.v-button {
    border: none;
    @apply flex items-center justify-center text-base w-full h-[50px] border-solid py-0 px-[25px] rounded-[5px] cursor-pointer;

    &--green {
        @apply bg-greenYellow text-lightGrey
    }

    &--blue {
        @apply bg-[#0085FF] text-[#131313]
    }

    &--red {
        @apply border-[#FF3F3F] text-[#FF3F3F]
    }

    &--white {
        @apply bg-[#FFFFFF] text-[#131313]
    }

    &--none {
        @apply border-[#FFFFFF4D] text-[#FFFFFF]
    }

    &--default {
        @apply rounded-[16px];
    }

    &--rounding {
        @apply rounded-[40px];
    }
}
</style>
