<template>
	<div class="v-input">
		<label
			:for="id"
			class="block text-sm font-medium text-gray-700 mb-[5px]"
		>{{ label }}</label>
		<div class="mt-1 relative rounded-md shadow-sm">
			<input
				:id="id"
				ref="inputRef"
				v-bind="$attrs"
				:value="modelValue"
				inputmode="text"
				class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border-custom"
				:class="[{ 'border-red-300': error }, customHeight]"
				@keydown.enter="closeKeyboard"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
				@change="$emit('change', ($event.target as HTMLInputElement).value)"
			>
		</div>
		<p
			v-if="error"
			class="mt-2 text-sm text-red-600"
		>
			{{ error }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)
defineProps<{
  modelValue: string
  label: string
  error?: string
  id?: string
  customHeight?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const closeKeyboard = () => {
  if (inputRef.value) {
	inputRef.value.blur()
  }
}
onMounted(() => {
  document.addEventListener('touchend', function() {
    const input = document.activeElement as HTMLInputElement
    if (input?.tagName === 'INPUT' || input?.tagName === 'TEXTAREA') {
		input.blur()
    }
  })
})
</script>