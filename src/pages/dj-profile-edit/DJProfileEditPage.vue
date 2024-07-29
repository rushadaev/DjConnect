<template>
	<div class="dj-profile-edit-page">
		<h1 class="text-2xl font-bold mb-4">
			Редактирование профиля DJ
		</h1>
		<DJRegistrationForm :is-editing="true" />
	</div>
</template>

<script setup lang="ts">
import DJRegistrationForm from '@/features/dj-registration/ui/DJRegistrationForm.vue'
</script>