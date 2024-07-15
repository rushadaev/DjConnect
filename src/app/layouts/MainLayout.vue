<template>
	<main
		class="bg-bgMain"
		:class="`layout`"
	>
		<slot />
		<WidgetsFooter />
	</main>
</template>

<script setup lang="ts">
import { WidgetsFooter } from 'widgets/footer'
</script>
