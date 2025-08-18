import { Box, Button, Typography, Chip } from '@mui/material';
import { ShoppingCart, Inventory } from '@mui/icons-material';
import type { Product } from '../shared/types';
import { useCart } from '../hooks/cartContextType';

interface ProductCardProps {
    product: Product;
    onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    const { addToCart, isLoading } = useCart();

    const handleAddToCart = async () => {
        await addToCart(product.id);
    };

    return (
        <Box
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                border: '1px solid #B8860B',
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: '-4px 0 16px rgba(184, 134, 11, 0.5)',
                    borderColor: '#FFD700',
                },
            }}
            onClick={() => onClick?.(product)}
            aria-label={`Product card for ${product.name}`}
        >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <Box
                    component="img"
                    src={product.image_url || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'}
                    alt={product.name}
                    sx={{
                        width: '100%',
                        height: 192,
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(33, 33, 33, 0.8), transparent)',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        '&:hover': {
                            opacity: 1,
                        },
                    }}
                />
                <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                    {product.stock_quantity > 0 ? (
                        <Chip
                            icon={<Inventory sx={{ fontSize: 12, mr: 0.5 }} />}
                            label={`${product.stock_quantity} left`}
                            sx={{
                                bgcolor: '#355E3B',
                                color: '#FFF8E1',
                                fontSize: '0.75rem',
                                fontFamily: '"Lora", serif',
                                border: '1px solid #B8860B',
                                borderRadius: '9999px',
                            }}
                        />
                    ) : (
                        <Chip
                            label="Out of Stock"
                            sx={{
                                bgcolor: '#B87333',
                                color: '#FFF8E1',
                                fontSize: '0.75rem',
                                fontFamily: '"Lora", serif',
                                border: '1px solid #B87333',
                                borderRadius: '9999px',
                            }}
                        />
                    )}
                </Box>
            </Box>

            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 1 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 'bold',
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: '#FFD700',
                            },
                        }}
                    >
                        {product.name}
                    </Typography>
                    {product.category_name && (
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#FFD700',
                                fontWeight: 'medium',
                                fontFamily: '"Lora", serif',
                            }}
                        >
                            {product.category_name}
                        </Typography>
                    )}
                </Box>

                <Typography
                    sx={{
                        color: '#F5F5F5',
                        fontSize: '0.875rem',
                        mb: 2,
                        fontFamily: '"Lora", serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {product.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {product.scale && (
                        <Chip
                            label={product.scale}
                            sx={{
                                bgcolor: '#3C2F2F',
                                color: '#F5F5F5',
                                fontSize: '0.75rem',
                                fontFamily: '"Lora", serif',
                                border: '1px solid #B8860B',
                                borderRadius: 1,
                            }}
                        />
                    )}
                    {product.material && (
                        <Chip
                            label={product.material}
                            sx={{
                                bgcolor: '#3C2F2F',
                                color: '#F5F5F5',
                                fontSize: '0.75rem',
                                fontFamily: '"Lora", serif',
                                border: '1px solid #B8860B',
                                borderRadius: 1,
                            }}
                        />
                    )}
                    {product.manufacturer && (
                        <Chip
                            label={product.manufacturer}
                            sx={{
                                bgcolor: '#3C2F2F',
                                color: '#F5F5F5',
                                fontSize: '0.75rem',
                                fontFamily: '"Lora", serif',
                                border: '1px solid #B8860B',
                                borderRadius: 1,
                            }}
                        />
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: '#FFD700',
                            fontFamily: '"Cinzel", serif',
                        }}
                    >
                        ${product.price.toFixed(2)}
                    </Typography>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}
                        disabled={!product.is_in_stock || product.stock_quantity === 0 || isLoading}
                        sx={{
                            px: 2,
                            py: 1,
                            bgcolor: '#FFD700',
                            color: '#211F1F',
                            fontWeight: 'bold',
                            fontFamily: '"Lora", serif',
                            borderRadius: 1,
                            '&:hover': { bgcolor: '#DAA520' },
                            '&:disabled': {
                                opacity: 0.5,
                                cursor: 'not-allowed',
                            },
                        }}
                        startIcon={<ShoppingCart sx={{ fontSize: 16 }} />}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}


