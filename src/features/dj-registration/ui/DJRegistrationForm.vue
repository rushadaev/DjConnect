<template>
	<form
		class="space-y-4"
		@submit.prevent="onSubmit"
	>
		<VInput
			v-model="form.stage_name"
			label="Сценическое имя"
			required
		/>
		<VInput
			v-model="form.city"
			label="Город"
			required
		/>
		<VInput
			v-model="form.payment_details"
			label="Платежные реквизиты"
			required
		/>
		<VButton
			type="submit"
			:loading="isRegistering"
		>
			{{ isRegistering ? 'Регистрация...' : 'Зарегистрироваться как DJ' }}
		</VButton>
		<p
			v-if="error"
			class="text-red-500 text-sm"
		>
			{{ error }}
		</p>
	</form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VInput } from '@/shared/components/Input'
import { VButton } from '@/shared/components/Button'
import { useDJRegistration } from '../model/use-dj-registration'

const { register, isRegistering, error } = useDJRegistration()

const form = reactive({
  stage_name: '',
  city: '',
  payment_details: ''
})

const onSubmit = async () => {
  await register(form)
}
</script>