import { defineStore } from 'pinia'
import type { Locales } from './types'
import i18n from './i18n.config'

type State = {
	currentLocale: Locales
}

export const useLocaleStore = defineStore('locale', {
    state: (): State => ({
        currentLocale: 'ru',
    }),
    actions: {
        setLocale(newLocale: Locales) {
            this.currentLocale = newLocale
            i18n.global.locale.value = newLocale
        },
        initializeLocale(initialLocale: Locales) {
            this.currentLocale = initialLocale
            i18n.global.locale.value = initialLocale
        },
    },
})
