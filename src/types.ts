export interface MenuItem {
  id: string;
  name: string;
  category: 'tacos' | 'quesadillas' | 'tortas' | 'burritos' | 'drinks';
  price: number;
  deliveryPrice: number;
  description: string;
  image: string;
  badge?: string;
  spicyLevel?: number;
  popular?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSalsa?: string;
  notes?: string;
}

export interface Salsa {
  id: string;
  name: string;
  heatName: string;
  level: number; // 1 to 5
  color: string;
  description: string;
  ingredients: string;
  bestPairedWith: string;
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  likes: number;
}
