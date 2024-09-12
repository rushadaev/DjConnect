<template>
	<div class="relative">
		<VTextarea
			v-if="updateDescriptionOpen"
			v-model="description"
			:is-open="updateDescriptionOpen"
			:focus-on-mount="true"
			placeholder="Enter description"
			@blur="updateDescription"
		/>
		<!-- Fixed background image -->
		<div
			v-if="user?.dj?.photo_url || flow === 'user' || !user?.is_dj"
			class="fixed top-0 left-0 w-full h-[350px] z-0"
		>
			<img
				v-if="user?.is_dj && flow !== 'user'"
				:src="user?.dj?.photo_url"
				alt=""
				class="w-full h-full object-cover"
			>

			<img
				v-else
				:src="user?.settings?.photo_url"
				alt=""
				class="w-full h-full object-cover"
			>

			<!-- Gradient overlay -->
			<div
				class="absolute inset-0 bg-gradient-to-b from-transparent to-blackContent"
			/>
		</div>

		<!-- Scrollable content -->
		<div class="relative z-10 pt-[250px]">
			<div class="flex justify-between items-center mb-[20px] px-[20px]">
				<div class="flex flex-col font-['Unbounded']">
					<VClipboard
						v-if="user?.is_dj && flow !== 'user'"
						:text-to-copy="getLink"
					>
						<span
							class="text-white text-2xl font-bold font-['Unbounded']"
						>
							{{ `${user?.dj?.stage_name}` }}
						</span>
					</VClipboard>

					<div v-else>
						<span
							class="text-white text-2xl font-bold font-['Unbounded']"
							v-html="user?.settings?.title"
						/>
					</div>
					<span
						v-if="user?.is_dj && flow !== 'user'"
						class="text-[#FFFFFF30] text-sm font-light mt-2"
						@click="goToDjProfile"
					>
						Просмотров за месяц: более {{ user?.dj?.views }}
					</span>
					<span
						v-else
						class="text-[#FFFFFF30] text-sm font-light mt-2"
					>
						Более
						{{ user?.settings?.settings?.views }} пользователей в
						мес
					</span>
				</div>
			</div>
			<!-- Profile section -->
			<div
				class="bg-blackContent bg-opacity-70 backdrop-blur-md p-[25px] rounded-t-[20px] min-h-[400px]"
			>
				<div
					v-if="!user?.is_dj || flow === 'user'"
					class="text-xl font-light font-['Montserrat'] whitespace-break-spaces mb-10"
				>
					{{ user?.settings?.description }}
				</div>
				<!-- DJ-specific content -->
				<div v-if="user?.is_dj && flow !== 'user'">
					<div class="flex flex-col gap-[10px] mb-[20px]">
						<VButton
							:color="ButtonColors.Green"
							@click="goToStatistics"
						>
							<IconStat
								icon-color="#131313"
								class="mr-[5px]"
							/>
							статистика
						</VButton>
						<VButton
							:color="ButtonColors.Green"
							@click="createQR"
						>
							<IconQr class="mr-[5px]" />
							мой qr-code
						</VButton>
						<VButton
							:color="ButtonColors.None"
							@click="editDJProfile"
						>
							<IconEdit
								icon-color="#FFFFFFB2"
								class="mr-[5px]"
							/>
							изменить профиль
						</VButton>
					</div>

					<div class="mt-[40px] space-y-[10px] px-[30px]">
						<!-- Add this input for file upload -->
						<input
							ref="fileInput"
							type="file"
							accept="image/*"
							style="display: none"
							@change="handleFileChange"
						>

						<VButton
							:color="ButtonColors.None"
							@click="editPhoto"
						>
							{{
								user?.dj?.photo_url
									? 'обновить фотографию'
									: 'добавить фотографию'
							}}
						</VButton>

						<!-- Add this input for description -->

						<VButton
							:color="ButtonColors.None"
							@click="editDescription"
						>
							{{
								user?.dj?.description
									? 'изменить описание'
									: 'добавить описание'
							}}
						</VButton>
					</div>
				</div>

				<!-- User-specific content -->
				<div v-else>
					<VButton
						v-if="flow === 'user'"
						:color="ButtonColors.Green"
						class="w-full mb-5"
						@click="scanQr"
					>
						<IconQr
							icon-color="#131313"
							class="mr-[5px]"
						/>
						сканировать куар код
					</VButton>
					<VButton
						v-if="!user?.is_dj"
						:color="ButtonColors.Green"
						class="w-full"
						@click="becomeDJ"
					>
						<IconMusic
							icon-color="#131313"
							class="mr-[5px]"
						/>
						стать Dj
					</VButton>
					<VButton
						v-if="user?.is_dj"
						:color="ButtonColors.Green"
						class="w-full"
						@click="changeFlowToDj"
					>
						<IconMusic
							icon-color="#131313"
							class="mr-[5px]"
						/>
						перейти в профиль Dj
					</VButton>
				</div>
			</div>
		</div>
	</div>
	<VLoader
		v-if="isLoading"
		:is-loading="isLoading"
		bg="backdrop-blur-[5px]"
		:text="loadingText"
	/>
	<DialogRoot v-model:open="modalOpen">
		<DialogPortal>
			<DialogOverlay
				class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
			/>
			<DialogContent
				class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] h-[auto] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
			>
				<DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
					QR
				</DialogTitle>
				<!-- qrCodeRef -->
				<img
					:src="qrCodeRef"
					alt="QR code"
					class="w-[100%] h-[auto] p-[10px]"
				>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
