<template>
	<div
		v-if="user?.is_dj && !stepSubmitted"
		class="px-6 pt-11 pb-4"
	>
		<h1 class="text-2xl pb-7">
			Вывод
		</h1>
		<div
			class="mb-4 w-full h-[180px] border-none bg-[#131313] relative rounded-md flex flex-col items-start justify-start p-5"
		>
			<span class="text-lg text-[#FFFFFF4D] pb-5">Сумма вывода</span>
			<span
				class="text-sm absolute right-[10px] hover:opacity-70 font-sans text-greenYellow pb-5"
				@click="setCustomAmount(availableBalance || 0)"
			>{{ availableBalance }}₽</span>
			<div
				class="flex flex-start justify-between items-center w-full pb-5"
			>
				<span class="text-5xl text-white">{{ selectedAmount }}</span>
				<div
					class="w-[72px] flex flex-start justify-between items-center"
				>
					<button
						class="cursor-pointer hover:opacity-70"
						@click="plus"
					>
						<IconAdd
							icon-color="white"
							:size="40"
						/>
					</button>
					<button
						class="cursor-pointer hover:opacity-70"
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
					v-for="amount in filteredPredefinedAmounts"
					:key="amount.value"
					class="w-[64px] h-[33px] bg-[#0A0A0A] flex items-center justify-center rounded-md mr-1 cursor-pointer"
					@click="amount.click"
				>
					<span class="text-white text-sm">{{ amount.value }}₽</span>
				</button>
			</div>
		</div>
		<div
			class="mb-4 w-full h-[120px] border-none bg-[#131313] rounded-md flex flex-col items-start justify-start p-5"
		>
			<span class="text-lg text-[#FFFFFF4D] pb-5">Номер карты для вывода</span>
			<div
				class="w-full h-[42px] bg-[#0A0A0A] flex items-center justify-start rounded-md pl-4"
			>
				<span class="text-white text-sm">{{ formatCardNumber }}</span>
			</div>
		</div>
		<VButton
			v-if="!isUpdating"
			type="button"
			:color="ButtonColors.Green"
			class="mt-4"
			:disabled="selectedAmount == 0"
			@click="onSubmit"
		>
			<span class="flex gap-[5px] items-center"> вывести </span>
		</VButton>
	</div>
	<VLoader
		v-if="isUpdating && !stepSubmitted"
		:is-loading="isUpdating"
		bg="backdrop-blur-[2px]"
		text="связываемся с банком 🏦"
	/>
	<div v-if="stepSubmitted">
		<p class="flex flex-col justify-center items-center py-[170px]">
			<span class="text-7xl">⌛</span>
			<span class="text-lg mt-4">Запрос на выплату отправлен</span>
			<span class="text-xs mt-4">Обработка может занять до 24 часов</span>
		</p>
		<div class="flex-grow">
			<div class="mb-4">
				<!-- <label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label> -->
				<div class="flex-col gap-4 mb-2">
					<VButton
						:color="ButtonColors.Green"
						class="mx-auto mt-5"
						@click="goToProfile"
					>
						<span class="flex gap-[5px] items-center">
							вернутся в главный экран
						</span>
					</VButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useDJStore } from '@/entities/dj/model/dj.store'
	import { useSessionStore } from '@/entities/session/model/session.store'

	import { VButton, ButtonColors } from '@/shared/components/Button'
	// import { useRouter } from 'vue-router'
	import { IconAdd, IconMinus } from '@/shared/components/Icon'
	import VLoader from '@/shared/components/Loader/VLoader.vue'
	import { useRouter } from 'vue-router'

	const djStore = useDJStore()
	const sessionStore = useSessionStore()
	const { isLoading: isUpdating } = storeToRefs(djStore)
	const { user } = storeToRefs(sessionStore)
	const { availableBalance } = storeToRefs(djStore)
	// const router = useRouter()

	const formatCardNumber = computed(() => {
		const cardNumber = user?.value?.dj?.payment_details
		if (!cardNumber) return ''
		return cardNumber.replace(/\d{4}(?=\d)/g, '$& ')
	})

	const router = useRouter()
	const stepSubmitted = ref(false)

	const selectedAmount = ref(0)

	const plus = () => {
		//if available balance is less than selected amount, then return but keep in mind that we want to increase the amount by 500
		if (selectedAmount.value + 500 > (availableBalance?.value ?? 0)) return
		selectedAmount.value += 500
	}
	const minus = () => {
		if (selectedAmount.value > 500) {
			selectedAmount.value -= 500
		}
	}
	const setAmount = (amount: number) => () => {
		if (amount > (availableBalance?.value ?? 0)) return
		if (amount < 500) return
		selectedAmount.value = amount
	}

	const setCustomAmount = (amount: number) => {
		if (amount < 500) return
		if (amount > (availableBalance?.value ?? 0)) return
		amount = amount - (amount % 500)
		selectedAmount.value = amount
	}
	// const predefinedAmounts = [{ value: 1000, click: setAmount(amount)}, 5000, 10000, 15000]

	const goToProfile = () => {
		router.push({
			name: 'main',
			params: { flow: 'dj' }
		})
	}
	const predefinedAmounts = [
		{ value: 1000, click: setAmount(1000) },
		{ value: 5000, click: setAmount(5000) },
		{
			value: 10000,
			click: setAmount(10000)
		},
		{ value: 15000, click: setAmount(15000) }
	]

	//predefined amount should be less then available balance
	const filteredPredefinedAmounts = computed(() => {
		return predefinedAmounts.filter(
			amount => amount.value <= (availableBalance?.value ?? 0)
		)
	})

	const onSubmit = async () => {
		if (user?.value?.dj && user?.value?.dj?.payment_details) {
			try {
				await djStore.createPayoutRequest(
					user.value.dj.id,
					selectedAmount.value,
					user.value.dj.payment_details
				)
				stepSubmitted.value = true
			} catch (error) {
				console.error('Failed to update DJ profile:', error)
			}
		}
	}
</script>
