import useApi from '@/shared/lib/api/use-api'
import type { Track } from '@/entities/dj'

export function updateTrackPrice(djId: number, trackId: number, price: number) {
    return useApi<Track>('patch', `/dj/${djId}/track/${trackId}/price`, { price })
}