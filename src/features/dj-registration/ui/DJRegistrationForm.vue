<template>
	<form
		class="space-y-4"
		@submit.prevent="onSubmit"
	>
		<div>
			<label
				for="stage_name"
				class="block text-sm font-medium text-gray-700"
			>Stage Name</label>
			<input
				id="stage_name"
				v-model="form.stage_name"
				type="text"
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			>
		</div>
		<div>
			<label
				for="city"
				class="block text-sm font-medium text-gray-700"
			>City</label>
			<input
				id="city"
				v-model="form.city"
				type="text"
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			>
		</div>
		<div>
			<label
				for="payment_details"
				class="block text-sm font-medium text-gray-700"
			>Payment Details</label>
			<textarea
				id="payment_details"
				v-model="form.payment_details"
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			/>
		</div>
		<button
			type="submit"
			:disabled="isRegistering"
			class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
		>
			{{ isRegistering ? 'Registering...' : 'Register as DJ' }}
		</button>
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
import { useDJRegistration } from '../model/use-dj-registration'

const form = reactive({
  stage_name: '',
  city: '',
  payment_details: ''
})

const { register, isRegistering, error } = useDJRegistration()

const onSubmit = async () => {
  await register(form)
}
</script>