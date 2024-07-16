import { ref } from 'vue'
import { updateTrackPrice } from '../api/updateTrackPrice.api'
import { useDJStore } from '@/entities/dj'

export function useUpdateTrackPrice() {
    const djStore = useDJStore()
    const isUpdating = ref(false)
    const error = ref<string | null>(null)

    const updatePrice = async (trackId: number, price: number) => {
        if (!djStore.currentDJ) throw new Error('No DJ selected')

        isUpdating.value = true
        error.value = null
        try {
            const { data: updatedTrack, error: apiError, execute } = updateTrackPrice(djStore.currentDJ.id, trackId, price)
            await execute()
            if (apiError.value) throw new Error(apiError.value)

            const index = djStore.tracks.findIndex(t => t.id === trackId)
            if (index !== -1 && updatedTrack.value) {
                djStore.tracks[index] = updatedTrack.value
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isUpdating.value = false
        }
    }

    return { updatePrice, isUpdating, error }
}