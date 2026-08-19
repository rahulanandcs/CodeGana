export interface ShopItem {
  id: string;
  name: string;
  type: 'background' | 'decal' | 'accessory';
  price: number;
  description: string;
  value: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  // --- BACKGROUNDS (Scene Backgrounds) ---
  {
    id: 'bg-day',
    name: 'Sunny Day',
    type: 'background',
    price: 0,
    description: 'A bright day with rolling hills and a glowing sun.',
    value: 'bg-day'
  },
  {
    id: 'bg-night',
    name: 'Desert Night',
    type: 'background',
    price: 0,
    description: 'A starry night with a crescent moon, desert ground, and cacti.',
    value: 'bg-night'
  },
  {
    id: 'bg-twilight',
    name: 'Twilight Forest',
    type: 'background',
    price: 0,
    description: 'A twilight sky over a dark forest with pine trees and a low sun.',
    value: 'bg-twilight'
  },
  {
    id: 'bg-dusk',
    name: 'Swamp Dusk',
    type: 'background',
    price: 0,
    description: 'A dusky swamp with a hazy orange sun and water reeds.',
    value: 'bg-dusk'
  },

  // --- DECALS (Car-Style Vinyls) ---
  {
    id: 'decal-flames',
    name: 'Racing Flames',
    type: 'decal',
    price: 0,
    description: 'Hot rod racing flame vinyl graphics.',
    value: 'decal-flames'
  },
  {
    id: 'decal-lightning',
    name: 'Thunder Bolt',
    type: 'decal',
    price: 0,
    description: 'Twin jagged side bolts.',
    value: 'decal-lightning'
  },
  {
    id: 'decal-stripes',
    name: 'GT Rally Stripes',
    type: 'decal',
    price: 0,
    description: 'Dual athletic center stripes.',
    value: 'decal-stripes'
  },
  {
    id: 'decal-num-single',
    name: 'Single Digit Plate',
    type: 'decal',
    price: 0,
    description: 'Custom 1-digit racing number plate (0-9).',
    value: 'decal-num-single'
  },
  {
    id: 'decal-num-double',
    name: 'Double Digit Plate',
    type: 'decal',
    price: 0,
    description: 'Custom 2-digit squad number plate (00-99).',
    value: 'decal-num-double'
  },

  // --- ACCESSORIES ---
  {
    id: 'acc-crown',
    name: 'Monarch Crown',
    type: 'accessory',
    price: 0,
    description: 'Fit for Python royalty.',
    value: 'acc-crown'
  },
  {
    id: 'acc-visor',
    name: 'Cyber Visor',
    type: 'accessory',
    price: 0,
    description: 'Sleek futuristic eye shade.',
    value: 'acc-visor'
  }
];