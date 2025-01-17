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
        subcategories: ['T-Shirts', 'Shirts', 'Sweaters', 'Blazers']
      },
      {
        name: 'Bottoms',
        subcategories: ['Jeans', 'Trousers', 'Shorts']
      },
      {
        name: 'Outerwear',
        subcategories: ['Jackets', 'Coats', 'Cardigans']
      },
      {
        name: 'Shoes',
        subcategories: ['Sneakers', 'Boots', 'Loafers']
      }
    ],
    female: [
      {
        name: 'Tops',
        subcategories: ['Blouses', 'T-Shirts', 'Shirts', 'Sweaters']
      },
      {
        name: 'Bottoms',
        subcategories: ['Jeans', 'Trousers', 'Skirts', 'Shorts']
      },
      {
        name: 'Dresses',
        subcategories: ['Casual', 'Formal', 'Evening', 'Summer']
      },
      {
        name: 'Shoes',
        subcategories: ['Heels', 'Flats', 'Sneakers', 'Boots']
      },
      {
        name: 'Accessories',
        subcategories: ['Bags', 'Jewelry', 'Scarves']
      }
    ]
  };
  

  
  export const getCategoriesByGender = (gender: Gender): Category[] =>
      categoriesByGender[gender] || [];
  