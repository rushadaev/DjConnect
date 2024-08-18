<template>
	<div class="relative">
		<div
			class="cursor-pointer bg-white inline-flex w-full items-center justify-center gap-4 rounded px-4 text-sm leading-none h-10 text-black shadow focus:shadow-outline outline-none"
			:aria-label="modelValue?.name || props.placeholder"
			@click="toggleState = !toggleState"
		>
			<span v-if="modelValue">{{ indicator }} {{ modelValue?.name }}</span>
			<div
				v-else
				class="flex gap-2"
			>
				<IconMusic icon-color="#131313" />{{ props.placeholder }}
			</div>
		</div>
		<transition name="slide-fade">
			<div
				v-if="toggleState"
				class="absolute left-0 right-0 rounded mt-2 z-10"
			>
				<div class="py-2">
					<div class="max-h-[200px] overflow-y-auto shadow-lg backdrop-blur-[10px]">
						<div
							v-for="(option, index) in props.options"
							:key="index"
							class="text-sm leading-none text-black rounded border border-black mb-2 bg-white flex items-center px-3 py-5 relative cursor-pointer hover:bg-green-200"
							@click="selectOption(option.value)"
						>
							<span>{{ option.label == modelValue?.name ? indicator : '' }}{{ option.label }}</span>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { IconMusic } from 'shared/components/Icon'

export type DropdownOption = { value: string; id: number, label: string, additional?: string, name?: string };

const toggleState = ref(false)
const selectedValue = ref<string | undefined>(undefined)

const selectOption = (value: string) => {
  selectedValue.value = value
  toggleState.value = false
  selectedTrackName.value = props.options.find((option) => option.value === value) || null

  if (props.onChange && value) props.onChange(value)
}

const props = withDefaults(
  defineProps<{
    options: DropdownOption[];
    placeholder?: string;
    indicator?: string;
    modelValue?: DropdownOption | null;  // Use modelValue for v-model
    onChange?: (value: string) => void;
  }>(),
  {
    options: () => [] as DropdownOption[],
    placeholder: 'Выберите трек нажав сюда',
    indicator: '💿',
    modelValue: null,  // Default to null
    onChange: undefined,
  },
)

const selectedTrackName = ref<DropdownOption | null>(props.modelValue || null)
watch(
  () => props.modelValue,
  (newValue) => {
    selectedTrackName.value = props.options.find((option) => option.value === newValue?.id.toString()) || null as DropdownOption | null
  }
)
</script>

  <style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
	transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
  }
  </style>