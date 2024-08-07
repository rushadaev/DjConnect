<template>
	<div class="flex flex-col w-full gap-1 relative">
		<!-- Add ₽ character -->
		<Label
			class="absolute left-3 font-light top-0 text-[10px] text-neutral-700 z-10 bg-[#0A0A0A]"
			:for="props.id"
		>{{ label }}</Label>
		<textarea
			:id="props.id"
			v-bind="$attrs"
			ref="inputField"
			v-model="internalValue"
			class="relative border-solid border-[1px] border-[#FFFFFF1A] bg-[#0A0A0A] h-[120px] w-full appearance-none leading-5 px-[10px] text-[15px] text-white shadow-[0 0 0 1px] outline-none focus:shadow-[0 0 0 2px black] selection:color-white  text-xl focus:border-[#ADFF00] block rounded-md"
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
      default: 'text-input',
    },
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Стоимость за трек',
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
        internalValue.value = newValue
    },
    { immediate: true }
  )

  // Watch the internal value and emit changes to the parent
  watch(internalValue, (newValue) => {
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
