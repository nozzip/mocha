import { useContext } from 'react';
import { CartContext } from './cartUtils';
import type { CartContextType } from './cartUtils';

export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}