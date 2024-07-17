<template>
	<div
		v-if="isAuthenticated"
		class="user-card"
	>
		<img
			:src="userAvatar"
			alt="User Avatar"
			class="user-avatar"
		>
		<div class="user-info">
			<h3>{{ user?.name }}</h3>
			<p>{{ user?.email }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSessionStore } from '../model/session.store'

const sessionStore = useSessionStore()
const { user, isAuthenticated } = storeToRefs(sessionStore)

const userAvatar = computed(() => {
  // Здесь логика получения аватара пользователя
  return 'path/to/default/avatar.png'
})
</script>