// src/app/pages/products/product-form/product-form.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductInput, ProductStatus } from '../product';
import { ProductService } from '../../../services/product.service';

type ProductFormValue = {
  name: FormControl<string>;
  sku: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<number>;
  quantityOnHand: FormControl<number>;
  status: FormControl<ProductStatus>;
};

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductFormComponent implements OnInit {
  private editingId: string | null = null;

  form: FormGroup<ProductFormValue> = new FormGroup<ProductFormValue>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    sku: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    category: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    quantityOnHand: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    status: new FormControl<ProductStatus>('ACTIVE', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const product = this.productService.getById(id);
    if (!product) {
      alert('Product not found');
      void this.router.navigateByUrl('/products');
      return;
    }

    this.editingId = id;
    this.form.patchValue({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      quantityOnHand: product.quantityOnHand,
      status: product.status,
    });
  }

  get isEditMode(): boolean {
    return this.editingId !== null;
  }

  // getters used by template (NOT private)
  get nameCtrl() { return this.form.controls.name; }
  get skuCtrl() { return this.form.controls.sku; }
  get categoryCtrl() { return this.form.controls.category; }
  get priceCtrl() { return this.form.controls.price; }
  get quantityOnHandCtrl() { return this.form.controls.quantityOnHand; }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();

    const input: ProductInput = {
      name: v.name.trim(),
      sku: v.sku.trim(),
      category: v.category.trim(),
      price: v.price,
      quantityOnHand: v.quantityOnHand,
      status: v.status,
    };

    if (this.editingId) {
      this.productService.update(this.editingId, input);
    } else {
      this.productService.create(input);
    }

    void this.router.navigateByUrl('/products');
  }
}

export class ProductForm {
}
