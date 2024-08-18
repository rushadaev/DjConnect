<template>
	<div class="main-page">
		<SessionProfileInteraction />
	</div>
</template>

<script setup lang="ts">
import SessionProfileInteraction from '@/widgets/profile/SessionProfileInteraction.vue'
</script>

<style lang="scss">
/* For all div elements */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: #2e2e2e;
}

::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 6px;
  border: 3px solid #2e2e2e;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}
</style>