import { ref } from 'vue'
import useApi from '@/shared/lib/api/use-api'
import { useSessionStore } from '@/entities/session/model/session.store'
import { useRouter } from 'vue-router'
import type { DJ } from '@/entities/dj/model/types'

export function useDJRegistration() {
    const isRegistering = ref(false)
    const error = ref<string | null>(null)
    const sessionStore = useSessionStore()
    const router = useRouter()

    const register = async (data: { stage_name: string; city: string; payment_details: string }) => {
        isRegistering.value = true
        error.value = null
        try {
            const { data: djData, error: apiError, execute } = useApi<DJ>('post', '/dj/register', data)
            await execute()
            if (apiError.value) throw new Error(apiError.value)

            if (djData.value) {
                // Обновляем информацию о пользователе в сессии
                await sessionStore.initSession()

                // Перенаправляем на главную страницу после успешной регистрации
                router.push({ name: 'main' })
            } else {
                throw new Error('Failed to register DJ: No data returned from API')
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isRegistering.value = false
        }
    }

    return { register, isRegistering, error }
}