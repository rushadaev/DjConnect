<template>
	<div class="bg-black text-white min-h-screen p-4 flex flex-col">
		<div class="text-center mb-[80px] ">
			<h1 class="text-2xl font-bold">
				Лого
			</h1>
		</div>

		<!-- Step 1 -->
		<div
			v-if="currentStep === 1"
			class="flex-grow"
		>
			<div class="mb-4">
				<label class="block text-sm font-medium text-[#FFFFFF4D]">Пол</label>
				<TabsMain
					v-model="form.gender"
					default-value="male"
					class="w-full mb-[25px]"
				>
					<TabsList class="grid w-full grid-cols-2">
						<TabsTrigger
							value="male"
							class="data-[state=active]:bg-greenYellow data-[state=active]:text-black"
						>
							Мужской
						</TabsTrigger>
						<TabsTrigger
							value="female"
							class="data-[state=active]:bg-greenYellow data-[state=active]:text-black"
						>
							Женский
						</TabsTrigger>
					</TabsList>
				</TabsMain>
			</div>

			<div class="flex flex-col gap-[20px]">
				<VInput
					v-model="form.nickname"
					label="Псевдоним"
					:has-error="hasErrorNickname"
					:error-message="errors.nickname"
				/>
				<VInput
					v-model="form.phoneNumber"
					label="Номер телефона"
					:has-error="hasErrorPhoneNumber"
					:error-message="errors.phoneNumber"
					:icon="Flag"
				/>
				<VInput
					v-model="form.email"
					label="E-mail"
					:has-error="hasErrorEmail"
					:error-message="errors.email"
				/>
			</div>
		</div>

		<!-- Step 2 -->
		<div
			v-if="currentStep === 2"
			class="flex-grow"
		>
			<div class="mb-4">
				<label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Социальные сети</label>
				<VInput
					v-model="form.vk"
					label="VK"
					:has-error="stepSubmitted && hasErrorVk"
					:error-message="errors.vk"
					:icon="IconTelegram"
					:icon-color="'#0085FF'"
				/>
				<VInput
					v-model="form.instagram"
					label="Instagram"
					:has-error="stepSubmitted && hasErrorInstagram"
					:error-message="errors.instagram"
					:icon="IconFacebook"
					:icon-color="'#0085FF'"
				/>
			</div>
			<VButton
				:color="ButtonColors.Green"
				class="w-full mb-4"
				@click="addSocialNetwork"
			>
				Добавить соц сеть
			</VButton>
			<div class="mb-4">
				<label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Хиты</label>
				<p
					v-if="form.tracks.length === 0 && stepSubmitted"
					class="text-red-500 text-sm mb-2"
				>
					{{ errors.tracks[0] }}
				</p>
				<div
					v-for="(_, index) in form.tracks"
					:key="index"
					class="flex items-center mb-2"
				>
					<VInput
						v-model="form.tracks[index]"
						:label="`Трек ${index + 1}`"
						:has-error="stepSubmitted && hasErrorTrack(index)"
						:error-message="errors.tracks[index] || ''"
						:icon="index + 1"
						class="flex-grow"
					/>
				</div>
			</div>
		</div>

		<!-- Step 3 -->
		<div
			v-if="currentStep === 3"
			class="flex-grow"
		>
			<div class="mb-4">
				<label class="block text-sm font-medium mb-2 text-[#FFFFFF4D]">Базовые стоимости на трек</label>
				<div
					v-for="(price, index) in form.basePrices"
					:key="index"
					class="flex gap-4 mb-2"
				>
					<VInput
						v-model="price.name"
						:has-error="stepSubmitted && hasErrorBasePriceName(index)"
						:error-message="errors.basePrices[index]?.name || ''"
						class="flex-1"
						label="Название"
					/>
					<VInput
						v-model="price.price"
						:has-error="stepSubmitted && hasErrorBasePricePrice(index)"
						:error-message="errors.basePrices[index]?.price || ''"
						class="w-1/3"
						label="Цена"
					/>
				</div>
			</div>
			<VInput
				v-model="form.cardNumber"
				label="Номер карты на выплаты"
				:has-error="stepSubmitted && hasErrorCardNumber"
				:error-message="errors.cardNumber"
			/>
		</div>

		<!-- Navigation buttons -->
		<div class="flex gap-4 mt-auto">
			<VButton
				:color="ButtonColors.None"
				class="flex-1"
				@click="prevStep"
			>
				Назад
			</VButton>
			<VButton
				:color="ButtonColors.Green"
				class="flex-1"
				@click="handleNextStep"
			>
				Далее
			</VButton>
		</div>

		<!-- Progress indicator -->
		<div class="progress-bar-container">
			<div
				v-for="step in 3"
				:key="step"
				:class="['progress-step', { 'active': currentStep === step }]"
				:style="{ width: progressBarWidth(step) }"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { VInput } from 'shared/components/Input'
