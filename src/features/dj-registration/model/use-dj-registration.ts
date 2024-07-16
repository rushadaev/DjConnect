import { ref } from 'vue'
import { registerDJ } from '../api/registerDJ.api'
import { useDJStore } from '@/entities/dj'

export function useDJRegistration() {
    const djStore = useDJStore()
    const isRegistering = ref(false)
    const error = ref<string | null>(null)

    const register = async (data: { stage_name: string; city: string; payment_details: string }) => {
        isRegistering.value = true
        error.value = null
        try {
            const { data: dj, error: apiError, execute } = registerDJ(data)
            await execute()
            if (apiError.value) throw new Error(apiError.value)
            djStore.currentDJ = dj.value
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isRegistering.value = false
        }
    }

    return { register, isRegistering, error }
}
