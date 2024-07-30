<template>
	<div class="v-input">
		<label
			:for="id"
			class="block text-sm font-medium text-gray-700 mb-[5px]"
		>{{ label }}</label>
		<div class="mt-1 relative rounded-md shadow-sm">
			<input
				:id="id"
				v-bind="$attrs"
				:value="modelValue"
				class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 border-custom"
				:class="{ 'border-red-300': error }"
				@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
defineProps<{
  modelValue: string
  label: string
  error?: string
  id?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>