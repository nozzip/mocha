import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, IconButton, Chip, Skeleton } from '@mui/material';
import { ArrowBack, ShoppingCart, Inventory, Star, Favorite } from '@mui/icons-material';
import { Product } from '../shared/types';
import { useCart } from '../hooks/useCart';
import ProductCard from './ProductCard';
import ImageGallery from './ImageGallery';

interface ProductDetailProps {
    productId: number;
    onBack: () => void;
    onProductClick?: (product: Product) => void;
}

export default function ProductDetail({ productId, onBack, onProductClick }: ProductDetailProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart, isLoading } = useCart();

    useEffect(() => {
        fetchProductDetail();
        fetchRecommendations();
    }, [productId]);

    const fetchProductDetail = async () => {
        try {
            const response = await fetch(`/api/products/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            }
        } catch (error) {
            console.error('Error fetching product detail:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommendations = async () => {
        try {
            const response = await fetch(`/api/products/${productId}/recommendations`);
            if (response.ok) {
                const data = await response.json();
                setRecommendations(data);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    const handleAddToCart = async () => {
        if (product) {
            await addToCart(product.id, quantity);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(to bottom right, #1E293B, #3C2F2F, #1E293B)',
                    py: 4,
                }}
            >
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
                    <Skeleton variant="rectangular" width={128} height={32} sx={{ mb: 4, bgcolor: '#3C2F2F' }} />
                    <Grid container spacing={6}>
                        <Grid item xs={12} lg={6}>
                            <Skeleton variant="rectangular" sx={{ aspectRatio: '1/1', borderRadius: 2, bgcolor: '#3C2F2F' }} />
                        </Grid>
                        <Grid item xs={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Skeleton variant="rectangular" width="75%" height={32} sx={{ bgcolor: '#3C2F2F' }} />
                            <Skeleton variant="rectangular" width="25%" height={16} sx={{ bgcolor: '#3C2F2F' }} />
                            <Skeleton variant="rectangular" width="33%" height={24} sx={{ bgcolor: '#3C2F2F' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Skeleton variant="rectangular" height={16} sx={{ bgcolor: '#3C2F2F' }} />
                                <Skeleton variant="rectangular" width="83%" height={16} sx={{ bgcolor: '#3C2F2F' }} />
                                <Skeleton variant="rectangular" width="67%" height={16} sx={{ bgcolor: '#3C2F2F' }} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(to bottom right, #1E293B, #3C2F2F, #1E293B)',
                    py: 4,
                }}
            >
                <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
                    <Button
                        onClick={onBack}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#FFD700',
                            fontFamily: '"Lora", serif',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            mb: 4,
                            '&:hover': { color: '#DAA520' },
                        }}
                        startIcon={<ArrowBack sx={{ fontSize: 20 }} />}
                        aria-label="Back to catalog"
                    >
                        Back to catalog
                    </Button>
                    <Box sx={{ textAlign: 'center', py: 12 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#FFF8E1',
                                fontFamily: '"Cinzel", serif',
                                mb: 2,
                            }}
                        >
                            Product not found
                        </Typography>
                        <Typography
                            sx={{
                                color: '#F5F5F5',
                                fontFamily: '"Lora", serif',
                            }}
                        >
                            The product you're looking for doesn't exist.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #1E293B, #3C2F2F, #1E293B)',
                py: 4,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
                <Button
                    onClick={onBack}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#FFD700',
                        fontFamily: '"Lora", serif',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        mb: 4,
                        '&:hover': { color: '#DAA520' },
                    }}
                    startIcon={<ArrowBack sx={{ fontSize: 20 }} />}
                    aria-label="Back to catalog"
                >
                    Back to catalog
                </Button>

                <Grid container spacing={6} sx={{ mb: 8 }}>
                    <Grid item xs={12} lg={6} sx={{ position: 'relative' }}>
                        <ImageGallery images={product.images || []} productName={product.name} />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                p: 1.5,
                                bgcolor: 'rgba(33, 33, 33, 0.7)',
                                color: '#FFD700',
                                borderRadius: '50%',
                                border: '1px solid #B8860B',
                                transition: 'all 0.2s',
                                '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)', transform: 'scale(1.1)' },
                                zIndex: 10,
                            }}
                            aria-label={`Add ${product.name} to favorites`}
                        >
                            <Favorite sx={{ fontSize: 24 }} />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {product.category_name && (
                            <Typography
                                sx={{
                                    color: '#FFD700',
                                    fontWeight: 'bold',
                                    fontFamily: '"Lora", serif',
                                }}
                            >
                                {product.category_name}
                            </Typography>
                        )}
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.875rem', md: '2.25rem' },
                                fontWeight: 'bold',
                                color: '#FFF8E1',
                                fontFamily: '"Cinzel", serif',
                            }}
                        >
                            {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} sx={{ fontSize: 20, color: '#F59E0B' }} />
                                ))}
                            </Box>
                            <Typography
                                sx={{
                                    color: '#F5F5F5',
                                    ml: 1,
                                    fontFamily: '"Lora", serif',
                                }}
                            >
                                (4.8) • 127 reviews
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '1.875rem',
                                fontWeight: 'bold',
                                color: '#FFD700',
                                fontFamily: '"Cinzel", serif',
                                mb: 2,
                            }}
                        >
                            ${product.price.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {product.scale && (
                                <Chip
                                    label={`Scale: ${product.scale}`}
                                    sx={{
                                        bgcolor: '#3C2F2F',
                                        color: '#F5F5F5',
                                        fontFamily: '"Lora", serif',
                                        border: '1px solid #B8860B',
                                        borderRadius: '9999px',
                                    }}
                                />
                            )}
                            {product.material && (
                                <Chip
                                    label={`Material: ${product.material}`}
                                    sx={{
                                        bgcolor: '#3C2F2F',
                                        color: '#F5F5F5',
                                        fontFamily: '"Lora", serif',
                                        border: '1px solid #B8860B',
                                        borderRadius: '9999px',
                                    }}
                                />
                            )}
                            {product.manufacturer && (
                                <Chip
                                    label={product.manufacturer}
                                    sx={{
                                        bgcolor: '#3C2F2F',
                                        color: '#F5F5F5',
                                        fontFamily: '"Lora", serif',
                                        border: '1px solid #B8860B',
                                        borderRadius: '9999px',
                                    }}
                                />
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Inventory sx={{ fontSize: 20, color: '#355E3B', mr: 1 }} />
                            <Typography
                                sx={{
                                    color: '#355E3B',
                                    fontWeight: 'bold',
                                    fontFamily: '"Lora", serif',
                                }}
                            >
                                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#FFF8E1',
                                    fontFamily: '"Cinzel", serif',
                                    mb: 1,
                                }}
                            >
                                Description
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    lineHeight: 1.6,
                                }}
                            >
                                {product.description || 'A premium quality miniature perfect for your collection or gaming sessions. Crafted with attention to detail and made from high-quality materials.'}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography sx={{ color: '#FFF8E1', fontWeight: 'bold', fontFamily: '"Lora", serif' }}>
                                    Quantity:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        sx={{
                                            px: 1.5,
                                            py: 1,
                                            bgcolor: '#3C2F2F',
                                            color: '#FFF8E1',
                                            borderRadius: '4px 0 0 4px',
                                            border: '1px solid #B8860B',
                                            minWidth: 0,
                                            '&:hover': { bgcolor: '#4A3728' },
                                        }}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </Button>
                                    <Typography
                                        sx={{
                                            px: 2,
                                            py: 1,
                                            bgcolor: '#3C2F2F',
                                            color: '#FFF8E1',
                                            fontWeight: 'bold',
                                            fontFamily: '"Lora", serif',
                                            minWidth: 60,
                                            textAlign: 'center',
                                            borderTop: '1px solid #B8860B',
                                            borderBottom: '1px solid #B8860B',
                                        }}
                                    >
                                        {quantity}
                                    </Typography>
                                    <Button
                                        onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                        disabled={quantity >= product.stock_quantity}
                                        sx={{
                                            px: 1.5,
                                            py: 1,
                                            bgcolor: '#3C2F2F',
                                            color: '#FFF8E1',
                                            borderRadius: '0 4px 4px 0',
                                            border: '1px solid #B8860B',
                                            minWidth: 0,
                                            '&:hover': { bgcolor: '#4A3728' },
                                            '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
                                        }}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </Button>
                                </Box>
                            </Box>
                            <Button
                                onClick={handleAddToCart}
                                disabled={!product.is_in_stock || product.stock_quantity === 0 || isLoading}
                                sx={{
                                    width: '100%',
                                    py: 2,
                                    bgcolor: '#FFD700',
                                    color: '#211F1F',
                                    fontWeight: 'bold',
                                    fontFamily: '"Lora", serif',
                                    borderRadius: 1,
                                    '&:hover': { bgcolor: '#DAA520' },
                                    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
                                }}
                                startIcon={<ShoppingCart sx={{ fontSize: 20 }} />}
                                aria-label={`Add ${product.name} to cart`}
                            >
                                {isLoading ? 'Adding...' : 'Add to Cart'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {recommendations.length > 0 && (
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: { xs: '1.5rem', md: '1.875rem' },
                                fontWeight: 'bold',
                                color: '#FFF8E1',
                                fontFamily: '"Cinzel", serif',
                                mb: 4,
                            }}
                        >
                            You might also{' '}
                            <Box component="span" sx={{ color: '#FFD700' }}>
                                like
                            </Box>
                        </Typography>
                        <Grid container spacing={3}>
                            {recommendations.map((rec) => (
                                <Grid item xs={12} md={6} lg={4} xl={3} key={rec.id}>
                                    <ProductCard product={rec} onClick={onProductClick} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
}