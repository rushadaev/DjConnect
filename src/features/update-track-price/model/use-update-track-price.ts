import { ref } from 'vue'
import { useDJStore } from '@/entities/dj/model/dj.store'

export function useUpdateTrackPrice() {
    const isUpdating = ref(false)
    const error = ref<string | null>(null)
    const djStore = useDJStore()

    const updatePrice = async (trackId: number, newPrice: number) => {
        isUpdating.value = true
        error.value = null
        try {
            await djStore.updateTrackPrice(trackId, newPrice)
        } catch (e) {
            error.value = e instanceof Error ? e.message : String(e)
        } finally {
            isUpdating.value = false
        }
    }

    return { updatePrice, isUpdating, error }
}