import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from './types'
import { twa } from '@/shared/lib/api/twa'
import useApi from '@/shared/lib/api/use-api'

export const useSessionStore = defineStore('session', () => {
    const user = ref<User | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!user.value)

    async function initSession() {
        if (!twa) {
            error.value = 'TWA is not available'
            return
        }

        isLoading.value = true
        error.value = null

        try {
            await twa.ready()
            const twaUser = twa.initDataUnsafe.user

            if (!twaUser) {
                throw new Error('User data is not available from TWA')
            }

            if (isNewUser()) {
                const { data, error: apiError, execute } = useApi<User>('post', '/profile/me', {
                    telegram_id: twaUser.id.toString(),
                    name: twaUser.first_name,
                    phone_number: twaUser.username || '',
                    email: '', // Telegram не предоставляет email, оставляем пустым
                })
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if (!data.value) throw new Error('Failed to create user profile')
                user.value = data.value
                localStorage.setItem('userRegistered', 'true')
            } else {
                const { data, error: apiError, execute } = useApi<User>('get', '/profile/me')
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if (!data.value) throw new Error('Failed to fetch user profile')
                user.value = data.value
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
            user.value = null
        } finally {
            isLoading.value = false
        }
    }

    function isNewUser(): boolean {
        return !localStorage.getItem('userRegistered')
    }

    function logout() {
        user.value = null
        localStorage.removeItem('userRegistered')
        // Здесь можно добавить дополнительную логику выхода, если необходимо
    }

    return { user, isLoading, error, isAuthenticated, initSession, logout }
})
