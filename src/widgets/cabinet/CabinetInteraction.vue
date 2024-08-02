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
		</div>
		<div class="bg-blackContent p-[25px]">
			<div class="flex justify-between">
				<div class="flex flex-col gap-[5px]">
					<span class="text-white text-xxl">{{ user?.is_dj ? 'DJ' : '' }} {{ user?.name }}</span>
					<div
						v-if="user?.is_dj"
						class="space-y-2 mt-2"
					>
						<p><strong>Псевдоним:</strong> {{ user?.dj?.stage_name }}</p>
						<p><strong>Город:</strong> {{ user?.dj?.city }}</p>
						<p><strong>Базовая стоймость:</strong> {{ user?.dj?.price }}</p>
					</div>
				</div>
				<div class="flex gap-[10px]">
					<div
						v-if="user?.dj?.website"
						class="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-lightGrey"
					>
						<a
							:href="user.dj.website"
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconWorld
								:icon-color="'white'"
								class="w-[18px] h-[18px]"
							/>
						</a>
					</div>
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
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session/model/session.store'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { storeToRefs } from 'pinia'
import { IconQr, IconWorld, IconStat, IconEdit, IconMusic } from 'shared/components/Icon'
import { VButton, ButtonColors } from 'shared/components/Button'
import { VCard } from 'shared/components/Card'

const router = useRouter()
const sessionStore = useSessionStore()
const djStore = useDJStore()
const { user } = storeToRefs(sessionStore)
const { tracks } = storeToRefs(djStore)

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