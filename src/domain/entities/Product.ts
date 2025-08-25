export interface ProductFeatures {
  [section: string]: unknown;
}

export interface Product {
  id: string;
  realUrl: string;
  sellerId: string;
  name: string;
  categoryId: string;
  price: number;
  quantity: number;
  sales: number;
  rating: number;
  condition: string;
  description: string;
  images: string[];
  productFeatures: ProductFeatures;
}


