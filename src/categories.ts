// categories.ts
type Gender = 'male' | 'female';
interface Category {
    name: string;
    subcategories: string[];
  }
export const categoriesByGender:Record<Gender, Category[]> = {
    male: [
  {
    name: 'Tops',
    subcategories: ['T-Shirts', 'Shirts', 'Polos', 'Hoodies', 'Tank Tops', 'Graphic Tees']
  },
  {
    name: 'Bottoms',
    subcategories: ['Jeans', 'Trousers', 'Joggers', 'Chinos', 'Cargo Pants', 'Shorts']
  },
  {
    name: 'Outerwear',
    subcategories: ['Jackets', 'Blazers', 'Coats', 'Sweaters', 'Cardigans', 'Vests', 'Parkas']
  },
  {
    name: 'Suits',
    subcategories: ['Two-Piece Suit', 'Three-Piece Suit', 'Tuxedo', 'Dinner Jacket']
  },
  {
    name: 'Ethnic Wear',
    subcategories: ['Kurta', 'Sherwani', 'Dhoti', 'Nehru Jacket']
  },
  {
    name: 'Shoes',
    subcategories: [
      'Sneakers',
      'Boots',
      'Loafers',
      'Formal Shoes',
      'Sandals',
      'Slippers'
    ]
  },
  {
    name: 'Accessories',
    subcategories: [
      'Hats/caps',
      'Ties',
      'Scarves',
      'Pocket Squares'
    ]
  }
],
female: [
   {
    name: 'Tops',
    subcategories: ['T-Shirts', 'Shirts', 'Crop Tops', 'Hoodies', 'Tank Tops', 'Graphic Tees', 'Blouses']
  },
  {
    name: 'Bottoms',
    subcategories: ['Jeans', 'Trousers', 'Skirts', 'Shorts', 'Leggings', 'Palazzos', 'Culottes','Track Pants','Yoga Pants']
  },
  {
    name: 'Dresses',
    subcategories: [
      'Casual',
      'Formal',
      'Evening',
      'Summer',
      'Party Wear',
      'Maxi Dresses',
      'Mini Dresses',
      'Midi Dresses',
      'Gowns'
    ]
  },
  {
    name: 'Outerwear',
    subcategories: [
      'Jackets',
      'Coats',
      'Sweaters',
      'Sweatshirts'
      'Cardigans',
      'Blazers',
      'Capes',
      'Shrugs',
      'Ponchos'
    ]
  },
  {
    name: 'Suits',
    subcategories: [ 'Pantsuit', 'Skirt Suit']
  },
  {
    name: 'Shoes',
    subcategories: [
      'Heels',
      'Flats',
      'Sneakers',
      'Boots',
      'Wedges',
      'Sandals',
      'Slippers',
      'Sports Shoes',
      'Mules'
    ]
  },
  {
    name: 'Accessories',
    subcategories: [
      'handbags/Bags',
      'Jewelry',
      'Scarves',
      'Sunglasses',
      'Hats/caps',
      'Gloves',
      'Clutches'
    ]
  },
  {
    name: 'Ethnic Wear',
    subcategories: ['Sarees', 'Lehengas', 'Salwar Suits', 'Kurtis', 'Anarkalis', 'Dupattas']
  }
  };
  

  
  export const getCategoriesByGender = (gender: Gender): Category[] =>
      categoriesByGender[gender] || [];
  
