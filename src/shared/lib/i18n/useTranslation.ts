import type { LocaleMessages } from './types'
import { computed } from 'vue'
import { useLocaleStore } from './store'

export function useTranslation<T extends LocaleMessages>(localization: T) {
	const store = useLocaleStore()

	const messages = computed(() => localization[store.currentLocale])

	const t = (key: keyof typeof messages.value): string => {
		const message = messages.value[key]

		return (typeof message === 'string')
			? message
			: key
	}

	return {
		t,
		messages
	}
}
