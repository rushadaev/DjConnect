<template>
	<button
		class="v-button"
		:class="[colorClass, { 'opacity-50 cursor-not-allowed': loading }]"
		:disabled="loading"
		@click="onButtonClicked"
	>
		<span
			v-if="loading"
			class="mr-2"
		>
			<!-- Add a loading spinner here -->
		</span>
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
  loading?: boolean
}>(), {
  color: ButtonColors.Green,
  loading: false
})

const { color } = toRefs(props)

const colorClass = computed<string>(() => {
  if (color.value === ButtonColors.Green) return 'v-button--green'
  if (color.value === ButtonColors.None) return 'v-button--none'
  if (color.value === ButtonColors.Blue) return 'v-button--blue'
  if (color.value === ButtonColors.White) return 'v-button--white'
  if (color.value === ButtonColors.Red) return 'v-button--red'
  return ''
})

const onButtonClicked = () => {
  if (!props.loading) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
.v-button {
  @apply flex items-center justify-center text-base w-full h-[50px] py-0 px-[16px] rounded-[5px] cursor-pointer border-none;

  &--green {
    @apply bg-greenYellow text-lightGrey;
  }

  &--blue {
    @apply bg-[#0085FF] text-[#131313];
  }

  &--red {
    @apply border-[#FF3F3F] text-[#FF3F3F];
  }

  &--white {
    @apply bg-[#FFFFFF] text-[#131313];
  }

  &--none {
    @apply border-custom text-[#FFFFFF];
  }
}
</style>