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
		<VInput
			v-model="form.sex"
			label="Пол"
		/>
		<VInput
			v-model="form.phone"
			label="Телефон"
			type="tel"
		/>
		<VInput
			v-model="form.email"
			label="Email"
			type="email"
		/>
		<VInput
			v-model="form.website"
			label="Веб-сайт"
			type="url"
		/>
		<VInput
			v-model="form.price"
			label="Базовая цена"
			type="number"
			step="0.01"
		/>

		<VButton
			type="submit"
			:loading="isUpdating"
		>
			{{ isUpdating ? 'Обновление...' : 'Обновить профиль' }}
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
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { useSessionStore } from '@/entities/session/model/session.store'
import { VInput } from '@/shared/components/Input'
import { VButton } from '@/shared/components/Button'
import { useRouter } from 'vue-router'

const djStore = useDJStore()
const sessionStore = useSessionStore()
const { isLoading: isUpdating, error } = storeToRefs(djStore)
const { user } = storeToRefs(sessionStore)
const router = useRouter()

const form = reactive({
  stage_name: '',
  city: '',
  payment_details: '',
  sex: '',
  phone: '',
  email: '',
  website: '',
  price: 0
})

onMounted(() => {
  if (user.value?.dj) {
    Object.assign(form, user.value.dj)
  }
})

const onSubmit = async () => {
  try {
    await djStore.updateDJProfile(form)
    router.push({ name: 'profile' })
  } catch (error) {
    // Error is already handled in the store
  }
}
</script>