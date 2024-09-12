<template>
	<form
		v-if="!isUpdating && !submitted"
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

		<div class="flex flex-col gap-[20px]">
			<VInput
				v-model="form.stage_name"
				label="Псевдоним"
				placeholder="Введите псевдоним"
				required
			/>
			<VInput
				v-model="form.city"
				label="Город"
				placeholder="Введите город"
				required
			/>
			<VInput
				v-model="form.payment_details"
				maxlength="19"
				placeholder="0000 0000 0000 0000"
				label="Номер карты для выплаты"
				inputmode="numeric"
				required
			/>
			<VInput
				v-model="form.phone"
				label="Телефон"
				placeholder="Введите телефон"
				maxlength="12"
				type="tel"
				inputmode="tel"
			/>
			<VInput
				v-model="form.email"
				label="Email"
				placeholder="Введите email"
				type="email"
				inputmode="email"
			/>
			<VInput
				v-model="form.price"
				label="Базовая стоимость"
				placeholder="Введите базовую стоимость"
				type="number"
				inputmode="decimal"
				step="0.01"
			/>
		</div>

		<!-- Tracks section -->
		<!--		<div class="mt-[20px]">-->
		<!--			<label class="block text-sm font-medium mb-6">Треки</label>-->
		<!--			<div-->
		<!--				v-for="(track, index) in form.tracks"-->
		<!--				:key="index"-->
		<!--				class="flex items-end mb-8"-->
		<!--			>-->
		<!--				<VInput-->
		<!--					v-model="track.name"-->
		<!--					:label="`Трек ${index + 1}`"-->
		<!--					class="flex-grow text-gray mr-2 w-[250px]"-->
		<!--				/>-->
		<!--				<VButton-->
		<!--					type="button"-->
		<!--					:color="ButtonColors.Red"-->
		<!--					class="ml-2"-->
		<!--					@click="removeTrack(index)"-->
		<!--				>-->
		<!--					Удалить-->
		<!--				</VButton>-->
		<!--			</div>-->
		<!--			<VButton-->
		<!--				type="button"-->
		<!--				:color="ButtonColors.Green"-->
		<!--				class="mt-2"-->
		<!--				@click="addTrack"-->
		<!--			>-->
		<!--				Добавить трек-->
		<!--			</VButton>-->
		<!--		</div>-->

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
	<VLoader
		v-if="isUpdating && !submitted"
		:is-loading="isUpdating"
		bg="bg-black"
		text="ожидание"
	/>
	<VLoader
		v-if="submitted"
		:is-loading="submitted"
		bg="bg-black"
		text="профиль обновлен!"
	/>
</template>

<script setup lang="ts">
	import { reactive, onMounted, ref, computed, watch } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useDJStore } from '@/entities/dj/model/dj.store'
	import { useSessionStore } from '@/entities/session/model/session.store'
	import { VInput } from '@/shared/components/Input'
	import {
		TabsMain,
		TabsList,
		TabsTrigger
	} from '@/shared/components/ui/tabs'
	import { VButton } from '@/shared/components/Button'
	import { useRouter } from 'vue-router'
	import VLoader from '@/shared/components/Loader/VLoader.vue'

	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { isLoading: isUpdating, error } = storeToRefs(djStore)
	const submitted = ref(false)
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
		price: 0,
		tracks: [] as { name: string; id?: number }[]
	})

	//watch change of payment details and correct
	watch(
		() => form.payment_details,
		newVal => {
			if (newVal) {
				form.payment_details = newVal.replace(/\d{4}(?=\d)/g, '$& ')
			}
		}
	)

	onMounted(async () => {
		if (user.value?.dj) {
			// Explicit assignment of only the desired properties
			const {
				stage_name,
				city,
				payment_details,
				sex,
				phone,
				email,
				website,
				price
			} = user.value.dj
			Object.assign(form, {
				stage_name,
				city,
				payment_details,
				sex,
				phone,
				email,
				website,
				price
			})

			try {
				const tracks = await djStore.fetchTracks(user.value.dj.id)
				form.tracks = tracks.map(track => ({
					name: track.name,
					id: track.id
				}))
			} catch (error) {
				console.error('Failed to fetch tracks:', error)
			}
		}
	})

	// const addTrack = () => {
	// 	form.tracks.push({ name: '' })
	// }
	//
	// const removeTrack = (index: number) => {
	// 	form.tracks.splice(index, 1)
	// }

	const onSubmit = async () => {
		try {
			const updatedDJ = await djStore.updateDJProfile({
				...form,
				tracks: form.tracks
					.map(track => track.name)
					.filter(name => name.trim() !== '')
			})

			submitted.value = true
			setTimeout(() => {
				submitted.value = false
			}, 2500)
			if (updatedDJ) {
				// Update tracks
				const currentTracks = form.tracks.filter(track => track.id)
				const newTracks = form.tracks.filter(
					track => !track.id && track.name.trim() !== ''
				)

				// Remove tracks that are not in the form anymore
				for (const track of currentTracks) {
					if (!form.tracks.some(t => t.id === track.id)) {
						await djStore.deleteTrack(updatedDJ.id, track.id!)
					}
				}

				// Add new tracks
				for (const track of newTracks) {
					await djStore.addTrack(updatedDJ.id, track.name)
				}
			}

			router.push({ name: 'profile', params: { flow: 'dj' } })
		} catch (error) {
			// Error is already handled in the store
		}
	}
</script>
