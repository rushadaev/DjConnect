<template>
	<div class="dj-registration-page">
		<DJRegistrationForm />
		<RegistrationForm />
	</div>
</template>

<script setup lang="ts">
import DJRegistrationForm from '@/features/dj-registration/ui/DJRegistrationForm.vue'
import RegistrationForm from '@/features/user-registration/ui/RegistrationForm.vue'
</script>