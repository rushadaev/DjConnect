import { defineStore } from 'pinia'
import { getDJProfile, getDJTracks } from '../api/dj.api'
import type { DJ, Track } from './types'

export const useDJStore = defineStore('Dj', {
    state: () => ({
        currentDJ: null as DJ | null,
        tracks: [] as Track[],
    }),
    actions: {
        async fetchDJProfile(id: number) {
            const { data, error, execute } = getDJProfile(id)
            await execute()
            if (error.value) throw new Error(error.value)
            this.currentDJ = data.value
        },
        async fetchDJTracks(djId: number) {
            const { data, error, execute } = getDJTracks(djId)
            await execute()
            if (error.value) throw new Error(error.value)
            this.tracks = data.value || []
        },
    },
})