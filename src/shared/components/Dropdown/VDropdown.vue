<template>
	<SelectRoot
		v-model:open="toggleState"
		v-model:modelValue="selectedValue"
	>
		<SelectTrigger
			class="cursor-pointer bg-white inline-flex w-full items-center justify-center gap-4 rounded px-[15px] text-[13px] leading-none h-[40px] text-black shadow-[0 2px 10px] shadow-black focus:shadow-[0 0 0 2px] focus:shadow-black outline-none"
			:aria-label="selectedTrackName || props.placeholder"
		>
			<IconMusic icon-color="#131313" />
			<SelectValue placeholder="Выбери трек нажав сюда" />
		</SelectTrigger>

		<SelectPortal>
			<SelectContent
				class="min-w-[160px] bg-white cursor-pointer rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
			>
				<SelectViewport class="p-[5px]">
					<SelectLabel class="px-[25px] text-xs leading-[25px] text-black">
						{{ props.placeholder }}
					</SelectLabel>
					<SelectGroup
						v-model:modelValue="selectedValue"
					>
						<SelectItem
							v-for="(option, index) in props.options"
							:key="index"
							:value="option.value"
							class="text-[13px] leading-none text-black rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
						>
							<SelectItemIndicator>
								{{ props.indicator }}
							</SelectItemIndicator>
							<SelectItemText>
								{{ option.label }}
							</SelectItemText>
							<div
								class="ml-auto pl-[20px] text-lime-400 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
							>
								{{ option.additional }}
							</div>
						</SelectItem>
					</SelectGroup>
				</SelectViewport>
			</SelectContent>
		</SelectPortal>
	</SelectRoot>
</template>

<script setup lang="ts">
import {
//   DropdownMenuContent,
//   DropdownMenuItemIndicator,
//   DropdownMenuPortal,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuRoot,
//   DropdownMenuTrigger,
//   type DropdownMenuCheckboxItemEmits,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
//   SelectScrollDownButton,
//   SelectScrollUpButton,
//   SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
//   type SelectItemEmits,
} from 'radix-vue'
import { IconMusic } from 'shared/components/Icon'
export type DropdownOption = { value: string; label: string, additional?:string };
import { ref, watch } from 'vue'

const toggleState = ref(false)

const selectedValue = ref(undefined)
const selectedTrackName = ref<string | null>(null)
// add reactive selectedTrackName to watch selectedValue

// const emit = defineEmits<SelectItemEmits>()

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
	if(props.onChange && value) props.onChange(value)
})

</script>
