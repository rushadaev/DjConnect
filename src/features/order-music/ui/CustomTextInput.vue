<template>
	<div class="flex flex-col w-full gap-1 relative">
		<!-- Add ₽ character -->
		<Label
			v-if="showLabel"
			class="absolute left-3 font-light top-0 text-[10px] text-neutral-700 z-10 bg-[#0A0A0A]"
			:for="props.id"
		>{{ label }}</Label>
		<textarea
			:id="props.id"
			v-bind="$attrs"
			ref="inputField"
			v-model="internalValue"
			:placeholder="placeholder"
			class="focus:greenYellow focus:border-greenYellow block w-full sm:text-sm border-gray-300 font-medium rounded-md p-3 border-custom"
			:disabled="disabled"
			@blur="formatText"
			@input="updateValue"
		/>
	</div>
</template>

<script setup lang="ts">
	import { defineProps, watch, ref, defineEmits } from 'vue'
	import { Label } from 'radix-vue'
	// Define emits
	const emit = defineEmits(['update:modelValue'])

	// Define props
	const props = defineProps({
		id: {
			type: String,
			default: 'text-input'
		},
		modelValue: {
			type: String,
			required: true
		},
		label: {
			type: String,
			default: 'Стоимость за трек'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		showLabel: {
			type: Boolean,
			default: true
		},
		placeholder: {
			type: String,
			default: 'Введите текст'
		}
	})

	// Internal value to manage input changes
	const internalValue = ref('')

	// Watch props to update the internal value
	watch(
		() => props.modelValue,
		newValue => {
			internalValue.value = newValue
		},
		{ immediate: true }
	)

	// Watch the internal value and emit changes to the parent
	watch(internalValue, newValue => {
		emit('update:modelValue', newValue)
	})

	// Format text on blur
	const formatText = () => {
		let value = internalValue.value
		if (value.length > 2000) {
			value = value.slice(0, 2000)
		}
		internalValue.value = value
	}

	// Handle input value updates
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const updateValue = (event: any) => {
		internalValue.value = `${event?.target?.value}`
	}
</script>

<style scoped>
	/* Add your custom styles here */
	.text-sm {
		/* Add your custom label styles here */
	}

	.border-0 {
		/* Add your custom border styles here */
	}

	.bg-transparent {
		/* Add your custom background styles here */
	}

	.text-lg {
		/* Add your custom text size styles here */
	}

	.w-32 {
		/* Add your custom width styles here */
	}
</style>
