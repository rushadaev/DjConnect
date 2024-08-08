export type Statistics = {
    'total_orders': number;
    'total_income': number;
    'average_price': number;
    'min_price': number;
    'max_price': number;
    'most_popular_tracks': {
      'track_id': number;
      'count': number;
    };
}