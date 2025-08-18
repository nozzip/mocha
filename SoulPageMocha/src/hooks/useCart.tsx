import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CartContext, ApiError, getApiHeaders } from '../hooks/cartUtils';
import type { Cart } from '../shared/types';
// If ApiErrorStatus is not defined elsewhere, use number for status codes
type ApiErrorStatus = number;

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({ items: [], total: 0, count: 0 });
    const [isLoading, setIsLoading] = useState(false);

    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart', {
                headers: getApiHeaders(),
            });
            if (!response.ok) {
                throw new ApiError(`Failed to fetch cart: ${response.statusText}`, response.status as ApiErrorStatus);
            }
            const cartData: Cart = await response.json();
            setCart(cartData);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (productId: number, quantity = 1) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: getApiHeaders(),
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new ApiError('Could not add item to cart', response.status as ApiErrorStatus);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateCartItem = async (itemId: number, quantity: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/cart/${itemId}`, {
                method: 'PUT',
                headers: getApiHeaders(),
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) {
                throw new ApiError('Could not update cart item', response.status as ApiErrorStatus);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromCart = async (itemId: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: getApiHeaders(),
            });
            if (!response.ok) {
                throw new ApiError('Could not remove item from cart', response.status as ApiErrorStatus);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshCart = fetchCart;

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                addToCart,
                updateCartItem,
                removeFromCart,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Remove useCart from this file and place it in a new file (useCartHook.ts)