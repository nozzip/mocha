import { Fragment } from 'react';
import { Box, Backdrop, IconButton, Button, Typography } from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../hooks/cartContextType';
import type { CartItem } from '../shared/types';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
    const { cart, updateCartItem, removeFromCart, isLoading } = useCart();

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            await removeFromCart(itemId);
        } else {
            await updateCartItem(itemId, newQuantity);
        }
    };

    return (
        <Fragment>
            <Backdrop
                open={isOpen}
                onClick={onClose}
                sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 40,
                }}
            />

            <Box
                sx={{
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    height: '100%',
                    width: { xs: '100%', sm: 400 },
                    bgcolor: 'linear-gradient(to bottom, #211F1F, #3C2F2F)',
                    boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                    zIndex: 50,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 300ms ease-in-out',
                    borderLeft: '1px solid #B8860B',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        borderBottom: '1px solid rgba(184, 134, 11, 0.3)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 'bold',
                        }}
                    >
                        ⚜ Shopping Cart ⚜
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="Close cart"
                        sx={{
                            color: '#FFD700',
                            '&:hover': {
                                color: '#FFF8E1',
                                bgcolor: '#3C2F2F',
                            },
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>

                <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                    {cart.items.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 12 }}>
                            <Typography
                                sx={{
                                    color: '#F5F5F5',
                                    mb: 2,
                                    fontFamily: '"Lora", serif',
                                }}
                            >
                                Your cart is empty
                            </Typography>
                            <Button
                                onClick={onClose}
                                sx={{
                                    color: '#FFD700',
                                    fontFamily: '"Lora", serif',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: '#DAA520',
                                    },
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {cart.items.map((item: CartItem) => (
                                <Box
                                    key={item.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        bgcolor: 'rgba(33, 33, 33, 0.5)',
                                        borderRadius: 2,
                                        p: 2,
                                        border: '1px solid rgba(184, 134, 11, 0.3)',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={item.image_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100'}
                                        alt={item.name}
                                        sx={{
                                            width: 64,
                                            height: 64,
                                            objectFit: 'cover',
                                            borderRadius: 1,
                                        }}
                                    />
                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Typography
                                            sx={{
                                                color: '#FFF8E1',
                                                fontWeight: 'bold',
                                                fontFamily: '"Cinzel", serif',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#F5F5F5',
                                                fontSize: '0.875rem',
                                                fontFamily: '"Lora", serif',
                                            }}
                                        >
                                            ${item.price.toFixed(2)} each
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#FFD700',
                                                fontWeight: 'bold',
                                                fontFamily: '"Lora", serif',
                                            }}
                                        >
                                            ${item.total_price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            disabled={isLoading}
                                            aria-label="Decrease quantity"
                                            sx={{
                                                color: '#FFD700',
                                                '&:hover': {
                                                    color: '#FFF8E1',
                                                    bgcolor: '#3C2F2F',
                                                },
                                                '&:disabled': {
                                                    opacity: 0.5,
                                                },
                                            }}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography
                                            sx={{
                                                color: '#FFF8E1',
                                                fontWeight: 'bold',
                                                width: 32,
                                                textAlign: 'center',
                                                fontFamily: '"Lora", serif',
                                            }}
                                        >
                                            {item.quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            disabled={isLoading || item.quantity >= item.stock_quantity}
                                            aria-label="Increase quantity"
                                            sx={{
                                                color: '#FFD700',
                                                '&:hover': {
                                                    color: '#FFF8E1',
                                                    bgcolor: '#3C2F2F',
                                                },
                                                '&:disabled': {
                                                    opacity: 0.5,
                                                },
                                            }}
                                        >
                                            <Add />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => removeFromCart(item.id)}
                                            disabled={isLoading}
                                            aria-label="Remove item"
                                            sx={{
                                                color: '#B87333',
                                                '&:hover': {
                                                    color: '#CB9B51',
                                                    bgcolor: 'rgba(184, 115, 51, 0.2)',
                                                },
                                                '&:disabled': {
                                                    opacity: 0.5,
                                                },
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                {cart.items.length > 0 && (
                    <Box
                        sx={{
                            borderTop: '1px solid rgba(184, 134, 11, 0.3)',
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '1.125rem',
                                fontWeight: 'bold',
                            }}
                        >
                            <Typography sx={{ color: '#F5F5F5', fontFamily: '"Lora", serif' }}>
                                Total:
                            </Typography>
                            <Typography sx={{ color: '#FFD700', fontFamily: '"Cinzel", serif' }}>
                                ${cart.total.toFixed(2)}
                            </Typography>
                        </Box>
                        <Button
                            onClick={onCheckout}
                            variant="contained"
                            sx={{
                                bgcolor: '#FFD700',
                                color: '#211F1F',
                                fontFamily: '"Lora", serif',
                                fontWeight: 'bold',
                                py: 1.5,
                                borderRadius: 1,
                                '&:hover': {
                                    bgcolor: '#DAA520',
                                },
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                )}
            </Box>
        </Fragment>
    );
}