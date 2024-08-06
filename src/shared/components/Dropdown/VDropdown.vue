<template>
	<DropdownMenuRoot
		v-model:open="toggleState"
	>
		<DropdownMenuTrigger>
			{{ selectedTrackName || props.placeholder }}
		</DropdownMenuTrigger>

		<DropdownMenuPortal>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup
					v-model:modelValue="selectedValue"
					class="min-w-[220px] outline-none rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
				>
					<DropdownMenuRadioItem
						v-for="option in props.options"
						:key="option.value"
						:value="option.value"
						class="group text-[16px] leading-none rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none cursor-pointer"
					>
						<DropdownMenuItemIndicator>
							{{ props.indicator }}
						</DropdownMenuItemIndicator>
						{{ option.label }}
						<div
							class="ml-auto pl-[20px] text-lime-400 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
						>
							{{ option.additional }}
						</div>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenuPortal>
	</DropdownMenuRoot>
</template>

<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItemIndicator,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  type DropdownMenuCheckboxItemEmits,
} from 'radix-vue'
export type DropdownOption = { value: string; label: string, additional?:string };
import { ref, watch } from 'vue'

const toggleState = ref(false)

const selectedValue = ref(undefined)
const selectedTrackName = ref<string | null>(null)
// add reactive selectedTrackName to watch selectedValue

const emit = defineEmits<DropdownMenuCheckboxItemEmits>()

const props = withDefaults(
  defineProps<{
	options: DropdownOption[];
	placeholder?: string;
	indicator?: string;
	onChange?: (value: string) => void;
  }>(),
  {
	options: () => [] as DropdownOption[],
	placeholder: 'Выберите трек',
	indicator: '💿',
	onChange: undefined,
  },
)

watch(selectedValue, (value) => {
  selectedTrackName.value = props.options.find((option) => option.value === value)?.label || null

  console.log('selectedValue', value)
  console.log('props.onChange', props.onChange)
	if(props.onChange) props.onChange(value)
})

</script>
