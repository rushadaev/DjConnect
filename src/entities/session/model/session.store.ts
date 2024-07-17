import { defineStore } from 'pinia'
import { getUserData, refreshToken } from '../api/session.api'
import type { User } from './types'

export const useSessionStore = defineStore('session', {
    state: () => ({
        user: null as User | null,
        isAuthenticated: false,
    }),
    actions: {
        async fetchUserData() {
            const { data, error, execute } = getUserData()
            await execute()
            if (error.value) throw new Error(error.value)
            this.user = data.value
            this.isAuthenticated = !!this.user
        },
        async refreshUserSession() {
            const { error, execute } = refreshToken()
            await execute()
            if (error.value) throw new Error(error.value)
            // Если обновление токена прошло успешно, обновляем данные пользователя
            await this.fetchUserData()
        },
        logout() {
            this.user = null
            this.isAuthenticated = false
            // Здесь можно очистить токен из localStorage или cookie
        },
    },
})