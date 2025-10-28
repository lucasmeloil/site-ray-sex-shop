import type { Context } from '@netlify/functions';
import { neon } from '@netlify/neon';

export default async (req: Request, context: Context) => {
  const sql = neon();

  try {
    if (req.method === 'GET') {
      const products = await sql(`
        SELECT 
          id,
          name,
          category,
          price,
          original_price as "originalPrice",
          image_url as "imageUrl",
          description,
          short_description as "shortDescription",
          sku,
          is_promotion as "isPromotion"
        FROM products
        ORDER BY created_at DESC
      `);

      return new Response(JSON.stringify(products), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const { name, category, price, originalPrice, imageUrl, description, shortDescription, sku, isPromotion } = body;

      if (!name || !category || !price || !imageUrl || !description || !shortDescription || !sku) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const result = await sql(
        `INSERT INTO products (name, category, price, original_price, image_url, description, short_description, sku, is_promotion)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING id, name, category, price, original_price as "originalPrice", image_url as "imageUrl", description, short_description as "shortDescription", sku, is_promotion as "isPromotion"`,
        [name, category, price, originalPrice || null, imageUrl, description, shortDescription, sku, isPromotion || false]
      );

      return new Response(JSON.stringify(result[0]), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'PUT') {
      const body = await req.json();
      const { id, name, category, price, originalPrice, imageUrl, description, shortDescription, sku, isPromotion } = body;

      if (!id) {
        return new Response(JSON.stringify({ error: 'Product ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const result = await sql(
        `UPDATE products 
         SET name = $1, category = $2, price = $3, original_price = $4, image_url = $5, 
             description = $6, short_description = $7, sku = $8, is_promotion = $9, updated_at = CURRENT_TIMESTAMP
         WHERE id = $10
         RETURNING id, name, category, price, original_price as "originalPrice", image_url as "imageUrl", description, short_description as "shortDescription", sku, is_promotion as "isPromotion"`,
        [name, category, price, originalPrice || null, imageUrl, description, shortDescription, sku, isPromotion || false, id]
      );

      if (result.length === 0) {
        return new Response(JSON.stringify({ error: 'Product not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify(result[0]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');

      if (!id) {
        return new Response(JSON.stringify({ error: 'Product ID is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const result = await sql('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

      if (result.length === 0) {
        return new Response(JSON.stringify({ error: 'Product not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: '/api/products'
};
