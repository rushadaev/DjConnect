<template>
	<div
		v-if="isLoading"
		class="flex items-center justify-center h-[100vh] absolute top-0 left-0 w-full"
		:class="bg"
	>
		<div class="px-6 pt-11 pb-4">
			<div
				class="flex flex-col justify-center items-center py-[170px] text-7xl"
			>
				<span class="animationBounceSpin">💿</span>
				<h1 class="text-2xl pt-4">
					{{ text }}
				</h1>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  isLoading: boolean,
  text?: string
  bg?: string
}>(), {
  isLoading: false,
  text: 'Загрузка...',
  bg: 'bg-transparent'
})

</script>

<style lang="scss" scoped>
.animationBounceSpin {
	animation: bounce-spin 3s infinite;
}
@keyframes bounce-spin {
	0% {
		transform: rotate(0deg) scale(1);
	}
	50% {
		transform: rotate(360deg) scale(1.1);
	}
	100% {
		transform: rotate(720deg) scale(1);
	}
}
</style>