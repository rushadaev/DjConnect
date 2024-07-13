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
				:icon-color="iconColor"
				class="bg-[#131313] p-[5px] rounded-[5px] w-[34px] h-[34px]"
			/>
			<input
				v-model="inputValue"
				type="text"
				class="input-field"
				:class="{ 'ml-[15px]': !icon }"
				@keydown.enter="validateInput"
			>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, defineComponent } from 'vue'

const props = withDefaults(defineProps<{
    icon?: ReturnType<typeof defineComponent>,
    iconColor?: string,
    inputValue: string,
    contentMessage: string,
    hasError: boolean,
    errorMessage: string,
}>(), {
    icon: undefined,
    iconColor: '#FFFFFF',
    inputValue: '',
    contentMessage: '',
    hasError: false,
    errorMessage: '',
})

const { icon, contentMessage } = props
const inputValue = ref(props.inputValue)
const hasError = ref(props.hasError)
const errorMessage = ref(props.errorMessage)

watch(() => props.inputValue, (newValue) => {
    inputValue.value = newValue
})

const validateInput = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    hasError.value = !emailPattern.test(inputValue.value)
}
</script>

<style scoped>
.input-container {
    position: relative;
    margin: 50px 40px;
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
    margin-left: 20px;
}

.input-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
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
    border-color: red;
}
</style>