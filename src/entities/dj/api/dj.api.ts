import useApi from '@/shared/lib/api/use-api'
import type { DJ, Track } from '../model/types'

export function getDJProfile(id: number) {
    return useApi<DJ>('get', `/dj/profile/${id}`)
}

export function getDJTracks(djId: number) {
    return useApi<Track[]>('get', `/dj/${djId}/tracks`)
}