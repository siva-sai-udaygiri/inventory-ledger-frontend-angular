# Inventory Ledger UI (Angular)

A lightweight Inventory Ledger (front-end) built with Angular.  
It provides a simple **Products** module with CRUD operations and **client-side search** to manage items such as electronics/accessories with fields like SKU, category, price, quantity, and status.

## Key Features

- **Products List**
  - Displays products in a table (Name, SKU, Category, Price, Qty, Status)
  - Actions: **Edit** and **Delete**
- **Create / Edit Product**
  - Add new products
  - Update existing products
- **Search / Filter**
  - Search products by **name / SKU / category** (client-side)
- **Local persistence**
  - Product data is stored locally (browser) so refresh keeps your data

## Tech Stack
- Angular (Angular CLI)
- TypeScript
- SCSS
- Angular Router
- Reactive Forms

## Getting Started (Run Locally)

### Prerequisites
- **Node.js** (LTS recommended)
- **npm**
- **Angular CLI** (optional if you use `npx`)

### Install & Run
```bash
# 1) Install dependencies
npm install

# 2) Start the app
ng serve



