<template>
	<div class="relative">
		<!-- Fixed background image -->
		<div class="fixed top-0 left-0 w-full h-[350px] z-0">
			<img
				src="/cabinet_bg.png"
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
			<!-- Profile section -->
			<div
				class="bg-blackContent bg-opacity-70 backdrop-blur-md p-[25px] rounded-t-[20px]"
			>
				<div class="flex justify-between items-center mb-[20px]">
					<div
						class="flex flex-col"
						@click="goToDjProfile"
					>
						<span class="text-white text-2xl font-bold">
							{{
								user?.is_dj && flow !== 'user'
									? `DJ ${user?.dj?.stage_name}`
									: user?.name
							}}
						</span>
						<span
							v-if="user?.is_dj && flow !== 'user'"
							class="text-[#FFFFFF80] text-sm"
						>
							{{ user?.name }}
						</span>
					</div>
				</div>

				<!-- DJ-specific content -->
				<div v-if="user?.is_dj && flow !== 'user'">
					<div class="flex gap-[10px] mb-[20px]">
						<VButton
							:color="ButtonColors.Green"
							@click="createQR"
						>
							<IconQr class="mr-[5px]" />
							QR-код
						</VButton>
						<VButton
							:color="ButtonColors.Green"
							@click="copyLink"
						>
							Cсылка
						</VButton>
					</div>

					<!-- Tracks list -->
					<div class="space-y-[10px]">
						<VCard
							v-for="track in djStore.tracks"
							:key="track.id"
							:title="track.name"
							:text="`Добавлен: ${new Date(track.created_at).toLocaleDateString()}`"
							:photo="'/cabinet_bg.png'"
						/>
					</div>

					<div class="mt-[20px] space-y-[10px]">
						<VButton
							:color="ButtonColors.Green"
							@click="goToStatistics"
						>
							<IconStat
								icon-color="#131313"
								class="mr-[5px]"
							/>
							Смотреть статистику
						</VButton>
						<VButton
							:color="ButtonColors.None"
							@click="editDJProfile"
						>
							<IconEdit
								icon-color="#FFFFFFB2"
								class="mr-[5px]"
							/>
							Редактировать
						</VButton>
					</div>
				</div>

				<!-- User-specific content -->
				<div v-else>
					<VButton
						v-if="flow === 'dj'"
						:color="ButtonColors.Green"
						class="w-full"
						@click="becomeDJ"
					>
						<IconMusic
							icon-color="#131313"
							class="mr-[5px]"
						/>
						Стать Dj
					</VButton>
					<VButton
						v-else
						:color="ButtonColors.Green"
						class="w-full"
						@click="scanQr"
					>
						<IconQr
							icon-color="#131313"
							class="mr-[5px]"
						/>
						Сканировать QR
					</VButton>
				</div>
			</div>
		</div>
	</div>
	<VLoader
		v-if="isLoading"
		:is-loading="isLoading"
		bg="backdrop-blur-[5px]"
		text="🎧 Загружаем треки"
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
	import { onMounted, ref, computed } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { useSessionStore } from '@/entities/session/model/session.store'
	import { useDJStore } from '@/entities/dj/model/dj.store'
	import { storeToRefs } from 'pinia'
	import {
		IconQr,
		IconWorld,
		IconStat,
		IconEdit,
		IconMusic
	} from 'shared/components/Icon'
	import { VButton, ButtonColors } from 'shared/components/Button'
	import { VCard } from 'shared/components/Card'
	import {
		//   DialogClose,
		DialogContent,
		//   DialogDescription,
		DialogOverlay,
		DialogPortal,
		DialogRoot,
		DialogTitle
		//   DialogTrigger,
	} from 'radix-vue'
	import { twa } from '@/shared/lib/api'
	import VLoader from '@/shared/components/Loader/VLoader.vue'

	const router = useRouter()
	const route = useRoute()
	const sessionStore = useSessionStore()
	const djStore = useDJStore()

	const isLoading = computed(() => djStore.isLoading)

	const qrCodeRef = ref<string | undefined>(undefined)
	const { user } = storeToRefs(sessionStore)

	const modalOpen = ref(false)

	const flow = route.params.flow ?? 'user' // Default to 'user' if flow is not set

	// flag to send only once
	const qrCodeSent = ref(false)

	const goToDjProfile = () => {
		router.push({ name: 'dj-profile', params: { id: 1, flow: 'user' } })
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

	const copyLink = () => {
		if (user?.value?.dj?.id) {
			const link = `https://t.me/DjConnect_bot/track?startapp=dj_${user.value.dj.id}`
			navigator.clipboard.writeText(link)
		}
	}
	// const checkDJ = () => {
	//   router.push({ name: 'dj-profile', params: { id: 1 } })
	// }

	const becomeDJ = () => {
		router.push({ name: 'dj-registration', params: { flow: 'dj' } })
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
			await djStore.fetchTracks(user.value.dj.id)
		} else {
			console.log('noDj', user.value)
		}
	})
</script>

<style scoped></style>
