
import { createContext } from 'react';
import type { Cart } from '../shared/types';

export interface CartContextType {
    cart: Cart;
    isLoading: boolean;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    updateCartItem: (itemId: number, quantity: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    refreshCart: () => Promise<void>;
}

export type ApiErrorStatus = 404;

export class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const generateSessionId = (): string => {
    let sessionId = localStorage.getItem('cart-session-id');
    if (!sessionId) {
        sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `session-${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;
        localStorage.setItem('cart-session-id', sessionId);
    }
    return sessionId;
};

export const getApiHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    'x-session-id': generateSessionId(),
});