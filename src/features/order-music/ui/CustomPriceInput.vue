<template>
	<div class="flex flex-col w-full gap-1">
		<label
			class="text-xl pb-4"
			@click="closeKeyboard"
		>{{ label }}</label>
		<!-- Add ₽ character -->
		<div class="relative flex justify-center items-center">
			<input
				v-bind="$attrs"
				ref="inputField"
				v-model="internalValue"
				inputmode="numeric"
				class="bg-transparent text-5xl focus:border-[#F5E02C] block w-full rounded-md p-3 text-[#FFFFFF4D]"
				:class="{ 'border-[#F5E02C] border-1 border-solid': props?.priceChangeAllowed, 'border-0': !props?.priceChangeAllowed }"
				:disabled="disabled"
				@blur="formatPrice"
				@input="updateValue"
				@keydown.enter="closeKeyboard"
			>
			<div class="sign absolute text-5xl text-[#FFFFFF4D] right-5">
				₽
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, watch, ref, defineEmits, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])

const inputField = ref<HTMLInputElement | null>(null)

const props = defineProps({
  priceChangeAllowed: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Стоимость за трек',
  },
  minPrice: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

// Internal value to manage input changes
const internalValue = ref('')

const closeKeyboard = () => {
  inputField.value?.blur()
}

onMounted(() => {
  document.addEventListener('touchend', function() {
    const input = document.activeElement
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
        input.blur()
    }
  })
})

// Watch props to update the internal value
watch(() => props.modelValue,
  (newValue) => {
    if (newValue) {
      internalValue.value = newValue.replace(/[^\d]/g, '')
    }
  },
  { immediate: true }
)

// Watch the internal value and emit changes to the parent
watch(internalValue, (newValue) => {
  let value = newValue.replace(/[^\d]/g, '')
  emit('update:modelValue', value)
})

// Format price on blur
const formatPrice = () => {
  let value = internalValue.value.replace(/[^\d]/g, '')
  value = value ? `${Math.max(props.minPrice, +value)}` : ''
  if (value.length > 7) {
    value = value.slice(0, 7)
  }
  internalValue.value = value
}

// Handle input value updates
const updateValue = (event: Event) => {
  let value = (event.target as HTMLInputElement).value.replace(/[^\d]/g, '')

  internalValue.value = `${value}`
}
</script>

