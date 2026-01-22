import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product, ProductInput } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly storageKey = 'inventory-ledger.products';
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // IMPORTANT: localStorage only exists in browser
    if (this.isBrowser) {
      this.seedIfEmpty();
    }
  }

  list(): Product[] {
    return this.read();
  }

  getById(id: string): Product | undefined {
    return this.read().find(p => p.id === id);
  }

  create(input: ProductInput): void {
    if (!this.isBrowser) return;

    const products = this.read();
    const product: Product = {
      id: crypto.randomUUID(),
      ...input,
      updatedAt: new Date().toISOString(),
    };
    products.unshift(product);
    this.write(products);
  }

  update(id: string, input: ProductInput): void {
    if (!this.isBrowser) return;

    const products = this.read();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return;

    products[idx] = {
      ...products[idx],
      ...input,
      updatedAt: new Date().toISOString(),
    };
    this.write(products);
  }

  remove(id: string): void {
    if (!this.isBrowser) return;

    const products = this.read().filter(p => p.id !== id);
    this.write(products);
  }

  // ----------------- private helpers -----------------

  private read(): Product[] {
    // On server, return empty so SSR can render without crashing
    if (!this.isBrowser) return [];

    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];

    try {
      return JSON.parse(raw) as Product[];
    } catch {
      return [];
    }
  }

  private write(products: Product[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  private seedIfEmpty(): void {
    const existing = this.read();
    if (existing.length > 0) return;

    const now = new Date().toISOString();
    const seed: Product[] = [
      {
        id: crypto.randomUUID(),
        name: 'Sample Product',
        sku: 'SKU-001',
        category: 'General',
        price: 10,
        quantityOnHand: 5,
        status: 'ACTIVE',
        updatedAt: now,
      },
    ];

    this.write(seed);
  }
}
