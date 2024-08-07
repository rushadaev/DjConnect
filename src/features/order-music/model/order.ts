export type Order = {
    'id': string,
    'user_id': string,
    'dj_id': string,
    'track_id': string,
    'price': number,
    'message': string,
    'status': string,
    'created_at': string,
    'updated_at': string,
    'is_paid': boolean,
    'transactions': [
      {
        'id': string,
        'order_id': string,
        'amount': number,
        'payment_url': string,
        'status': string,
        'created_at': string,
        'updated_at': string
      }
    ]
  }
