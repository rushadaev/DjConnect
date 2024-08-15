<template>
	<div
		v-if="!isLoading"
		class="mb-[80px]"
	>
		<div class="relative h-[350px] overflow-hidden">
			<img
				src="/public/cabinet_bg.png"
				alt=""
				class="absolute inset-0 w-full h-full object-cover"
			>
			<div
				v-if="user?.is_dj"
				class="absolute top-[24px] right-[24px] w-[175px]"
			>
				<VButton
					:color="ButtonColors.Green"
					@click="createQR"
				>
					<IconQr class="mr-[5px]" />
					Обновить QR
				</VButton>
			</div>
		</div>
		<div class="bg-blackContent p-[25px]">
			<div class="flex justify-between">
				<div class="flex flex-col gap-[5px] items-center justify-center">
					<span class="text-white text-xxl">{{ user?.is_dj ? `DJ ${user?.dj?.stage_name}`: user?.name }}</span>
					<span
						v-if="user?.is_dj"
						class="text-[#FFFFFF4D] text-sm"
					>{{ user?.name }}</span>
				</div>
				<div class="flex gap-[10px] justify-center items-center">
					<a
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
						:href="user?.dj?.website"
						target="_blank"
						rel="noopener noreferrer"
					>
						<IconWorld
							icon-color="white"
							class="w-[18px] h-[18px]"
						/>
					</a>
				</div>
			</div>
			<div
				v-if="user?.is_dj"
				class="mt-[12px] flex flex-col gap-[5px]"
			>
				<VCard
					v-for="track in djStore.tracks"
					:key="track.id"
					:title="track.name"
					:text="`Добавлен: ${new Date(track.created_at).toLocaleDateString()}`"
					:photo="'/public/cabinet_bg.png'"
				/>
			</div>
			<div
				v-if="user?.is_dj"
				class="text-white rounded-lg mt-[20px]"
			>
				<div v-if="user?.is_dj">
					<VButton
						class="mt-[20px] m-[auto]"
						:color="ButtonColors.Green"
						@click="goToStatistics"
					>
						<span class="flex gap-[5px] items-center">
							<IconStat icon-color="#131313" />
							Смотреть статистику
						</span>
					</VButton>
					<VButton
						:color="ButtonColors.None"
						class="mt-[20px] m-[auto]"
						@click="editDJProfile"
					>
						<span class="flex gap-[5px] items-center">
							<IconEdit icon-color="#FFFFFFB2" />
							Редактировать
						</span>
					</VButton>
				</div>
			</div>
			<div v-else>
				<VButton
					:color="ButtonColors.Green"
					class="mt-[20px] m-[auto]"
					@click="becomeDJ"
				>
					<span class="flex gap-[5px] items-center">
						<IconMusic icon-color="#131313" />
						Стать DJ
					</span>
				</VButton>
			</div>
			<VButton
				:color="ButtonColors.Green"
				class="mt-[20px] m-[auto]"
				@click="checkDJ"
			>
				<span class="flex gap-[5px] items-center">
					<IconMusic icon-color="#131313" />
					Пример страницы DJ
				</span>
			</VButton>
		</div>
	</div>
	<div
		v-if="isLoading"
		class="flex items-center justify-center h-[100vh]"
	>
		<div class="px-6 pt-11 pb-4">
			<div
				class="flex flex-col justify-center items-center py-[170px] text-7xl"
			>
				<span>💿</span>
				<h1 class="text-2xl pt-4">
					Ожидание
				</h1>
			</div>
		</div>
	</div>
	<DialogRoot v-model:open="modalOpen">
		<DialogPortal>
			<DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
			<DialogContent
				class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] h-[50dvh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
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
import { useRouter,useRoute } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session.store'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { storeToRefs } from 'pinia'
import { IconQr, IconWorld, IconStat, IconEdit, IconMusic } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'
import {
//   DialogClose,
  DialogContent,
//   DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
//   DialogTrigger,
} from 'radix-vue'
const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()
const djStore = useDJStore()

const isLoading = computed(() => djStore.isLoading)

const qrCodeRef = ref<string | undefined>(undefined)
const { user } = storeToRefs(sessionStore)

const modalOpen = ref(false)

// flag to send only once
const qrCodeSent = ref(false)

const createQR = () => {
  // Implement QR code generation
  console.log('Generate QR code')
  if(user?.value?.dj?.id){
	qrCodeRef.value = djStore.generateQRCode(+user.value.dj.id)
	if(!qrCodeSent.value){
		djStore.sendQRCodeToDJ(+user.value.dj.id)
		qrCodeSent.value = true
	}
	modalOpen.value = true
}
}
const checkDJ = () => {
  router.push({ name: 'dj-profile', params: { id: 1 } })
}

const becomeDJ = () => {
  router.push({ name: 'dj-registration' })
}

const editDJProfile = () => {
  router.push({ name: 'dj-profile-edit' })
}

const goToStatistics = () => {
  // Implement navigation to statistics page
  console.log('Navigate to statistics page')
}

onMounted(async () => {
  if (user.value?.is_dj && user.value.dj) {
    await djStore.fetchTracks(user.value.dj.id)
  } else {
	const id =  route.params.id
	console.log( { id: id } )
	if (id) {
		await djStore.fetchDJProfile(+id)
		await djStore.fetchTracks(+id)
	}
}
})
</script>

<style scoped></style>