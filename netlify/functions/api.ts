
import express, { Router, Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';
import { Pool } from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Initialize Express
const app = express();
const router = Router();

// Middleware
app.use(cors());
app.use(express.json());

// JWT Secret (Should be in env, fallback for demo)
const JWT_SECRET = process.env.JWT_SECRET || 'nexus-secret-key-change-in-prod';

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// --- HELPER FUNCTIONS ---

const handleError = (res: Response, error: any) => {
    console.error('Backend Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
};

// Middleware to authenticate JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user;
    next();
  });
};

// --- ROUTES ---

// 1. PRODUCTS ROUTES (Public Read, Protected Write)
router.get('/products', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products ORDER BY id DESC');
        const products = rows.map(p => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            category: p.category,
            price: p.price,
            originalPrice: p.original_price,
            imageUrl: p.image_url,
            images: p.images || [p.image_url],
            description: p.description,
            shortDescription: p.short_description,
            isPromotion: p.is_promotion
        }));
        res.json(products);
    } catch (err) { handleError(res, err); }
});

router.post('/products', authenticateToken, async (req, res) => {
    const { name, sku, category, price, originalPrice, imageUrl, images, description, shortDescription, isPromotion } = req.body;
    try {
        const query = `
            INSERT INTO products (name, sku, category, price, original_price, image_url, images, description, short_description, is_promotion)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const values = [name, sku, category, price, originalPrice, imageUrl, images, description, shortDescription, isPromotion];
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (err) { handleError(res, err); }
});

router.put('/products/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, sku, category, price, originalPrice, imageUrl, images, description, shortDescription, isPromotion } = req.body;
    try {
        const query = `
            UPDATE products 
            SET name=$1, sku=$2, category=$3, price=$4, original_price=$5, image_url=$6, images=$7, description=$8, short_description=$9, is_promotion=$10
            WHERE id=$11
            RETURNING *
        `;
        const values = [name, sku, category, price, originalPrice, imageUrl, images, description, shortDescription, isPromotion, id];
        const { rows } = await pool.query(query, values);
        
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        
        const p = rows[0];
        res.json({
            id: p.id,
            name: p.name,
            sku: p.sku,
            category: p.category,
            price: p.price,
            originalPrice: p.original_price,
            imageUrl: p.image_url,
            images: p.images,
            description: p.description,
            shortDescription: p.short_description,
            isPromotion: p.is_promotion
        });
    } catch (err) { handleError(res, err); }
});

router.delete('/products/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ message: 'Product deleted' });
    } catch (err) { handleError(res, err); }
});

// 2. ADMINS ROUTES
router.post('/admins/login', async (req, res) => {
    const { email, password } = req.body;
    
    // BACKEND AUTO-SEEDING for requested user
    // This ensures credentials work even on a fresh DB
    if (email === 'lucasmelo@nexus.com' && password === 'lucas102030') {
        try {
             // Try to find user
             const { rows } = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
             if (rows.length === 0) {
                 // Create if missing
                 console.log("Seeding master admin...");
                 await pool.query('INSERT INTO admins (email, password) VALUES ($1, $2)', [email, password]);
             }
        } catch (e) {
            console.error("Auto-seed error", e);
        }
    }

    try {
        // Find user
        const { rows } = await pool.query('SELECT * FROM admins WHERE email = $1 AND password = $2', [email, password]);
        
        if (rows.length > 0) {
            const user = rows[0];
            
            // Generate JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '12h' }
            );

            // Return token and user WITHOUT password
            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) { handleError(res, err); }
});

router.get('/admins', authenticateToken, async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT id, email FROM admins');
        res.json(rows);
    } catch (err) { handleError(res, err); }
});

router.post('/admins', authenticateToken, async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query('INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING id, email', [email, password]);
        res.status(201).json(rows[0]);
    } catch (err) { handleError(res, err); }
});

router.put('/admins/:id/password', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        await pool.query('UPDATE admins SET password = $1 WHERE id = $2', [password, id]);
        res.json({ message: 'Password updated' });
    } catch (err) { handleError(res, err); }
});

// 3. SLIDES ROUTES (Public Read, Protected Write)
router.get('/slides', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM slides ORDER BY id ASC');
        const slides = rows.map(s => ({
            id: s.id,
            imageUrl: s.image_url,
            title: s.title,
            subtitle: s.subtitle,
            buttonText: s.button_text
        }));
        res.json(slides);
    } catch (err) { handleError(res, err); }
});

router.post('/slides', authenticateToken, async (req, res) => {
    const { imageUrl, title, subtitle, buttonText } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO slides (image_url, title, subtitle, button_text) VALUES ($1, $2, $3, $4) RETURNING *',
            [imageUrl, title, subtitle, buttonText]
        );
        const s = rows[0];
        res.status(201).json({
            id: s.id,
            imageUrl: s.image_url,
            title: s.title,
            subtitle: s.subtitle,
            buttonText: s.button_text
        });
    } catch (err) { handleError(res, err); }
});

router.put('/slides/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { imageUrl, title, subtitle, buttonText } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE slides SET image_url=$1, title=$2, subtitle=$3, button_text=$4 WHERE id=$5 RETURNING *',
            [imageUrl, title, subtitle, buttonText, id]
        );
        const s = rows[0];
        res.json({
            id: s.id,
            imageUrl: s.image_url,
            title: s.title,
            subtitle: s.subtitle,
            buttonText: s.button_text
        });
    } catch (err) { handleError(res, err); }
});

router.delete('/slides/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM slides WHERE id = $1', [id]);
        res.json({ message: 'Slide deleted' });
    } catch (err) { handleError(res, err); }
});

// 4. PAGE BANNERS ROUTES (Public Read, Protected Write)
router.get('/page-banners', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM page_banners');
        const banners = rows.map(b => ({
            pageId: b.page_id,
            imageUrl: b.image_url,
            title: b.title,
            subtitle: b.subtitle
        }));
        res.json(banners);
    } catch (err) { handleError(res, err); }
});

router.put('/page-banners', authenticateToken, async (req, res) => {
    const { pageId, imageUrl, title, subtitle } = req.body;
    try {
        const { rows } = await pool.query(`
            INSERT INTO page_banners (page_id, image_url, title, subtitle)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (page_id) 
            DO UPDATE SET image_url = EXCLUDED.image_url, title = EXCLUDED.title, subtitle = EXCLUDED.subtitle
            RETURNING *
        `, [pageId, imageUrl, title, subtitle]);
        
        const b = rows[0];
        res.json({
            pageId: b.page_id,
            imageUrl: b.image_url,
            title: b.title,
            subtitle: b.subtitle
        });
    } catch (err) { handleError(res, err); }
});

app.use('/api', router);

export const handler = serverless(app);
