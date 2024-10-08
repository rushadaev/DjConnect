import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from './types'
import { twa } from '@/shared/lib/api/twa'
import useApi from '@/shared/lib/api/use-api'
import { useRouter } from 'vue-router'

export const useSessionStore = defineStore('session', () => {
    const user = ref<User | null>(null)
    const isMainButtonVisible = ref(false)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const router = useRouter()
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
            //Setup init TWA settings
            twa?.expand()
            twa?.BackButton.onClick(originalBackButtonCallback)
            twa?.disableVerticalSwipes()

            if (!twaUser) {
                throw new Error('User data is not available from TWA')
            }
            const { data, error: apiError, execute } = useApi<User>('get', '/profile/me', {
                telegram_id: twaUser.id.toString(),
                name: twaUser.first_name,
                phone_number: twaUser.username || '',
                email: '', // Telegram не предоставляет email, оставляем пустым
            })
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            if (!data.value) throw new Error('Failed to fetch user profile')
            user.value = data.value
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
            user.value = null
        } finally {
            isLoading.value = false
        }
    }

    const originalBackButtonCallback = () => {
        router.back()
    }

    function showBackButton() {
        twa?.BackButton.show()
    }
    function hideBackButton() {
        twa?.BackButton.hide()
    }

    function hideMainButton() {
        twa?.MainButton.hide()
        isMainButtonVisible.value = false
    }
    function offMainButton(callback:VoidFunction) {
        twa?.MainButton.offClick(callback)
    }
    function setMainButtonSettings(
        text: string,
        callback: () => void,
        color = '#0a0a0a',
        text_color = '#ffffff',
        is_active = true,
        is_visible = true
    ) {
        twa?.MainButton.setText(text)
        twa?.MainButton.setParams({ color, text_color, is_active, is_visible })

        twa?.MainButton.onClick(callback)
        isMainButtonVisible.value = is_visible
    }

    function setNewBackButtonCallback(
        callback: () => void = originalBackButtonCallback,
        currentCallback: () => void = originalBackButtonCallback
    ) {
        twa?.BackButton.offClick(currentCallback)
        twa?.BackButton.onClick(callback)
    }

    function logout() {
        user.value = null
    }

    return { user, isLoading, error, isAuthenticated, initSession, showBackButton, hideBackButton, setNewBackButtonCallback, isMainButtonVisible, offMainButton, hideMainButton, setMainButtonSettings, logout }
})