import { VButton, ButtonColors } from 'shared/components/Button'
import { Flag } from 'lucide-vue-next'
import { TabsMain, TabsList, TabsTrigger } from 'shared/components/ui/tabs'
import { IconTelegram, IconFacebook } from 'shared/components/Icon'

interface FormData {
  gender: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  vk: string;
  instagram: string;
  tracks: string[];
  basePrices: { name: string; price: string }[];
  cardNumber: string;
}

interface ErrorsData {
  nickname: string;
  phoneNumber: string;
  email: string;
  vk: string;
  instagram: string;
  tracks: string[];
  basePrices: { [key: number]: { name: string; price: string } };
  cardNumber: string;
}

interface HasErrorData {
  nickname: boolean;
  phoneNumber: boolean;
  email: boolean;
  vk: boolean;
  instagram: boolean;
  tracks: boolean[];
  basePrices: { [key: number]: { name: boolean; price: boolean } };
  cardNumber: boolean;
}

const currentStep = ref(1)
const stepSubmitted = ref(false)

const form = reactive<FormData>({
  gender: 'male',
  nickname: 'Samvel',
  phoneNumber: '+998935342802',
  email: 'samveld396@gmai.com',
  vk: 'https://vk.com/example',
  instagram: 'https://instagram.com/exampl',
  tracks: ['example.mp3', 'example.mp4','example.mp3'],
  basePrices: [{ name: '', price: '' }, { name: '', price: '' }, { name: '', price: '' }],
  cardNumber: ''
})

const errors = reactive<ErrorsData>({
  nickname: '',
  phoneNumber: '',
  email: '',
  vk: '',
  instagram: '',
  tracks: [],
  basePrices: {},
  cardNumber: ''
})

const hasError = reactive<HasErrorData>({
  nickname: false,
  phoneNumber: false,
  email: false,
  vk: false,
  instagram: false,
  tracks: [],
  basePrices: { 0: { name: false, price: false } },
  cardNumber: false
})

const hasErrorNickname = computed(() => hasError.nickname)
const hasErrorPhoneNumber = computed(() => hasError.phoneNumber)
const hasErrorEmail = computed(() => hasError.email)
const hasErrorVk = computed(() => hasError.vk)
const hasErrorInstagram = computed(() => hasError.instagram)
const hasErrorCardNumber = computed(() => hasError.cardNumber)

const hasErrorTrack = (index: number): boolean => {
  return Array.isArray(hasError.tracks) && hasError.tracks[index] || false
}
const hasErrorBasePriceName = (index: number) => computed(() => hasError.basePrices[index]?.name || false)
const hasErrorBasePricePrice = (index: number) => computed(() => hasError.basePrices[index]?.price || false)

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePhoneNumber = (phone: string): boolean => {
  const re = /^\+\d{1,3}\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/
  return re.test(phone)
}

const validateStep = (step: number): boolean => {
  let isValid = true

  if (step === 1) {
    isValid = !!form.nickname.trim() && validatePhoneNumber(form.phoneNumber) && validateEmail(form.email)
  } else if (step === 2) {
    isValid = form.tracks.length > 0 &&
        form.tracks.every(track => !!track.trim()) &&
        !!form.vk.trim() &&
        !!form.instagram.trim()

  } else if (step === 3) {
    isValid = form.basePrices.every(price => !!price.name.trim() && !!price.price.trim()) && !!form.cardNumber.trim()
  }

  return isValid
}

