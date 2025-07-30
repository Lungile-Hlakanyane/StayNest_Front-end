export interface BookingWithProperty {
  id: number;
  checkIn: string;
  checkOut: string;
  status: string;
  name: string;
  image: string;
  location: string;
  description: string;
  maxGuests: number;
  bookingPolicy: string;
  propertyId: number;
}
