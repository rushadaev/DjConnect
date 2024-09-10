<template>
	<div
		v-if="isOpen"
		class="absolute bg-black bg-opacity-50 backdrop-blur-[10px] top-0 left-0 h-full w-full z-50"
		@click="removeFocus"
	>
		<div
			class="absolute top-20 left-0 w-full h-full opacity-20 text-white text-center text-2xl font-bold font-['Unbounded']"
		>
			Нажмите, чтобы сохранить
		</div>
		<div
			class="absolute inset-0 flex items-center justify-center animate-slide-up"
		>
			<textarea
				:id="id"
				ref="inputRef"
				v-bind="$attrs"
				:value="modelValue"
				class="focus:greenYellow focus:border-greenYellow bg-black bg-opacity-80 block w-full sm:text-sm border-gray-300 rounded-md p-3 border-custom"
				:class="[{ 'border-red-300': error }, customHeight]"
				@touchend.stop="() => {}"
				@input="
					$emit(
						'update:modelValue',
						($event.target as HTMLInputElement).value
					)
				"
				@change="
					$emit('change', ($event.target as HTMLInputElement).value)
				"
				@click.stop
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue'

	const inputRef = ref<HTMLInputElement | null>(null)
	const props = defineProps<{
		modelValue: string
		label?: string
		error?: string
		id?: string
		customHeight?: string
		focusOnMount?: boolean
		isOpen?: boolean
	}>()

	const emit = defineEmits<{
		(e: 'update:modelValue', value: string): void
		(e: 'change', value: string): void
		(e: 'focus'): void
		(e: 'blur'): void
	}>()

	const focusInput = () => {
		emit('focus')
	}

	const removeFocus = () => {
		emit('blur')
	}

	onMounted(() => {
		inputRef.value?.addEventListener('focus', focusInput)

		if (props.focusOnMount) {
			inputRef.value?.focus()
		}
	})
</script>
<style scoped>
	@keyframes slideUp {
		0% {
			transform: translateY(-100%);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.animate-slide-up {
		animation: slideUp 0.5s ease-out forwards;
	}
</style>
