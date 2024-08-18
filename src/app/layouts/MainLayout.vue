<template>
	<main
		class="bg-blackContent "
		:class="`layout`"
	>
		<slot />
		<WidgetsFooter />
	</main>
</template>

<script setup lang="ts">
import { WidgetsFooter } from 'widgets/footer'
</script>