</template>

<script setup lang="ts">
	import { computed, onMounted, ref } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { useSessionStore } from '@/entities/session/model/session.store'
	import { useDJStore } from '@/entities/dj/model/dj.store'
	import { storeToRefs } from 'pinia'
	import {
		IconEdit,
		IconMusic,
		IconQr,
		IconStat
	} from 'shared/components/Icon'
	import { ButtonColors, VButton } from 'shared/components/Button'
	import {
		DialogContent,
		DialogOverlay,
		DialogPortal,
		DialogRoot,
		DialogTitle
	} from 'radix-vue'
	import { twa } from '@/shared/lib/api'
	import VLoader from '@/shared/components/Loader/VLoader.vue'
	import VClipboard from 'shared/components/Clipboard/VClipboard.vue'
	import { VTextarea } from 'shared/components/Textarea'

	const router = useRouter()
	const route = useRoute()
	const sessionStore = useSessionStore()
	const djStore = useDJStore()

	const isLoading = computed(() => djStore.isLoading)
	const loadingText = computed(() => djStore.loadingText)

	const qrCodeRef = ref<string | undefined>(undefined)
	const { user } = storeToRefs(sessionStore)

	const modalOpen = ref(false)

	const flow = route.params.flow ?? 'user' // Default to 'user' if flow is not set

	// flag to send only once
	const qrCodeSent = ref(false)

	const fileInput = ref<HTMLInputElement | null>(null)
	const description = ref('')
	const updateDescriptionOpen = ref(false)

	const editPhoto = () => {
		fileInput.value?.click()
	}

	const handleFileChange = async (event: Event) => {
		const target = event.target as HTMLInputElement
		const file = target.files?.[0]
		if (file) {
			const formData = new FormData()
			formData.append('photo', file, file.name)

			console.log('File selected:', file.name)
			console.log('FormData:', formData)

			try {
				djStore.loadingText = 'загрузка фотографии'
				await djStore.updateDJProfile(formData)
				console.log('File upload successful')
			} catch (error) {
				console.error('File upload failed:', error)
			}
		}
	}

	const editDescription = () => {
		updateDescriptionOpen.value = true
	}
	const updateDescription = async () => {
		try {
			djStore.loadingText = 'обновление описания'
			updateDescriptionOpen.value = false
			if (user?.value?.dj?.description === description.value) return
			await djStore.updateDJProfile({ description: description.value })

			// Handle success (e.g., show a success message)
		} catch (error) {
			// Handle error (e.g., show an error message)
		}
	}

	const goToDjProfile = () => {
		router.push({ name: 'dj-profile', params: { id: 5, flow: 'user' } })
	}

	const createQR = () => {
		// Implement QR code generation
		console.log('Generate QR code')
		if (user?.value?.dj?.id) {
			qrCodeRef.value = djStore.generateQRCode(+user.value.dj.id)
			if (!qrCodeSent.value) {
				djStore.sendQRCodeToDJ(+user.value.dj.id)
				qrCodeSent.value = true
			}
			modalOpen.value = true
		}
	}

	const getLink = computed(() => {
		if (user?.value?.dj?.id) {
			return `https://t.me/DjConnect_bot/track?startapp=dj_${user.value.dj.id}`
		}
		return ''
	})

	const becomeDJ = () => {
		router.push({ name: 'dj-registration', params: { flow: 'dj' } })
	}
	const changeFlowToDj = () => {
		router
			.push({
				name: 'main',
				params: { flow: 'dj' },
				query: { dj: 'true' }
			})
			.then(() => {
				router.go(0) // This forces a full page reload
			})
	}

	const scanQr = () => {
		twa?.showScanQrPopup(
			{ text: 'Наведите на QR диджея' },
			urlToRedirect => {
				console.log('Scanned QR code', urlToRedirect)
				//https://t.me/DjConnect_bot/track?startapp=dj_1
				const startParam = urlToRedirect.split('startapp=')[1]
				const getPrefix = startParam.split('_')[0]
				const id = startParam.split('_')[1]
				switch (getPrefix) {
					case 'dj':
						router.push({
							name: 'dj-profile',
							params: { id, flow: 'user' }
						})
						twa?.closeScanQrPopup()
						break
					default:
						break
				}
			}
		)
	}

	const editDJProfile = () => {
		router.push({ name: 'dj-profile-edit', params: { flow: 'dj' } })
	}

	const goToStatistics = () => {
		router.push({ name: 'orders', params: { flow: 'dj' } })
	}

	onMounted(async () => {
		if (user.value?.is_dj && user.value.dj && flow != 'user') {
			console.log('DJ', user.value.dj)
			djStore.loadingText = 'загрузка профиля'
			// await djStore.fetchTracks(user.value.dj.id)
			description.value = user.value.dj.description
		} else {
			console.log('noDj', user.value)
		}
	})
</script>

<style scoped></style>
