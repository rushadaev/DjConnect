// entities/Session/api/Session.api.ts
import useApi from '@/shared/lib/api/use-api'
import type { User } from '../model/types'

export function getUserData() {
    return useApi<User>('get', '/profile/me')
}

export function refreshToken() {
    return useApi<{ token: string }>('post', '/auth/refresh')
}