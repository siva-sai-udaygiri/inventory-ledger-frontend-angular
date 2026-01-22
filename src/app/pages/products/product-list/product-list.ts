// src/app/pages/products/product-list/product-list.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchTerm = '';

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.products = this.productService.list();
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.searchTerm = value;
  }

  get filteredProducts(): Product[] {
    const q = this.normalize(this.searchTerm);
    if (!q) return this.products;

    return this.products.filter((p) => {
      const name = this.normalize(p.name);
      const sku = this.normalize(p.sku);
      const category = this.normalize(p.category);
      return name.includes(q) || sku.includes(q) || category.includes(q);
    });
  }

  private normalize(v: unknown): string {
    return String(v ?? '').trim().toLowerCase();
  }

  trackById(_: number, p: Product): string {
    return p.id;
  }

  onDelete(id: string): void {
    const ok = confirm('Delete this product?');
    if (!ok) return;

    this.productService.remove(id);
    this.reload();
  }
}
