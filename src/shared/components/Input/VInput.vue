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
				:inputmode="inputmode"
				:maxlength="maxlength || 255"
				:placeholder="placeholder"
				class="focus:greenYellow focus:border-greenYellow block w-full sm:text-sm border-gray-300 font-medium rounded-md p-3 border-custom"
				:class="[{ 'border-red-300': error }, customHeight]"
				@keydown.enter="closeKeyboard"
				@input="inputTrigger"
				@change="
					$emit('change', ($event.target as HTMLInputElement).value)
				"
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
	const props = defineProps<{
		modelValue: string
		label: string
		error?: string
		id?: string
		customHeight?: string
		placeholder?: string
		inputmode?:
			| 'text'
			| 'url'
			| 'email'
			| 'search'
			| 'none'
			| 'tel'
			| 'numeric'
			| 'decimal'
			| undefined
		maxlength?: number | string
	}>()

	const emit = defineEmits<{
		(e: 'update:modelValue', value: string): void
		(e: 'change', value: string): void
	}>()

	const closeKeyboard = () => {
		if (inputRef.value) {
			inputRef.value.blur()
		}
	}
	const inputTrigger = ($event: Event) => {
		const value = ($event.target as HTMLInputElement).value
		if (
			(props.inputmode == 'email' &&
				!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
			(props.inputmode == 'tel' && !/^\+?\d{10,15}$/.test(value))
		) {
			emit('update:modelValue', '')
		} else {
			emit('update:modelValue', value)
		}
	}
	onMounted(() => {
		document.addEventListener('touchend', function () {
			const input = document.activeElement as HTMLInputElement
			if (input?.tagName === 'INPUT' || input?.tagName === 'TEXTAREA') {
				input.blur()
			}
		})
	})
</script>
