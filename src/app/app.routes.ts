import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

import { ProductListComponent } from './pages/products/product-list/product-list';
import { ProductFormComponent } from './pages/products/product-form/product-form';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },

  { path: '**', redirectTo: '' },
];
