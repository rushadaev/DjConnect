<template>
	<div class="flex flex-col w-full gap-1">
		<label class="text-xl pb-4">{{ label }}:</label>
		<!-- Add ₽ character -->
		<input
			v-bind="$attrs"
			ref="inputField"
			v-model="internalValue"
			class="bg-transparent text-5xl focus:border-[#F5E02C] block w-full rounded-md p-3 text-[#FFFFFF4D]"
			:class="{ 'border-[#F5E02C] border-1 border-solid': props?.priceChangeAllowed, 'border-0': !props?.priceChangeAllowed }"
			:disabled="disabled"
			@blur="formatPrice"
			@input="updateValue"
		>
	</div>
</template>

  <script setup lang="ts">
  import { defineProps, watch, ref, defineEmits } from 'vue'

  // Define emits
  const emit = defineEmits(['update:modelValue'])

  // Define props
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

  // Watch props to update the internal value
  watch(()=>props.modelValue,
    (newValue) => {
        console.log({ newValue })
        if(newValue){
          internalValue.value = `${Math.floor(+newValue)}`?.split('.')[0].replace(/[^\d]/g, '') + ' ₽'
        }
    },
    { immediate: true }
  )

  // Watch the internal value and emit changes to the parent
  watch(internalValue, (newValue) => {
    console.log({ internalValue: newValue })
    let value = newValue.replace(/[^\d]/g, '')
    emit('update:modelValue', value)
  })

  // Format price on blur
  const formatPrice = () => {
    let value = internalValue.value.replace(/[^\d]/g, '')
    value = value ? `${Math.max(props.minPrice, +value)} ₽` : ''
    if (value.length > 7) {
      value = value.slice(0, 7)
    }
    internalValue.value = value
  }

  // Handle input value updates
  const updateValue = (event: Event) => {
    let value = (event.target as HTMLInputElement).value.split('.')[0].replace(/[^\d]/g, '')

    internalValue.value = `${value} ₽`
    // if (+value < props.minPrice) {
    //   internalValue.value = `${Math.floor(props.minPrice)} ₽`
    // }
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
