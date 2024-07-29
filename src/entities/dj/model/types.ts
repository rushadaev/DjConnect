export interface DJ {
    id: number;
    user_id: number;
    stage_name: string;
    city: string;
    payment_details: string;
    sex: string;
    phone: string;
    email: string;
    website: string;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface Track {
    id: number;
    name: string;
    artist: string;
    duration: string;
    created_at: string;
    updated_at: string;
}