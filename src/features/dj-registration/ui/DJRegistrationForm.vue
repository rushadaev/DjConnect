<template>
	<div class="bg-black text-white min-h-screen p-4 flex flex-col">
		<form
			class="space-y-4"
			@submit.prevent="onSubmit"
		>
			<div class="mt-[40px]">
				<label class="block text-sm font-medium">Пол</label>
				<TabsMain
					v-model="form.sex"
					default-value="male"
					class="w-full mb-[25px]"
				>
					<TabsList class="grid w-full grid-cols-2">
						<TabsTrigger
							value="male"
							class="data-[state=active]:bg-greenYellow data-[state=active]:text-black text-white"
						>
							Мужской
						</TabsTrigger>
						<TabsTrigger
							value="female"
							class="data-[state=active]:bg-greenYellow data-[state=active]:text-black text-white"
						>
							Женский
						</TabsTrigger>
					</TabsList>
				</TabsMain>
			</div>

			<div class="flex flex-col gap-[20px]">
				<VInput
					v-model="form.stage_name"
					label="Псевдоним"
					required
				/>
				<VInput
					v-model="form.city"
					label="Город"
					required
				/>
				<VInput
					v-model="form.payment_details"
					maxlength="16"
					label="Номер карты на выплату"
					required
				/>
				<VInput
					v-model="form.phone"
					label="Телефон"
					type="tel"
					inputmode="phone"
				/>
				<VInput
					v-model="form.email"
					label="Email"
					type="email"
					inputmode="email"
				/>
				<VInput
					v-model="form.website"
					label="Веб-сайт"
					inputmode="url"
				/>
				<VInput
					v-model="form.price"
					label="Базовая стоимость"
					type="number"
					step="0.01"
				/>
			</div>

			<!-- Tracks section -->
			<div class="mt-[20px]">
				<label class="block text-sm font-medium mb-2">Треки</label>
				<div
					v-for="(track, index) in form.tracks"
					:key="index"
					class="flex items-center justify-center mb-2"
				>
					<VInput
						v-model="track.name"
						:label="`Трек ${index + 1}`"
						class="flex-grow text-gray mr-2 w-[250px]"
					/>
					<VButton
						type="button"
						:color="ButtonColors.Red"
						class="ml-2"
						@click="removeTrack(index)"
					>
						Удалить
					</VButton>
				</div>
				<VButton
					type="button"
					:color="ButtonColors.Green"
					class="mt-2"
					@click="addTrack"
				>
					Добавить трек
				</VButton>
			</div>

			<p
				v-if="error"
				class="text-red-500 text-sm"
			>
				{{ error }}
			</p>
			<VButton
				type="submit"
				:loading="isRegistering"
				bottom-space
			>
				{{ isRegistering ? 'Регистрация...' : 'Зарегистрироваться как DJ' }}
			</VButton>
		</form>
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { VInput } from '@/shared/components/Input'
import { VButton, ButtonColors } from '@/shared/components/Button'
import { useDJRegistration } from '../model/use-dj-registration'
import { TabsMain, TabsList, TabsTrigger } from 'shared/components/ui/tabs'

const { register, isRegistering, error } = useDJRegistration()

const form = reactive({
  stage_name: '',
  city: '',
  payment_details: '',
  sex: 'male',
  phone: '',
  email: '',
  website: '',
  price: 0,
  tracks: [] as { name: string }[]
})

const addTrack = () => {
  form.tracks.push({ name: '' })
}

const removeTrack = (index: number) => {
  form.tracks.splice(index, 1)
}

const onSubmit = async () => {
  const formData = {
    ...form,
    tracks: form.tracks.map(track => track.name).filter(name => name.trim() !== '')
  }
  console.log('data', formData)
  await register(formData)
}
</script>