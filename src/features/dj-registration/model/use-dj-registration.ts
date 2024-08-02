import { ref } from 'vue'
import { useDJStore } from '@/entities/dj/model/dj.store'
import { useSessionStore } from '@/entities/session/model/session.store'
import { useRouter } from 'vue-router'
import type { DJ } from '@/entities/dj/model/types'

export function useDJRegistration() {
    const isRegistering = ref(false)
    const error = ref<string | null>(null)
    const djStore = useDJStore()
    const sessionStore = useSessionStore()
    const router = useRouter()

    const register = async (data: Omit<DJ, 'id' | 'user_id' | 'created_at' | 'updated_at'> & { tracks: string[] }) => {
        isRegistering.value = true
        error.value = null
        try {
            const registeredDJ = await djStore.registerDJ(data)
            if (registeredDJ && registeredDJ.id) {
                for (const trackName of data.tracks) {
                    if (trackName.trim()) {
                        await djStore.addTrack(registeredDJ.id, trackName)
                    }
                }
            }
            await sessionStore.initSession()
            router.push({ name: 'main' })
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isRegistering.value = false
        }
    }

    return { register, isRegistering, error }
}