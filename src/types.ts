export interface MenuItem {
  id: string;
  name: string;
  price: number; // numeric price in NPR
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface EventPackage {
  id: string;
  name: string;
  price: string;
  capacity: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestsCount: string;
  selectedPackage: string;
  specialRequests: string;
}

export interface ContentEditableDict {
  [key: string]: string;
}
