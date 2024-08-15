export type Statistics = {
    'total_orders': number;
    'total_income': number;
    'average_price': number;
    'min_price': number;
    'max_price': number;
    'income_current_month': number;
    'total_accepted_orders': number;
    'total_rejected_orders': number;
    'most_popular_tracks': {
      'track_id': number;
      'track_name': string;
      'count': number;
    }[];
}
