import { neon } from '@netlify/neon';

async function migrateDatabase() {
  const sql = neon();

  console.log('Running database migrations...');

  try {
    await sql(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price VARCHAR(50) NOT NULL,
        original_price VARCHAR(50),
        image_url TEXT NOT NULL,
        description TEXT NOT NULL,
        short_description VARCHAR(255) NOT NULL,
        sku VARCHAR(100) UNIQUE NOT NULL,
        is_promotion BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Products table created successfully!');

    const result = await sql('SELECT COUNT(*) as count FROM products');
    const count = result[0]?.count || 0;

    if (count === 0) {
      console.log('No products found. Inserting initial products...');
      
      await sql(`
        INSERT INTO products (name, category, price, original_price, image_url, description, short_description, sku, is_promotion) VALUES
        ('Vibrador Pulsar', 'Vibradores', 'R$ 299,90', 'R$ 349,90', 'https://placehold.co/300x300/ec4899/ffffff?text=Produto', 'Vibrador potente com múltiplos padrões de pulsação.', '15% de desconto no PIX', 'RAY-001', true),
        ('Kit Sedução Neon', 'Kits', 'R$ 199,90', NULL, 'https://placehold.co/300x300/ec4899/ffffff?text=Produto', 'Kit completo para noites inesquecíveis.', 'Em até 3x sem juros', 'RAY-002', false),
        ('Óleo Deslizante Nebula', 'Lubrificantes', 'R$ 79,90', NULL, 'https://placehold.co/300x300/ec4899/ffffff?text=Produto', 'Lubrificante à base de água com efeito duradouro.', 'Compre 2, leve 3', 'RAY-003', false),
        ('Algemas de Veludo Cyber', 'Acessórios', 'R$ 129,90', NULL, 'https://placehold.co/300x300/ec4899/ffffff?text=Produto', 'Algemas macias e seguras para jogos de dominação.', 'Em até 3x sem juros', 'RAY-004', false),
        ('Chicote Pluma Negra', 'Acessórios', 'R$ 149,90', NULL, 'https://placehold.co/300x300/ec4899/ffffff?text=Produto', 'Chicote com plumas para sensações suaves e excitantes.', 'Em até 3x sem juros', 'RAY-005', false)
      `);

      console.log('Initial products inserted successfully!');
    } else {
      console.log(`Database already has ${count} products. Skipping initial data insertion.`);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

migrateDatabase();
