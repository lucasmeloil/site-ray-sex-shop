# Database Setup Guide

## Overview

This project now uses **Netlify DB** (powered by Neon PostgreSQL) for persistent product data storage instead of localStorage.

## Prerequisites

1. Make sure you're logged into Netlify CLI: `netlify login`
2. Link your site: `netlify link`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install `@netlify/neon` and other required dependencies.

### 2. Initialize Database

The database will be automatically provisioned when you run:

```bash
netlify dev
```

Or during deployment:

```bash
netlify build
```

### 3. Run Database Migration

To create the products table and seed initial data:

```bash
npm run migrate
```

This script will:
- Create the `products` table if it doesn't exist
- Insert initial product data (only if the table is empty)
- Set up all required indexes and constraints

## Database Schema

### Products Table

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Auto-incrementing product ID |
| name | VARCHAR(255) | Product name |
| category | VARCHAR(100) | Product category |
| price | VARCHAR(50) | Display price |
| original_price | VARCHAR(50) | Original price (for promotions) |
| image_url | TEXT | Product image URL |
| description | TEXT | Full product description |
| short_description | VARCHAR(255) | Short promotional description |
| sku | VARCHAR(100) UNIQUE | Product SKU |
| is_promotion | BOOLEAN | Promotion flag |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

## API Endpoints

All product operations are handled through the `/api/products` endpoint:

### GET /api/products
Retrieves all products from the database.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "category": "Category",
    "price": "R$ 99,90",
    ...
  }
]
```

### POST /api/products
Creates a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "category": "Category",
  "price": "R$ 99,90",
  "imageUrl": "https://...",
  "description": "Full description",
  "shortDescription": "Short promo",
  "sku": "SKU-001",
  "isPromotion": false
}
```

### PUT /api/products
Updates an existing product.

**Request Body:**
```json
{
  "id": 1,
  "name": "Updated Name",
  ...
}
```

### DELETE /api/products?id=1
Deletes a product by ID.

## Local Development

1. Start the dev server:
```bash
netlify dev
```

2. The application will be available at http://localhost:8888
3. The Netlify Functions will be available at http://localhost:8888/.netlify/functions/

## Deployment

When deploying to Netlify:

1. Push your changes to your repository
2. Netlify will automatically:
   - Provision a database (if not already provisioned)
   - Deploy your functions
   - Build and deploy your site

3. Run the migration script after deployment:
```bash
netlify env:get NETLIFY_DATABASE_URL
npm run migrate
```

## Troubleshooting

### Database not provisioned
- Make sure you're logged in: `netlify login`
- Make sure your site is linked: `netlify link`
- Try running `netlify dev` to trigger database provisioning

### Migration fails
- Check that NETLIFY_DATABASE_URL is set: `netlify env:get NETLIFY_DATABASE_URL`
- Ensure you have a stable internet connection
- Check the error logs for specific issues

### Functions not working locally
- Make sure you're running `netlify dev` (not just `npm run dev`)
- Check that @netlify/neon is properly installed
- Verify the function path in netlify.toml or the config export

## Notes

- The database is automatically provisioned and doesn't require a Neon account
- You can claim your database through the Netlify UI if needed
- All product data is now persisted in the database instead of localStorage
- Admin users are still stored in localStorage (can be migrated to DB if needed)
