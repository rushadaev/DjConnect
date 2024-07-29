<template>
	<main
		class="bg-red"
		:class="`layout`"
	>
		<slot />
		<WidgetsFooter />
	</main>
</template>

<script setup lang="ts">
import { WidgetsFooter } from 'widgets/footer'
</script>
