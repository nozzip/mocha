import { z } from 'zod';

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    slug: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const ProductImageSchema = z.object({
    id: z.number(),
    product_id: z.number(),
    image_url: z.string(),
    display_order: z.number(),
    is_primary: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    price: z.number(),
    image_url: z.string().nullable(),
    category_id: z.number().nullable(),
    category_name: z.string().nullable(),
    scale: z.string().nullable(),
    material: z.string().nullable(),
    manufacturer: z.string().nullable(),
    is_in_stock: z.boolean(),
    stock_quantity: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    designer: z.string(),
    setName: z.string(),
    subCategory: z.string(),
    mimeType: z.string(),
    images: z.array(ProductImageSchema).optional(),
});

export const CartItemSchema = z.object({
    id: z.number(),
    session_id: z.string(),
    product_id: z.number(),
    quantity: z.number(),
    name: z.string(),
    price: z.number(),
    image_url: z.string().nullable(),
    stock_quantity: z.number(),
    total_price: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const CartSchema = z.object({
    items: z.array(CartItemSchema),
    total: z.number(),
    count: z.number(),
});

export type Category = z.infer<typeof CategorySchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
