<template>
	<div
		v-if="user?.is_dj"
		class="px-6 pt-11 pb-4"
	>
		<h1 class="text-2xl pb-7">
			Редактировать карту
		</h1>
		<div
			v-if="!isUpdating"
			class="ml-0"
		>
			<PaymentCard
				:on-input-card-number="onInputChange"
				@on-submit="onSubmit"
			/>
		</div>
		<VButton
			v-if="!isUpdating && touched"
			type="button"
			:color="ButtonColors.Green"
			class="mt-4"
			@click="onSubmit"
		>
			<span class="flex gap-[5px] items-center">
				<IconWallet icon-color="#131313" />
				Изменить
			</span>
		</VButton>
	</div>
	<VLoader
		v-if="isUpdating"
		:is-loading="isUpdating"
		bg="backdrop-blur-[5px]"
		text="🏦 Обновляем..."
	/>
</template>

<script setup lang="ts">
import PaymentCard from 'features/edit-card/ui/PaymentCard.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { useSessionStore } from '@/entities/session/model/session.store'
// import { VInput } from '@/shared/components/Input'
// import { TabsMain, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { VButton, ButtonColors } from '@/shared/components/Button'
import { useRouter } from 'vue-router'
import { IconWallet } from '@/shared/components/Icon'
import VLoader from '@/shared/components/Loader/VLoader.vue'

const djStore = useDJStore()
const sessionStore = useSessionStore()
const { isLoading: isUpdating } = storeToRefs(djStore)
const { user } = storeToRefs(sessionStore)
const router = useRouter()

const lastInput = ref( '' )
const touched = ref( false )

const onInputChange = ( val: string ) => {
	console.log( val )
	lastInput.value = val
	touched.value = true
}

const onSubmit = async () => {
  try {
    await djStore.updateDJProfile({
		payment_details: lastInput.value
	})
	router.push({ name: 'finance', params: { flow: 'dj' } })
  }catch (error) {
	console.error('Failed to update DJ profile:', error)
  }
}

</script>