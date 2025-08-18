import { useState, useEffect } from 'react';
import { Box, Grid, Typography, Link, Skeleton } from '@mui/material';
import { AccessTime, ArrowForward } from '@mui/icons-material';
import { Product } from '@/shared/types';
import ProductCard from './ProductCard';

interface LatestAddedProps {
    onProductClick?: (product: Product) => void;
}

export default function LatestAdded({ onProductClick }: LatestAddedProps = {}) {
    const [latestProducts, setLatestProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestProducts();
    }, []);

    const fetchLatestProducts = async () => {
        try {
            const response = await fetch('/api/products/latest');
            if (response.ok) {
                const data = await response.json();
                setLatestProducts(data);
            }
        } catch (error) {
            console.error('Error fetching latest products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Skeleton variant="rectangular" width={256} height={32} sx={{ mx: 'auto', mb: 2, bgcolor: '#3C2F2F' }} />
                    <Skeleton variant="rectangular" width={384} height={16} sx={{ mx: 'auto', bgcolor: '#3C2F2F' }} />
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 24, color: '#FFD700', mr: 1 }} />
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '1.875rem', md: '2.25rem' },
                                fontWeight: 'bold',
                                color: '#FFF8E1',
                                fontFamily: '"Cinzel", serif',
                            }}
                        >
                            Latest{' '}
                            <Box component="span" sx={{ color: '#FFD700' }}>
                                Arrivals
                            </Box>
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                        }}
                    >
                        Fresh additions to our premium collection
                    </Typography>
                </Box>
                <Link
                    href="/catalog"
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        px: 3,
                        py: 1.5,
                        color: '#FFF8E1',
                        fontWeight: 'bold',
                        fontFamily: '"Lora", serif',
                        bgcolor: '#FFD700',
                        borderRadius: 1,
                        textDecoration: 'none',
                        '&:hover': {
                            bgcolor: '#DAA520',
                        },
                    }}
                    aria-label="View all products"
                >
                    View All
                    <ArrowForward sx={{ fontSize: 20, ml: 1 }} />
                </Link>
            </Box>

            {latestProducts.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 12 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            mb: 1,
                        }}
                    >
                        No recent additions
                    </Typography>
                    <Typography
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                        }}
                    >
                        Check back soon for new arrivals!
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {latestProducts.slice(0, 8).map((product) => (
                            <Grid item xs={12} md={6} lg={4} xl={3} key={product.id}>
                                <ProductCard product={product} onClick={onProductClick} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ textAlign: 'center', mt: 4, display: { xs: 'block', md: 'none' } }}>
                        <Link
                            href="/catalog"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 3,
                                py: 1.5,
                                color: '#FFF8E1',
                                fontWeight: 'bold',
                                fontFamily: '"Lora", serif',
                                bgcolor: '#FFD700',
                                borderRadius: 1,
                                textDecoration: 'none',
                                '&:hover': {
                                    bgcolor: '#DAA520',
                                },
                            }}
                            aria-label="View all products"
                        >
                            View All
                            <ArrowForward sx={{ fontSize: 20, ml: 1 }} />
                        </Link>
                    </Box>
                </>
            )}
        </Box>
    );
}