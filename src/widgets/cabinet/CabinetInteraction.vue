<template>
	<div class="mb-[80px]">
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
				<VButton :color="ButtonColors.Green">
					<IconQr class="mr-[5px]" />
					Обновить QR
				</VButton>
			</div>
			<div
				v-else
				class="absolute bottom-0 left-[50%] translate-x-[-50%] w-full p-[25px]"
			>
				<VButton class="flex gap-[10px] items-center">
					<IconMusic icon-color="#131313" />
					Заказать трек
				</VButton>
			</div>
		</div>
		<div class="bg-blackContent p-[25px]">
			<div class="flex justify-between">
				<div class="flex flex-col gap-[5px]">
					<span class="text-white text-xxl">{{ user?.is_dj ? 'DJ' : '' }} {{ user?.name }}</span>
					<span class="text-semiWhite">{{ user?.dj?.stage_name || 'Имя Фамилия' }}</span>
				</div>
				<div class="flex gap-[10px]">
					<div
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
					>
						<router-link to='/'>
							<IconGoogle
								:icon-color="'#28B447'"
								class="w-[18px] h-[18px]"
							/>
						</router-link>
					</div>
				</div>
			</div>
			<div
				v-if="user?.is_dj"
				class="mt-[12px] flex flex-col gap-[5px]"
			>
				<VCard
					v-for="track in tracks"
					:key="track.id"
					:title="track.title"
					:text="track.text"
					:photo="track.photo"
				/>
			</div>
			<div class="bg-black text-white rounded-lg mt-[20px]">
				<h2 class="text-lg font-bold mb-5">
					{{ user?.is_dj ? 'Информация о DJ' : 'Стать DJ' }}
				</h2>
				<div
					v-if="user?.is_dj"
					class="space-y-4"
				>
					<p><strong>Город:</strong> {{ user.dj?.city }}</p>
					<!-- <p><strong>Базовая цена:</strong> {{ user.dj?.price }}</p> -->
				</div>

				<h2 class="text-lg font-bold mb-5 mt-5">
					Базовые стоимости на трек
				</h2>
				<div class="space-y-4">
					<div class="flex gap-4">
						<!-- <input
							type="text"
							placeholder="Название"
							class="p-3 border-custom rounded-lg border border-gray text-white w-[65%]"
						> -->
						<input
							type="text"
							disabled
							placeholder="Цена"
							class="p-3 border-custom rounded-lg border border-gray text-white w-[10%]"
							:value="user?.dj?.price"
						>
					</div>
				</div>
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
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session.store'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { storeToRefs } from 'pinia'
import { IconQr, IconGoogle, IconStat, IconEdit, IconMusic } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'

const router = useRouter()
const sessionStore = useSessionStore()
const djStore = useDJStore()
const { user } = storeToRefs(sessionStore)
// const { tracks } = storeToRefs(djStore)

// TODO: REPLACE WITH API
const tracks = [
    {
        id: 1,
        title: 'Песня 1',
        text: 'Песня 1',
        photo: '/public/cabinet_bg.png',
    },
    {
        id: 2,
        title: 'Песня 1',
        text: 'Песня 1',
        photo: '/public/cabinet_bg.png',
    },
    {
        id: 3,
        title: 'Песня 1',
        text: 'Песня 1',
        photo: '/public/cabinet_bg.png',
    },
    {
        id: 4,
        title: 'Песня 1',
        text: 'Песня 1',
        photo: '/public/cabinet_bg.png',
    }
]

onMounted(async () => {
  if (user.value?.is_dj && user.value.dj) {
    await djStore.fetchTracks(user.value.dj.id)
  }
})

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
</script>

<style scoped></style>