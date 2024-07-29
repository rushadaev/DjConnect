export interface User {
    id: number;
    telegram_id: string;
    name: string;
    phone_number: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    last_login: string | null;
    is_dj: boolean;
    dj?: DJ;
}

export interface DJ {
    id: number;
    user_id: number;
    stage_name: string;
    city: string;
    payment_details: string;
    created_at: string;
    updated_at: string;
}