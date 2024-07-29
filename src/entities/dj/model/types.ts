export interface DJ {
    id: number;
    user_id: number;
    stage_name: string;
    city: string;
    payment_details: string;
    track_price: number;
    created_at: string;
    updated_at: string;
}

export interface DJUpdateData {
    stage_name: string;
    city: string;
    payment_details: string;
    track_price: number;
}

export interface Track {
    id: number;
    name: string;
    artist: string;
    duration: string;
    created_at: string;
    updated_at: string;
}