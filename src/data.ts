import { MenuItem, Review, TimelineEvent, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dosa-1',
    name: 'Ghee Podi Masala Dosa',
    description: 'Crispy golden crepe smeared with our secret spicy gunpowder chana-dal podi, layered with fluffy mashed potato bhaji and local white butter.',
    price: 180,
    category: 'dosas',
    tags: ['Signature', 'Spicy', 'Must-Try'],
    isPopular: true,
    isSpicy: true,
    isVegan: false,
    isGlutenFree: true,
    image: '/src/assets/images/gatti_anna_hero_dosa_1782301598217.jpg',
    calories: 420,
    preparationTime: '8 mins'
  },
  {
    id: 'coffee-1',
    name: 'Gatti Anna Filter Coffee',
    description: 'Traditional slow-dripped chicory-infused coffee decoction frothed dynamically from height with premium whole milk in a brass tumbler.',
    price: 90,
    category: 'coffees',
    tags: ['Authentic', 'Late-Night Fuel'],
    isPopular: true,
    isSpicy: false,
    isVegan: false,
    isGlutenFree: true,
    image: '/src/assets/images/gatti_anna_filter_coffee_1782301612069.jpg',
    calories: 140,
    preparationTime: '4 mins'
  },
  {
    id: 'idli-1',
    name: 'Steaming Podi Idli (Ghee Tossed)',
    description: 'Button idlis drenched in heated pure cow ghee and tossed heavily in aromatic homemade Gunpowder (Podi) spice mix, served with thick coconut chutney.',
    price: 140,
    category: 'idli-vada',
    tags: ['Soft & Fluffy', 'Comfort Food', 'Spicy'],
    isPopular: true,
    isSpicy: true,
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800',
    calories: 280,
    preparationTime: '5 mins'
  },
  {
    id: 'uttapam-1',
    name: 'Onion Tomato Chilli Uttapam',
    description: 'Thick fermented rice pancake topped with finely chopped country onions, ripe tomatoes, spicy green chillies, fresh coriander, and cooked with oil.',
    price: 160,
    category: 'uttapams',
    tags: ['Classic', 'Hearty'],
    isPopular: false,
    isSpicy: true,
    isVegan: true,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800',
    calories: 340,
    preparationTime: '10 mins'
  },
  {
    id: 'thali-1',
    name: 'Royal South Indian Feast Thali',
    description: 'A comprehensive culinary experience featuring Sona Masuri rice, rich Sambar, tangy Rasam, Kootu, Poriyal, Curd, Appalam, Pickles, and fresh Payasam.',
    price: 290,
    category: 'thalis',
    tags: ['Full Meal', 'Grand Choice'],
    isPopular: true,
    isSpicy: false,
    isVegan: false,
    isGlutenFree: false,
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800',
    calories: 850,
    preparationTime: '12 mins'
  },
  {
    id: 'dosa-2',
    name: 'Cheese Garlic Schezwan Dosa',
    description: 'A fusion masterpiece with melted cheese, spicy Schezwan sauce, roasted garlic, and finely grated bell peppers in a thin crispy crepe.',
    price: 210,
    category: 'dosas',
    tags: ['Fusion', 'Spicy', 'Instagram Star'],
    isPopular: true,
    isSpicy: true,
    isVegan: false,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800&blur=2',
    calories: 490,
    preparationTime: '9 mins'
  },
  {
    id: 'idli-2',
    name: 'Crispy Medu Vada (Pair)',
    description: 'Donut-shaped crispy lentil fritters seasoned with black peppercorns, fresh ginger, and curry leaves. Fried to golden perfection, served hot.',
    price: 120,
    category: 'idli-vada',
    tags: ['Crispy Side', 'Perfect Companion'],
    isPopular: false,
    isSpicy: false,
    isVegan: true,
    isGlutenFree: true,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb49785?auto=format&fit=crop&q=80&w=800',
    calories: 220,
    preparationTime: '6 mins'
  },
  {
    id: 'specials-1',
    name: 'Gatti Anna Midnight Special platter',
    description: 'Curated specifically for late-night cravings. A combination of 1 Mini Ghee Dosa, 2 Mini Podi Idlis, and 1 Mini Uttapam, served with unlimited hot sambar.',
    price: 240,
    category: 'specials',
    tags: ['Midnight Feast', 'Best Value'],
    isPopular: true,
    isSpicy: true,
    isVegan: false,
    isGlutenFree: false,
    image: '/src/assets/images/gatti_anna_hero_dosa_1782301598217.jpg',
    calories: 580,
    preparationTime: '8 mins'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aditya Ranade',
    rating: 5,
    text: 'Gatti Anna has changed Pune\'s late-night food scene! Getting piping hot, ghee-loaded podi idli and authentic filter coffee at 3 AM in Viman Nagar is a pure blessing. The vibe is absolutely incredible and super lively.',
    date: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    source: 'Google'
  },
  {
    id: 'rev-2',
    author: 'Neha Deshmukh',
    rating: 5,
    text: 'The Ghee Podi Masala Dosa here is legendary. Super crispy, perfect balance of spices, and they do not hold back on the ghee! Best part is sitting out in the cool breeze after midnight under their warm fairy lights.',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    source: 'Zomato'
  },
  {
    id: 'rev-3',
    author: 'Shrikant Joshi',
    rating: 5,
    text: 'A late-night South Indian sanctuary in Pune. I come here with my friends after exams or late office shifts. Highly recommend their filter coffee—it keeps us awake and energized. Service is lightning fast even at 2 AM!',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    source: 'Google'
  },
  {
    id: 'rev-4',
    author: 'Priya Nair',
    rating: 5,
    text: 'They capture the true soul of Madurai and Chennai street food with a beautiful, Instagram-friendly Pune modern cafe twist. Everything is fresh, hygienic, and unbelievably delicious. Truly a 4.8 star experience!',
    date: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    source: 'Instagram'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2018',
    title: 'The Humble Cart Beginnings',
    description: 'Gatti Anna started as a late-night street food cart in Pune, catering to college students and tech workers looking for comforting, authentic South Indian breakfast during the late hours.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: '2020',
    title: 'Defining the 21-Hour Vibe',
    description: 'We established our permanent open-air night café format in Viman Nagar. Pioneering the "5 AM to 3 AM" dining schedule to ensure wholesome hot food is accessible around the clock.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600'
  },
  {
    year: '2022',
    title: 'The Ghee & Podi Craze',
    description: 'Our proprietary Gunpowder chana-dal "Podi" formulation went viral on social media. People from all over Pune started queueing up past midnight just to try our Ghee Podi Butter Dosas.',
    image: '/src/assets/images/gatti_anna_hero_dosa_1782301598217.jpg'
  },
  {
    year: '2024 - Present',
    title: 'Pune\'s Premier Night Sanctuary',
    description: 'Now serving thousands of happy food lovers daily near Phoenix Marketcity. Recognized as Pune\'s ultimate premium yet approachable social hub for authentic food, laughter, and premium filter coffee.',
    image: '/src/assets/images/gatti_anna_restaurant_interior_1782301627431.jpg'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Rustic Warm Interiors',
    category: 'interior',
    image: '/src/assets/images/gatti_anna_restaurant_interior_1782301627431.jpg',
    description: 'Cozy, amber-lit wood design creating an intimate dining atmosphere.'
  },
  {
    id: 'gal-2',
    title: 'Lively Outdoor Dining',
    category: 'outdoor',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800',
    description: 'Open-air space bathed in soft neon and fairy lights, perfect for Pune nights.'
  },
  {
    id: 'gal-3',
    title: 'The Ghee Podi Preparation',
    category: 'culinary',
    image: '/src/assets/images/gatti_anna_hero_dosa_1782301598217.jpg',
    description: 'Artisan chefs preparing crispy butter-ghee crepes on high-heat flat tops.'
  },
  {
    id: 'gal-4',
    title: 'Late Night Conversations',
    category: 'nightlife',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    description: 'Crowds enjoying hot filter coffee and laughter until the early hours of 3 AM.'
  },
  {
    id: 'gal-5',
    title: 'Flawless Filter Coffee Decoction',
    category: 'culinary',
    image: '/src/assets/images/gatti_anna_filter_coffee_1782301612069.jpg',
    description: 'Traditional metal drippers extracting premium aromatic coffee.'
  },
  {
    id: 'gal-6',
    title: 'Gatti Anna Street Presence',
    category: 'outdoor',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
    description: 'Our iconic green and gold signage lighting up Viman Nagar, Pune.'
  }
];
