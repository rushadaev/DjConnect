import { defineStore } from 'pinia'
import useApi from '@/shared/lib/api/use-api'
import type { DJ, Track } from './types'
import { useSessionStore } from '@/entities/session/model/session.store'
import type { Order, Statistics, PayoutRequest, PayoutStatus } from '@/features/order-music/model'

export const useDJStore = defineStore('dj', {
    state: () => ({
        selectedTrack: null as Track | null,
        currentDJ: null as DJ | null,
        tracks: [] as Track[],
        isLoading: false,
        error: null as string | null,
        qrCode: null as string | null,
        stats: {} as Statistics,
        payoutStatus: null as PayoutStatus | null,
        payouts: [] as PayoutStatus[],
        availableBalance: null as number | null,
    }),
    actions: {
        async selectTrack(id: number | string) {
            this.selectedTrack = this.tracks.find(t => t.id === +id) || null
        },
        async orderTrackRequest() {
            this.isLoading = true
            this.error = null
            try {
                const { error: apiError, execute } = useApi<void>('post', '/orders', {
                    'dj_id': this.currentDJ?.id,
                    'track_id': this.selectedTrack?.id,
                    'price': this.currentDJ?.price,
                    'message': 'Please play this track!'
                })
                await execute()
                if (apiError.value) throw new Error(apiError.value)
            } catch (error) {
                this.error = 'Failed to send track request'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
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
        async fetchDJProfile(id: string | number) {
            this.isLoading = true
            this.error = null

            if (!id) {
                this.error = 'DJ ID not found'
                this.isLoading = false
                throw new Error('DJ ID not found')
            }

            try {
                const { data, error: apiError, execute } = useApi<DJ>('get', `/dj/profile/${id}`)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if (data.value) {
                    this.currentDJ = data.value
                    return data.value
                } else {
                    throw new Error('No data received from API')
                }
            } catch (error) {
                this.error = 'Failed to fetch DJ profile'
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
        // /dj/{dj_id}/qr-code
        // Generate QR code for DJ profile [web-server request]
        generateQRCode(djId: number): string {
            this.qrCode = `https://dj-connect.xyz/dj/${djId}/qr-code`
            return this.qrCode
        },
        //dj/{dj_id}/statistics Get statistics for a DJ
        async fetchDJStatistics(djId: number): Promise<Statistics> {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<Statistics>('get', `/dj/${djId}/statistics`)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                this.stats = data.value as Statistics || {}
                return data.value as Statistics || {}
            } catch (error) {
                this.error = 'Failed to fetch DJ statistics'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async fetchDJOrders(djId: number): Promise<Order[]> {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<Order[]>('get', `/dj/${djId}/orders`)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                return data.value as Order[] || []
            } catch (error) {
                this.error = 'Failed to fetch DJ orders'
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
        async createPayoutRequest(djId: number, amount: number, cardNumber: string) {
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<PayoutStatus>('post', '/payouts', {
                    'dj_id': djId,
                    'amount': amount,
                    'payout_type': 'bank_card',
                    'payout_details': {
                        'card_number': cardNumber
                    }
                } as PayoutRequest)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if(data.value){
                    this.payoutStatus = data.value
                    return data.value
                }
            } catch (error) {
                this.error = 'Failed to create payout request'
                console.error(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },
        async fetchDJPayouts(djId: number) {
            // /payouts/{dj_id} Get all payouts and available balance for a specific DJ
            this.isLoading = true
            this.error = null
            try {
                const { data, error: apiError, execute } = useApi<{ available_balance: number; payouts: PayoutStatus[] }>('get', `/payouts/${djId}`)
                await execute()
                if (apiError.value) throw new Error(apiError.value)
                if(data.value){
                    this.payouts = data.value.payouts
                    this.availableBalance = data.value.available_balance
                    return data.value.payouts
                }
            } catch (error) {
                this.error = 'Failed to create payout request'
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