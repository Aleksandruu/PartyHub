export interface EventDetails {
  id: string;
  name: string;
  mainBanner: File | null;
  secondaryBanner: File | null;
  location: string;
  city: string;
  lng: number;
  lat: number;
  date: Date;
  details: string;
  price: number;
  discount: number;
  ticketsNumber: number;
  ticketsLeft: number;
}
