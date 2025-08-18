import { createContext, useContext, useState, useEffect } from 'react';
import { Cart } from '../shared/types';

interface CartContextType {
    cart: Cart;
    isLoading: boolean;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateCartItem: (itemId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    refreshCart: () => Promise<void>;
}

interface ApiError extends Error {
    status?: number;
    message: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Generates a unique session ID for the cart, stored in localStorage.
 * Uses crypto.randomUUID if available for better randomness.
 * @returns {string} The session ID.
 */
const generateSessionId = (): string => {
    let sessionId = localStorage.getItem('cart-session-id');
    if (!sessionId) {
        sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `session-${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;
        localStorage.setItem('cart-session-id', sessionId);
    }
    return sessionId;
};

/**
 * Common headers for API requests, including the session ID.
 * @returns {Record<string, string>} Headers object.
 */
const getApiHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    'x-session-id': generateSessionId(),
});

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart>({ items: [], total: 0, count: 0 });
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Fetches the current cart from the API.
     */
    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart', {
                headers: getApiHeaders(),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch cart: ${response.statusText}`);
            }
            const cartData: Cart = await response.json();
            setCart(cartData);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    /**
     * Adds a product to the cart.
     * @param productId - The ID of the product to add.
     * @param quantity - The quantity to add (defaults to 1).
     */
    const addToCart = async (productId: number, quantity = 1) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: getApiHeaders(),
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error(`Failed to add to cart: ${response.statusText}`);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw new ApiError({ message: 'Could not add item to cart' });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Updates the quantity of a cart item.
     * @param itemId - The ID of the cart item to update.
     * @param quantity - The new quantity.
     */
    const updateCartItem = async (itemId: number, quantity: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/cart/${itemId}`, {
                method: 'PUT',
                headers: getApiHeaders(),
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update cart item: ${response.statusText}`);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw new ApiError({ message: 'Could not update cart item' });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Removes an item from the cart.
     * @param itemId - The ID of the cart item to remove.
     */
    const removeFromCart = async (itemId: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: getApiHeaders(),
            });
            if (!response.ok) {
                throw new Error(`Failed to remove from cart: ${response.statusText}`);
            }
            await fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
            throw new ApiError({ message: 'Could not remove item from cart' });
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Refreshes the cart by fetching the latest data.
     */
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

export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}