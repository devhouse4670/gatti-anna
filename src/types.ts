export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'dosas' | 'coffees' | 'idli-vada' | 'uttapams' | 'thalis' | 'specials';
  tags: string[];
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  image: string;
  calories?: number;
  preparationTime?: string; // e.g. "10 mins"
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  source: 'Google' | 'Zomato' | 'Instagram';
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'outdoor' | 'culinary' | 'nightlife';
  image: string;
  description: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'seated';
  tableNumber?: number;
  createdAt: string;
}
