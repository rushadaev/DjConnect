<template>
	<div class="mb-[80px]">
		<div class="relative h-[350px] overflow-hidden">
			<img
				src="/public/cabinet_bg.png"
				alt=""
				class="absolute inset-0 w-full h-full object-cover"
			>
			<div
				v-if="isActive"
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
					<span class="text-white text-xxl">{{user?.is_dj ? 'DJ' : ''}} {{user?.name}}</span>
					<span class="text-semiWhite">Имя Фамилия</span>
				</div>
				<div class="flex gap-[10px]">
					<div
						v-for="icon in icons"
						:key="icon.name"
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
					>
						<component
							:is="icon.component"
							:icon-color="icon.color"
							class="w-[18px] h-[18px]"
						/>
					</div>
				</div>
			</div>
			<div class="mt-[12px] flex flex-col gap-[5px]">
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
					Базовые стоимости на трек
				</h2>
				<div class="space-y-4">
					<div class="flex gap-4">
						<input
							type="text"
							placeholder="Название"
							class="p-3 border-custom rounded-lg border border-gray text-white w-[65%]"
						>
						<input
							type="text"
							placeholder="Цена"
							class="p-3 border-custom rounded-lg border border-gray text-white w-[35%]"
						>
					</div>
				</div>
				<div v-if="isActive">
					<VButton
						class="mt-[20px] m-[auto]"
						:color="ButtonColors.Green"
					>
						<span class="flex gap-[5px] items-center">
							<IconStat icon-color="#131313" />
							Смотреть статистику

						</span>
					</VButton>
					<VButton
						:color="ButtonColors.None"
						class="mt-[20px] m-[auto]"
					>
						<span class="flex gap-[5px] items-center">
							<IconEdit icon-color="#FFFFFFB2" />
							Редактировать
						</span>
					</VButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSessionStore } from '@/entities/session/model/session.store'
import { storeToRefs } from 'pinia'
import { IconQr, IconGoogle, IconGmail, IconTelegram, IconStat, IconEdit, IconMusic } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'

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
const sessionStore = useSessionStore()
const { user } = storeToRefs(sessionStore)
const isActive = ref(true)

const icons = [
    { name: 'gmail', component: IconGmail, color: '#FFFFFF' },
    { name: 'telegram', component: IconTelegram, color: '#0085FF' },
    { name: 'google', component: IconGoogle, color: '#28B447' },
]
</script>

<style scoped></style>
