<template>
	<div class="input-container">
		<label
			class="input-label"
			:class="{ 'input-label-error': hasError }"
		>{{ contentMessage }}</label>
		<label
			v-if="hasError"
			class="error-message"
		>{{ errorMessage }}</label>
		<div
			class="input-wrapper"
			:class="{ 'error': hasError }"
		>
			<component
				:is="icon"
				v-if="isComponentIcon"
				:icon-color="iconColor"
				class="bg-[#131313] p-[5px] rounded-[5px] w-[34px] h-[34px]"
			/>
			<div
				v-else-if="isTextIcon"
				class="icon-text"
			>
				{{ icon }}
			</div>
			<slot
				v-else
				name="icon"
			/>
			<input
				:value="modelValue"
				:placeholder="inputText"
				type="text"
				class="input-field"
				:class="{ 'ml-[15px]': !icon }"
				@input="onInput"
				@keydown.enter="validateInput"
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, computed } from 'vue'

const props = defineProps<{
    modelValue?: string,
    contentMessage?: string,
    hasError?: boolean,
    errorMessage?: string,
    inputText?: string,
    icon?: ReturnType<typeof defineComponent> | string | number,
    iconColor?: string,
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const isComponentIcon = computed(() => typeof props.icon === 'object' && props.icon !== null)
const isTextIcon = computed(() => typeof props.icon === 'string' || typeof props.icon === 'number')

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

const validateInput = () => {
    // Validation logic here
}
</script>

<style scoped>
.input-container {
    position: relative;
}

.input-field::placeholder {
    color: #ffffff;
    /* Цвет для плейсхолдера */
}

.input-label {
    position: absolute;
    top: -10px;
    left: 10px;
    color: #FFFFFF4D;
    background: #0A0A0A;
    padding: 0 5px;
    font-size: 12px;
    z-index: 10;
}

.input-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid #FFFFFF1A;
    background: #0A0A0A;
    color: #ffffff;
    font-size: 15px;
    height: 44px;
    padding: 5px;
}

.input-field {
    border: none;
    outline: none;
    width: 100%;
    background: transparent;
    color: #ffffff;
    margin-left: 15px;
}

.icon-text {
    background-color: #131313;
    padding: 5px;
    border-radius: 5px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.error-message {
    position: absolute;
    top: -10px;
    right: 10px;
    color: #FF3535;
    background: #0A0A0A;
    padding: 0 5px;
    font-size: 12px;
    z-index: 10;
}

.input-label-error {
    color: #FF3535;
}

.error {
    border-color: #FF3535;
}
</style>