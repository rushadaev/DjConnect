<template>
	<vue-paycard
		:ref="cardRef"
		required="false"
		:value-fields="valueFields"
		background-image="/public/card.jpg"
		:labels="labels"
		:input-fields="inputFields"
		is-card-number-masked="false"
	/>
	<div class="card-input pt-5">
		<label
			for="cardNumber"
			class="card-input__label"
		>Измените номер карты</label>
		<input
			:id="inputFields.cardNumber"
			type="tel"
			title="Number"
			class="card-input__input mt-4 text-xl p-2"
			:value="valueFields.cardNumber"
			data-card-field
			autocomplete="off"
			:maxlength="cardNumberMaxLength"
			@input="changeNumber"
		>
	</div>
</template>

  <script setup lang="ts">
  // import { ref } from 'vue'
  import { reactive, ref } from 'vue'

  const cardRef = ref(null)
  const props = defineProps<{
      onInputCardNumber: (val:string) => void
  }>()
    // const { user } = useSessionStore()
    let labels = {
  'cardName': 'Полное имя',
  'cardHolder': 'Имя владельца',
  'cardMonth': 'ММ ',
  'cardYear': ' ГГ',
  'cardExpires': 'Работает до',
  'cardCvv': 'CVV'
}
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