<template>
	<form
		class="update-track-price-form"
		@submit.prevent="onSubmit"
	>
		<input
			v-model.number="price"
			type="number"
			step="0.01"
			min="0"
			required
		>
		<button
			type="submit"
			:disabled="isUpdating"
		>
			Update Price
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
import { useUpdateTrackPrice } from '../model/use-update-track-price'

const props = defineProps<{
  trackId: number
}>()

const { updatePrice, isUpdating, error } = useUpdateTrackPrice()

const price = ref(0)

const onSubmit = () => {
  updatePrice(props.trackId, price.value)
}
</script>