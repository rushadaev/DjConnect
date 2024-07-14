<template>
	<div class="flex flex-col gap-[20px]">
		<MusicList />
		<VButton :color="ButtonColors.Green">
			<p>'button'</p>
		</VButton>
		<VButton :color="ButtonColors.Blue">
			<p>'button'</p>
		</VButton>
		<VButton :color="ButtonColors.White">
			<p>'button'</p>
		</VButton>
		<VButton :color="ButtonColors.Red">
			<p>'button'</p>
		</VButton>
		<VButton :color="ButtonColors.None">
			<p>'button'</p>
		</VButton>
	</div>
</template>

<script setup lang="ts">
import { MusicList } from '@/widgets/music-list'
import { VButton, ButtonColors } from '@/shared/components/Button'
</script>

<style scoped></style>