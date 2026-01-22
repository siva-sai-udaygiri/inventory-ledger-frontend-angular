

export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  quantityOnHand: number;
  status: ProductStatus;
  updatedAt: string; // ISO string
}

export type ProductInput = Omit<Product, 'id' | 'updatedAt'>;
