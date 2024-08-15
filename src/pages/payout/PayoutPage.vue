<template>
	<div
		v-if="user?.is_dj && !isUpdating && !stepSubmitted"
		class="px-6 pt-11 pb-4"
	>
		<h1 class="text-2xl pb-7">
			Вывод
		</h1>
		<div class="mb-4 w-full h-[180px] border-none bg-[#131313] rounded-md flex flex-col items-start justify-start p-5">
			<span class="text-lg text-[#FFFFFF4D] pb-5">Сумма вывода</span>
			<div class="flex flex-start justify-between items-center w-full pb-5">
				<span class="text-5xl text-white">{{ selectedAmount }}</span>
				<div class="w-[72px] flex flex-start justify-between items-center">
					<button
						class="cursor-pointer"
						@click="plus"
					>
						<IconAdd
							icon-color="white"
							:size="40"
						/>
					</button>
					<button
						class="cursor-pointer"
						@click="minus"
					>
						<IconMinus
							icon-color="white"
							:size="40"
						/>
					</button>
				</div>
			</div>
			<div class="flex flex-start justify-start items-center w-full">
				<!-- <button class="w-[64px] h-[33px] bg-[#0A0A0A] flex items-center justify-center rounded-md mr-1" @click="setAmount(1000)">
					<span class="text-white text-md">1000₽</span>
				</button>
				<button class="w-[64px] h-[33px] bg-[#0A0A0A] flex items-center justify-center rounded-md mr-1">
					<span class="text-white text-md">1500₽</span>
				</button> -->
				<button
					v-for="amount in predefinedAmounts"
					:key="amount.value"
					class="w-[64px] h-[33px] bg-[#0A0A0A] flex items-center justify-center rounded-md mr-1 cursor-pointer"
					@click="amount.click"
				>
					<span class="text-white text-sm">{{ amount.value }}₽</span>
				</button>
			</div>
		</div>
		<div class="mb-4 w-full h-[120px] border-none bg-[#131313] rounded-md flex flex-col items-start justify-start p-5">
			<span class="text-lg text-[#FFFFFF4D] pb-5">Карта вывода</span>
			<div
				class="w-full h-[42px] bg-[#0A0A0A] flex items-center justify-start rounded-md pl-4"
			>
				<span class="text-white text-sm">{{ user?.dj.payment_details }}</span>
			</div>
		</div>
		<VButton
			v-if="!isUpdating"
			type="button"
			:color="ButtonColors.Green"
			class="mt-4"
			@click="onSubmit"
		>
			<span class="flex gap-[5px] items-center">
				<IconWallet icon-color="#131313" />
				Вывести
			</span>
		</VButton>
	</div>
	<div
		v-if="isUpdating && !stepSubmitted"
		class="flex items-center justify-center h-[100vh]"
	>
		<div class="px-6 pt-11 pb-4">
			<div
				class="flex flex-col justify-center items-center py-[170px] text-7xl"
			>
				<span>💿</span>
				<h1 class="text-2xl pt-4">
					Загрузка...
				</h1>
			</div>
		</div>
	</div>
	<p
		v-if="stepSubmitted"
		class="flex flex-col justify-center items-center py-[170px]"
	>
		<span class="text-7xl">⌛</span>
		<span class="text-base my-4">Ожидание</span>
	</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { useSessionStore } from '@/entities/session/model/session.store'

import { VButton, ButtonColors } from '@/shared/components/Button'
// import { useRouter } from 'vue-router'
import { IconWallet } from '@/shared/components/Icon'
import { IconAdd, IconMinus } from '@/shared/components/Icon'
const djStore = useDJStore()
const sessionStore = useSessionStore()
const { isLoading: isUpdating } = storeToRefs(djStore)
const { user } = storeToRefs(sessionStore)
// const router = useRouter()

const stepSubmitted = ref( false )

const selectedAmount = ref( 1500 )

const plus = () => {
	selectedAmount.value += 500
}
const minus = () => {
	if (selectedAmount.value > 500) {
		selectedAmount.value -= 500
	}
}
const setAmount = ( amount: number ) => ()=> {
	selectedAmount.value = amount
}
// const predefinedAmounts = [{ value: 1000, click: setAmount(amount)}, 5000, 10000, 15000]

const predefinedAmounts = [{ value: 1000, click: setAmount(1000) }, { value: 5000, click: setAmount(5000) }, { value: 10000, click: setAmount(10000) }, { value: 15000, click: setAmount(15000) }]

const onSubmit = async () => {
  try {
    const payout = await djStore.createPayoutRequest(user.value.dj.id, selectedAmount.value, user.value.dj.payment_details)
	console.log(payout)
	stepSubmitted.value = true
  }catch (error) {
	console.error('Failed to update DJ profile:', error)
  }
}

</script>