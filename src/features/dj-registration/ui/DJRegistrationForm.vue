<template>
	<form
		class="dj-registration-form"
		@submit.prevent="onSubmit"
	>
		<input
			v-model="stageName"
			placeholder="Stage Name"
			required
		>
		<input
			v-model="city"
			placeholder="City"
			required
		>
		<input
			v-model="paymentDetails"
			placeholder="Payment Details"
			required
		>
		<button
			type="submit"
			:disabled="isRegistering"
		>
			Register as DJ
		</button>
		<p
			v-if="error"
			class="error-message"
		>
			{{ error }}
		</p>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDJRegistration } from '../model/use-dj-registration'

const { register, isRegistering, error } = useDJRegistration()

const stageName = ref('')
const city = ref('')
const paymentDetails = ref('')

const onSubmit = () => {
  register({ stage_name: stageName.value, city: city.value, payment_details: paymentDetails.value })
}
</script>
