export interface DJ {
	id: number
	user_id: number
	stage_name: string
	city: string
	payment_details: string
	sex: string
	phone: string
	email: string
	tracks: Track[] | string[] // Измените это поле
	website: string
	price: number
	photo: string
	photo_url: string
	views: number
	description: string
	created_at: string
	updated_at: string
}

export interface DJRegistration {
	user_id: number
	stage_name: string
	city: string
	payment_details: string
	sex: string
	phone: string
	email: string
	tracks: Track[] | string[] // Измените это поле
	website: string
	price: number
}

export interface Track {
	id: number
	name: string
	created_at: string
	updated_at: string
}
