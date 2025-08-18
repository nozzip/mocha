import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

interface Env {
    DB: any; // Replace 'any' with the actual type of your DB object
}

const app = new Hono<{ Bindings: Env }>();

// API Routes
app.get("/api/categories", async (c) => {
    const db = c.env.DB;
    const categories = await db.prepare("SELECT * FROM categories ORDER BY name").all();
    return c.json(categories.results);
});

app.get("/api/products", async (c) => {
    const db = c.env.DB;
    const category = c.req.query("category");
    const search = c.req.query("search");
    const material = c.req.query("material");
    const scale = c.req.query("scale");

    let query = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.is_in_stock = true
  `;
    const params: any[] = [];

    if (category) {
        query += " AND c.slug = ?";
        params.push(category);
    }

    if (search) {
        query += " AND (p.name LIKE ? OR p.description LIKE ?)";
        params.push(`%${search}%`, `%${search}%`);
    }

    if (material) {
        query += " AND p.material = ?";
        params.push(material);
    }

    if (scale) {
        query += " AND p.scale = ?";
        params.push(scale);
    }

    query += " ORDER BY p.created_at DESC";

    const products = await db.prepare(query).bind(...params).all();
    return c.json(products.results);
});

app.get("/api/products/latest", async (c) => {
    const db = c.env.DB;

    const products = await db.prepare(`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.is_in_stock = true
    ORDER BY p.created_at DESC
    LIMIT 8
  `).all();

    return c.json(products.results);
});

app.get("/api/products/:id", async (c) => {
    const db = c.env.DB;
    const id = c.req.param("id");

    const product = await db.prepare(`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.id = ?
  `).bind(id).first();

    if (!product) {
        return c.json({ error: "Product not found" }, 404);
    }

    // Get product images
    const images = await db.prepare(`
    SELECT * FROM product_images 
    WHERE product_id = ? 
    ORDER BY display_order ASC
  `).bind(id).all();

    return c.json({
        ...product,
        images: images.results || []
    });
});

app.get("/api/products/:id/recommendations", async (c) => {
    const db = c.env.DB;
    const id = c.req.param("id");

    // Get the current product to find similar ones
    const currentProduct = await db.prepare(`
    SELECT category_id, scale, material FROM products WHERE id = ?
  `).bind(id).first();

    if (!currentProduct) {
        return c.json([]);
    }

    // Find similar products based on category, scale, or material
    const recommendations = await db.prepare(`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.id != ? 
    AND p.is_in_stock = true
    AND (
      p.category_id = ? 
      OR p.scale = ? 
      OR p.material = ?
    )
    ORDER BY 
      CASE 
        WHEN p.category_id = ? THEN 1
        WHEN p.scale = ? THEN 2
        WHEN p.material = ? THEN 3
        ELSE 4
      END,
      RANDOM()
    LIMIT 8
  `).bind(
        id,
        currentProduct.category_id,
        currentProduct.scale,
        currentProduct.material,
        currentProduct.category_id,
        currentProduct.scale,
        currentProduct.material
    ).all();

    return c.json(recommendations.results);
});

const addToCartSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1).default(1),
});

app.post("/api/cart", zValidator("json", addToCartSchema), async (c) => {
    const db = c.env.DB;
    const { productId, quantity } = c.req.valid("json");
    const sessionId = c.req.header("x-session-id") || "anonymous";

    // Check if item already exists in cart
    const existing = await db.prepare(
        "SELECT * FROM cart_items WHERE session_id = ? AND product_id = ?"
    ).bind(sessionId, productId).first();

    if (existing) {
        // Update quantity
        await db.prepare(
            "UPDATE cart_items SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(quantity, existing.id).run();
    } else {
        // Add new item
        await db.prepare(
            "INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, ?)"
        ).bind(sessionId, productId, quantity).run();
    }

    return c.json({ success: true });
});

app.get("/api/cart", async (c) => {
    const db = c.env.DB;
    const sessionId = c.req.header("x-session-id") || "anonymous";

    const cartItems = await db.prepare(`
    SELECT ci.*, p.name, p.price, p.image_url, p.stock_quantity,
           (ci.quantity * p.price) as total_price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.session_id = ?
    ORDER BY ci.created_at DESC
  `).bind(sessionId).all();

    const total = cartItems.results.reduce((sum: number, item: any) => sum + item.total_price, 0);

    return c.json({
        items: cartItems.results,
        total: total,
        count: cartItems.results.length
    });
});

const updateCartSchema = z.object({
    quantity: z.number().min(0),
});

app.put("/api/cart/:id", zValidator("json", updateCartSchema), async (c) => {
    const db = c.env.DB;
    const id = c.req.param("id");
    const { quantity } = c.req.valid("json");
    const sessionId = c.req.header("x-session-id") || "anonymous";

    if (quantity === 0) {
        await db.prepare(
            "DELETE FROM cart_items WHERE id = ? AND session_id = ?"
        ).bind(id, sessionId).run();
    } else {
        await db.prepare(
            "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND session_id = ?"
        ).bind(quantity, id, sessionId).run();
    }

    return c.json({ success: true });
});

app.delete("/api/cart/:id", async (c) => {
    const db = c.env.DB;
    const id = c.req.param("id");
    const sessionId = c.req.header("x-session-id") || "anonymous";

    await db.prepare(
        "DELETE FROM cart_items WHERE id = ? AND session_id = ?"
    ).bind(id, sessionId).run();

    return c.json({ success: true });
});

export default app;
