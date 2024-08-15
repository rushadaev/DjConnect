export type PayoutStatus = {
    id: number;
    dj_id: number;
    amount: number;
    status: 'pending';
    payout_type: 'bank_card';
    payout_details: string;
    yookassa_payout_id: string;
    created_at: string;
    updated_at: string;
    processed_at: string;
}

export type PayoutRequest = {
    'dj_id': number,
    'amount': number,
    'payout_type': 'bank_card',
    'payout_details': {
      'card_number': 'string'
    }
  }