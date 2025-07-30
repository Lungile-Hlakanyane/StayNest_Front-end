export interface Booking {
  id: number;
  availableDate: string;
  bookingPolicy: string;
  maxGuests: number;
  status: string;
  landlordId: number;
  propertyId: number;
  bookedById: number;
  propertyName: string;
  propertyLocation: string;
  imageUrl: string;
  type?: string;
}
