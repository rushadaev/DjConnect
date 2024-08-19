<template>
	<VPaycard
		required="false"
		:value-fields="valueFields"
		:has-random-backgrounds="true"
		:labels="labels"
		:input-fields="inputFields"
		:placeholder="placeholder"
		:is-card-number-masked="true"
	/>
	<div class="card-input pt-5">
		<label
			for="cardNumber"
			class="card-input__label"
		>Измените номер карты</label>
		<input
			:id="inputFields.cardNumber"
			ref="inputRef"
			type="cardNumber"
			inputmode="numeric"
			title="Number"
			class="card-input__input mt-4 text-xl p-2"
			:value="valueFields.cardNumber"
			data-card-field
			autocomplete="off"
			:maxlength="cardNumberMaxLength"
			@input="changeNumber"
			@keydown.enter="closeKeyboard"
		>
	</div>
</template>

  <script setup lang="ts">
  // import { ref } from 'vue'
  import { useSessionStore } from '@/entities/session'
import VPaycard from '@/shared/components/CreditCard/VPaycard.vue'
import { storeToRefs } from 'pinia'
  import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
  const session = useSessionStore()
  const { user } = storeToRefs(session)
  const inputRef = ref<HTMLInputElement | null>(null)
  const props = defineProps<{
      onInputCardNumber: (val:string) => void
  }>()

  const emit = defineEmits<{
      (e: 'onSubmit', value: string): void
  }>()
const placeholder = computed(() => {
  return user?.value?.dj?.payment_details || '0000 0000 0000 0000'
})

const djName = computed(() => {
  return user?.value?.dj?.stage_name || ''
})

let labels = {
  'cardName': djName.value,
  'cardHolder': '',
  'cardMonth': '00 ',
  'cardYear': '00',
  'cardExpires': '',
  'cardCvv': ''
}

const closeKeyboard = () => {
  if (inputRef.value) {
	inputRef.value.blur()
  }
}
const hideMainButton = () => {
  session.offMainButton(mainButtonCallback)
  session.hideMainButton()
}

const mainButtonCallback = () => {
  hideMainButton()
  if (inputRef.value) {
	inputRef.value.blur()
  }
  emit('onSubmit', valueFields.cardNumber)
}

onMounted(() => {
  document.addEventListener('touchend', function() {
    const input = document.activeElement as HTMLInputElement
    if (input?.tagName === 'INPUT' || input?.tagName === 'TEXTAREA') {
		input.blur()
    }
  })
})

onBeforeUnmount(() => {
  hideMainButton()
})
let inputFields = {
  'cardNumber': 'v-card-number',
  'cardName': 'v-card-name',
  'cardMonth': 'v-card-month',
  'cardYear': 'v-card-year',
  'cardCvv': 'v-card-cvv'
}
    let valueFields = reactive({
          cardName: '',
          cardNumber: '',
          cardMonth: '',
          cardYear: '',
          cardCvv: '',
      })
    let cardNumberMaxLength = ref(19)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function changeNumber (e : any) {
      valueFields.cardNumber = e.target.value
      const value = valueFields.cardNumber.replace(/\D/g, '')
      // american express, 15 digits
      if (/^3[47]\d{0,13}$/.test(value)) {
        valueFields.cardNumber = value
          .replace(/(\d{4})/, '$1 ')
          .replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        cardNumberMaxLength.value  = 17
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        // diner's club, 14 digits
        valueFields.cardNumber = value
          .replace(/(\d{4})/, '$1 ')
          .replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        cardNumberMaxLength.value  = 16
      } else if (/^62[0-9]\d*/.test(value)) {
        valueFields.cardNumber = value
          .replace(/(\d{6})/, '$1 ')
          .replace(/(\d{6}) (\d{7})/, '$1 $2 ')
          .replace(/(\d{6}) (\d{7}) (\d{6})/, '$1 $2 $3 ')
          .replace(/(\d{5}) (\d{5}) (\d{5}) (\d{4})/, '$1 $2 $3 $4')
        cardNumberMaxLength.value  = 21
      } else if (/^\d{0,16}$/.test(value)) {
        // regular cc number, 16 digits
        valueFields.cardNumber = value
          .replace(/(\d{4})/, '$1 ')
          .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
          .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
        cardNumberMaxLength.value  = 19
      }
      // eslint-disable-next-line
      if (e.inputType == "deleteContentBackward") {
        const lastChar = valueFields.cardNumber.substring(
          valueFields.cardNumber.length,
          valueFields.cardNumber.length - 1
        )
        // eslint-disable-next-line
        if (lastChar == " ") {
          valueFields.cardNumber = valueFields.cardNumber.substring(
            0,
            valueFields.cardNumber.length - 1
          )
        }
      }
      if(props?.onInputCardNumber) props.onInputCardNumber(valueFields.cardNumber)
    }

  // watch(() => valueFields.cardNumber, () => {
  //   if (+valueFields.cardNumber.length == 19) {
  //     onFocus()
  //   } else {
  //     hideMainButton()
  //   }
  // })
  </script>

  <style>
  .card-item {
    margin-left: 0;
    margin-right: 0;
  }
  .card-input__input {
    background: #131313;
    border-radius: 5px;
    padding: 15px;
    width: 100%;
  }
  .card-item__typeImg {
    display: none!important;
  }
  .card-item__date {
    font-size: 16px!important;
    width: 120px!important;
  }
  .card-item__date > .card-item__dateItem > span {
    width: 34px!important;
  }
  </style>