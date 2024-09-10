import { DJ } from '@/entities/dj/model/types'

export interface Settings {
	title: string
	description: string
	settings: {
		views: number
	}
	photo: string
	photo_url: string
}

export interface User {
	id: number
	telegram_id: string
	name: string
	phone_number: string
	email: string
	email_verified_at: string | null
	created_at: string
	updated_at: string
	last_login: string | null
	is_dj: boolean
	dj: DJ | null
	settings: Settings | null
}
