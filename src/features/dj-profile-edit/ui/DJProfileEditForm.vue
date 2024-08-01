<template>
	<form
		class="space-y-4"
		@submit.prevent="onSubmit"
	>
		<div>
			<label class="block text-sm font-medium">Пол</label>
			<TabsMain
				v-model="form.sex"
				default-value="male"
				class="w-full mb-[25px]"
			>
				<TabsList class="grid w-full grid-cols-2">
					<TabsTrigger
						value="male"
						class="data-[state=active]:bg-greenYellow data-[state=active]:text-black"
					>
						Мужской
					</TabsTrigger>
					<TabsTrigger
						value="female"
						class="data-[state=active]:bg-greenYellow data-[state=active]:text-black"
					>
						Женский
					</TabsTrigger>
				</TabsList>
			</TabsMain>
		</div>

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
			class="button-space"
			type="submit"
			:loading="isUpdating"
			:bottom-space="true"
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
import { TabsMain, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
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