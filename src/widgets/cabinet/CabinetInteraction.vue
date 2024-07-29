<template>
	<div class="cabinet-interaction">
		<div v-if="isLoading">
			Загрузка...
		</div>
		<div v-else-if="error">
			Ошибка: {{ error }}
		</div>
		<div v-else>
			<div class="user-info">
				<h2 class="text-xl font-semibold mb-2">
					Информация о пользователе
				</h2>
				<p><strong>Имя:</strong> {{ user?.name }}</p>
				<p><strong>Email:</strong> {{ user?.email }}</p>
				<p><strong>Телефон:</strong> {{ user?.phone_number }}</p>
			</div>
			<div
				v-if="user?.is_dj"
				class="dj-info mt-4"
			>
				<h2 class="text-xl font-semibold mb-2">
					Информация о DJ
				</h2>
				<p><strong>Сценическое имя:</strong> {{ user?.dj?.stage_name }}</p>
				<p><strong>Город:</strong> {{ user?.dj?.city }}</p>
				<VButton @click="editDJProfile">
					Редактировать профиль DJ
				</VButton>
			</div>
			<div
				v-else
				class="mt-4"
			>
				<VButton @click="becomeDJ">
					Стать DJ
				</VButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSessionStore } from '@/entities/session/model/session.store'
import { VButton } from '@/shared/components/Button'
import { useRouter } from 'vue-router'

const sessionStore = useSessionStore()
const { user, isLoading, error } = storeToRefs(sessionStore)
const router = useRouter()

const becomeDJ = () => {
  router.push({ name: 'dj-registration' })
}

const editDJProfile = () => {
  router.push({ name: 'dj-profile-edit' })
}
</script>