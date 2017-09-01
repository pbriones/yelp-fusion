import { Coordinates } from './coordinates';
import { Location } from './location';
export class Business{
  id: string;
  price: string;
  name: string;
  rating: number;
  review_count: number;
  url: string;
  phone: string;
  distance: string;
  display_phone: string;
  coordinates: Coordinates;
  is_closed: boolean;
  location: Location;
}