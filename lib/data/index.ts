export interface Product {
  id: string
  name: string
  price: number
  discountedPrice?: number
  image: string
  images: string[] // Additional images for product details
  description: string
  category: string
  tags: string[]
  sizes: string[]
  colors: string[]
  isNew?: boolean
  rating: number
  reviews: number
  stock: number
  sku: string
  specifications: {
    [key: string]: string | number
  }
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export const categories: Category[] = [
  {
    id: 'dining',
    name: 'Dining',
    description: 'Modern dining room furniture for your home',
    image: '/categories/dining.jpg'
  },
  {
    id: 'living',
    name: 'Living',
    description: 'Comfortable living room furniture',
    image: '/categories/living.jpg'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Peaceful bedroom furniture sets',
    image: '/categories/bedroom.jpg'
  }
]

export const products: Product[] = [
  {
    id: 'asgaard-sofa',
    name: 'Asgaard Sofa',
    price: 250000,
    image: '/products/asgaard-sofa.jpg',
    images: [
      '/products/asgaard-sofa.jpg',
      '/products/asgaard-sofa-2.jpg',
      '/products/asgaard-sofa-3.jpg',
      '/products/asgaard-sofa-4.jpg'
    ],
    description: 'Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.',
    category: 'living',
    tags: ['Sofa', 'Chair', 'Home', 'Shop'],
    sizes: ['L', 'XL', 'XS'],
    colors: ['purple', 'black', 'brown'],
    isNew: true,
    rating: 4.7,
    reviews: 5,
    stock: 10,
    sku: 'SS001',
    specifications: {
      'Sales Package': '1 sectional sofa',
      'Model Number': 'TFCBLGRBL6SRHS',
      'Secondary Material': 'Solid Wood',
      'Configuration': 'L-shaped',
      'Upholstery Material': 'Fabric + Cotton',
      'Upholstery Color': 'Bright Grey & Lion',
      'Filling Material': 'Foam',
      'Finish Type': 'Bright Grey & Lion',
      'Adjustable Headrest': 'No',
      'Maximum Load Capacity': '280 KG',
      'Origin of Manufacture': 'India'
    }
  },
  {
    id: 'syltherine',
    name: 'Syltherine',
    price: 2500000,
    discountedPrice: 2000000,
    image: '/products/syltherine.jpg',
    images: [
      '/products/syltherine.jpg',
      '/products/syltherine-2.jpg',
      '/products/syltherine-3.jpg',
      '/products/syltherine-4.jpg'
    ],
    description: 'Stylish cafe chair',
    category: 'dining',
    tags: ['Dining', 'Chair'],
    sizes: ['Standard'],
    colors: ['white', 'black'],
    rating: 4.9,
    reviews: 10,
    stock: 8,
    sku: 'DC001',
    specifications: {
      'Material': 'Solid Wood',
      'Weight': '4 KG',
      'Height': '80 cm',
      'Width': '45 cm',
      'Depth': '50 cm'
    }
  },
  {
    id: 'leviosa',
    name: 'Leviosa',
    price: 2500000,
    image: '/products/leviosa.jpg',
    images: [
      '/products/leviosa.jpg',
      '/products/leviosa-2.jpg',
      '/products/leviosa-3.jpg',
      '/products/leviosa-4.jpg'
    ],
    description: 'Stylish cafe chair',
    category: 'dining',
    tags: ['Dining', 'Chair'],
    sizes: ['Standard'],
    colors: ['white', 'black', 'brown'],
    rating: 4.6,
    reviews: 8,
    stock: 15,
    sku: 'DC002',
    specifications: {
      'Material': 'Solid Wood',
      'Weight': '4 KG',
      'Height': '80 cm',
      'Width': '45 cm',
      'Depth': '50 cm'
    }
  },
  {
    id: 'lolito',
    name: 'Lolito',
    price: 7000000,
    discountedPrice: 5000000,
    image: '/products/lolito.jpg',
    images: [
      '/products/lolito.jpg',
      '/products/lolito-2.jpg',
      '/products/lolito-3.jpg',
      '/products/lolito-4.jpg'
    ],
    description: 'Luxury big sofa',
    category: 'living',
    tags: ['Sofa', 'Living Room'],
    sizes: ['L', 'XL'],
    colors: ['gray', 'black'],
    rating: 4.8,
    reviews: 12,
    stock: 5,
    sku: 'LS001',
    specifications: {
      'Material': 'Premium Fabric',
      'Seating Capacity': '3 Seater',
      'Weight': '45 KG',
      'Assembly': 'Carpenter Assembly',
      'Dimensions': '180 x 90 x 85 cm'
    }
  },
  {
    id: 'respira',
    name: 'Respira',
    price: 500000,
    image: '/products/respira.jpg',
    images: [
      '/products/respira.jpg',
      '/products/respira-2.jpg',
      '/products/respira-3.jpg',
      '/products/respira-4.jpg'
    ],
    description: 'Outdoor bar table and stool',
    category: 'dining',
    tags: ['Dining', 'Outdoor'],
    sizes: ['Standard'],
    colors: ['brown', 'black'],
    isNew: true,
    rating: 4.5,
    reviews: 6,
    stock: 20,
    sku: 'OD001',
    specifications: {
      'Material': 'Teak Wood',
      'Set Contents': '1 Table, 4 Stools',
      'Weather Resistant': 'Yes',
      'Table Dimensions': '120 x 120 x 75 cm',
      'Stool Dimensions': '45 x 45 x 65 cm'
    }
  }
]

// Helper function to format price
export const formatPrice = (price: number) => {
  return `Rp ${price.toLocaleString('id-ID')}`
}

// Helper function to calculate discount percentage
export const calculateDiscount = (price: number, discountedPrice: number) => {
  return Math.round(((price - discountedPrice) / price) * 100)
}

// Get related products
export const getRelatedProducts = (productId: string, category: string) => {
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, 4)
}

// Get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category)
}

// Get new arrivals
export const getNewArrivals = () => {
  return products.filter(product => product.isNew)
}

// Get sale products
export const getSaleProducts = () => {
  return products.filter(product => product.discountedPrice)
} 