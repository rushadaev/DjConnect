import { defineStore } from 'pinia'
import useApi from '@/shared/lib/api/use-api'
import type { DJ, Track } from './types'
import { useSessionStore } from '@/entities/session/model/session.store'

export const useDJStore = defineStore('dj', {
    state: () => ({
        currentDJ: null as DJ | null,
        tracks: [] as Track[],
        isLoading: false,
        error: null as string | null,
    }),
    actions: {
        async registerDJ(djData: Omit<DJ, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<DJ>('post', '/dj/register', djData)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if (data.value) {
                    this.currentDJ = data.value
                    return data.value
                } else {
                    throw new Error('No data received from API')
                }
            } catch (error) {
                this.error = 'Failed to register DJ'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async updateDJProfile(djData: Partial<DJ>) {
            this.isLoading = true
            this.error = null
            const sessionStore = useSessionStore()
            const djId = sessionStore.user?.dj?.id

            if (!djId) {
                this.error = 'DJ ID not found'
                this.isLoading = false
                throw new Error('DJ ID not found')
            }

            try {
                const { data, error: apiError, execute } = useApi<DJ>('put', `/dj/profile/${djId}`, djData)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if (data.value) {
                    this.currentDJ = data.value
                    if (sessionStore.user) {
                        sessionStore.user.dj = data.value
                    }
                    return data.value
                } else {
                    throw new Error('No data received from API')
                }
            } catch (error) {
                this.error = 'Failed to update DJ profile'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async fetchTracks(djId: number) {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<Track[]>('get', `/dj/${djId}/tracks`)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                this.tracks = data.value || []
                return this.tracks
            } catch (error) {
                this.error = 'Failed to fetch tracks'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async addTrack(djId: number, name: string) {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<Track>('post', `/dj/${djId}/track`, { name })
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if (data.value) {
                    this.tracks.push(data.value)
                    return data.value
                } else {
                    throw new Error('No data received from API')
                }
            } catch (error) {
                this.error = 'Failed to add track'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async updateTrackPrice(trackId: number, price: number) {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<Track>('patch', `/dj/${this.currentDJ?.id}/track/${trackId}/price`, { price })
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                const index = this.tracks.findIndex((t: Track) => t.id === trackId)
                if (index !== -1 && data.value) {
                    this.tracks[index] = data.value
                }
            } catch (error) {
                this.error = 'Failed to update track price'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async deleteTrack(djId: number, trackId: number) {
            this.isLoading = true
            this.error = null
            try {
                const { error: apiError, execute } = useApi<void>('delete', `/dj/${djId}/track/${trackId}`)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                this.tracks = this.tracks.filter(t => t.id !== trackId)
            } catch (error) {
                this.error = 'Failed to delete track'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
    },
})