const setErrors = (step: number) => {
  if (step === 1) {
    hasError.nickname = !form.nickname.trim()
    hasError.phoneNumber = !validatePhoneNumber(form.phoneNumber)
    hasError.email = !validateEmail(form.email)
    errors.nickname = hasError.nickname ? 'Это поле обязательно' : ''
    errors.phoneNumber = hasError.phoneNumber ? 'Неверный формат номера' : ''
    errors.email = hasError.email ? 'Неверный формат почты' : ''
  } else if (step === 2) {
    if (form.tracks.length === 0) {
      errors.tracks = ['Добавьте хотя бы один трек']
    } else {
      if (!Array.isArray(hasError.tracks)) {
        hasError.tracks = []
      }
      form.tracks.forEach((track, index) => {
        const isTrackEmpty = !track.trim()
        hasError.tracks[index] = isTrackEmpty
        errors.tracks[index] = isTrackEmpty ? 'Это поле обязательно' : ''
      })
    }
    hasError.vk = !form.vk.trim()
    errors.vk = hasError.vk ? 'Это поле обязательно' : ''
    hasError.instagram = !form.instagram.trim()
    errors.instagram = hasError.instagram ? 'Это поле обязательно' : ''
  } else if (step === 3) {
    form.basePrices.forEach((price, index) => {
      if (!hasError.basePrices[index]) {
        hasError.basePrices[index] = { name: false, price: false }
      }
      hasError.basePrices[index].name = !price.name.trim()
      hasError.basePrices[index].price = !price.price.trim() || isNaN(Number(price.price))
      if (!errors.basePrices[index]) {
        errors.basePrices[index] = { name: '', price: '' }
      }
      errors.basePrices[index].name = hasError.basePrices[index].name ? 'Это поле обязательно' : ''
      errors.basePrices[index].price = hasError.basePrices[index].price ? 'Неверный формат цены' : ''
    })
    hasError.cardNumber = !form.cardNumber.trim()
    errors.cardNumber = hasError.cardNumber ? 'Это поле обязательно' : ''
  }
}

watch(() => form.tracks, (newTracks) => {
  if (!Array.isArray(hasError.tracks)) {
    hasError.tracks = []
  }
  newTracks.forEach((track, index) => {
    const isTrackEmpty = !track.trim()
    hasError.tracks[index] = isTrackEmpty
  })
}, { deep: true })

watch(() => form.vk, (newVk) => {
  hasError.vk = !newVk.trim()
  errors.vk = hasError.vk ? 'Это поле обязательно' : ''
})

watch(() => form.instagram, (newInstagram) => {
  hasError.instagram = !newInstagram.trim()
  errors.instagram = hasError.instagram ? 'Это поле обязательно' : ''
})

const handleNextStep = () => {
  stepSubmitted.value = true
  if (validateStep(currentStep.value)) {
    if (currentStep.value < 3) {
      currentStep.value++
      stepSubmitted.value = false
    } else {
      submitForm()
    }
  } else {
    setErrors(currentStep.value)
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    stepSubmitted.value = false
  }
}

const addSocialNetwork = () => {
  // Логика добавления новой социальной сети
  // Здесь можно добавить новые поля для социальных сетей, если это необходимо
}

const submitForm = () => {
  if (validateStep(currentStep.value)) {
    console.log('Form submitted:', form)
    // Здесь будет логика отправки формы на сервер
    // Например, вызов API для регистрации DJ
  } else {
    setErrors(currentStep.value)
  }
}
const progressBarWidth = (step: number) => {
  return currentStep.value === step ? '70px' : '15px'
}
</script>

<style>
.progress-bar-container {
  display: flex;
  padding: 10px;
  gap: 5px;
  justify-content: center;
  margin-top: 80px;
}

.progress-step {
  height: 6px;
  background-color: grey;
  transition: all 0.3s ease;
  border-radius: 100px;
}

.progress-step.active {
  background-color: white;
}
</style>