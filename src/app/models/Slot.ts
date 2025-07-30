export interface Slot {
   id: number;
  availableDate: string;
  bookingPolicy: string;
  maxGuests: number;
  status: string;
  property: {
    id: number;
    name: string;
    location: string;
    price: number;
  };
  landlord: {
    id: number;
    fullName: string;
    email: string;
  };
}
