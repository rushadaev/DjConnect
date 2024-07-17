import useApi from '@/shared/lib/api/use-api'
import type { DJ } from 'src/entities/Dj'

export function registerDJ(data: { stage_name: string; city: string; payment_details: string }) {
    return useApi<DJ>('post', '/dj/register', data)
}