import { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { Product } from '../shared/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
import ProductDetail from '../components/ProductDetail';

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedScale, setSelectedScale] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (searchQuery) params.append('search', searchQuery);
                if (selectedCategory) params.append('category', selectedCategory);
                if (selectedMaterial) params.append('material', selectedMaterial);
                if (selectedScale) params.append('scale', selectedScale);

                const response = await fetch(`/api/products?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchQuery, selectedCategory, selectedMaterial, selectedScale]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product.id);
    };

    const handleBackToCatalog = () => setSelectedProduct(null);

    if (selectedProduct) {
        return (
            <>
                <ProductDetail
                    productId={selectedProduct}
                    onBack={handleBackToCatalog}
                    onProductClick={handleProductClick}
                />
                <CartSidebar
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    onCheckout={handleCheckout}
                />
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                />
            </>
        );
    }
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #1E293B, #3C2F2F, #1E293B)',
            }}
            aria-label="Product catalog"
        >
            <Navbar
                onCartToggle={() => setIsCartOpen(!isCartOpen)}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
            />
            <Container
                maxWidth={'lg'}
                sx={{
                    paddingX: { xs: 2, sm: 3, lg: 4 },
                    py: 4,
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={3}>
                        <Box sx={{ width: '100%', maxWidth: 'sm', flexShrink: 0 }}>
                            <Filters
                                selectedCategory={selectedCategory}
                                selectedMaterial={selectedMaterial}
                                selectedScale={selectedScale}
                                onCategoryChange={setSelectedCategory}
                                onMaterialChange={setSelectedMaterial}
                                onScaleChange={setSelectedScale}
                            />
                        </Box>
                        <Grid item xs={12} lg={9}>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
                                    <CircularProgress sx={{ color: '#7C3AED' }} size={32} />
                                </Box>
                            ) : products.length === 0 ? (
                                <Box sx={{ textAlign: 'center', py: 12 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#FFF8E1',
                                            fontFamily: '"Cinzel", serif',
                                            mb: 1,
                                        }}
                                    >
                                        No products found
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#F5F5F5',
                                            fontFamily: '"Lora", serif',
                                        }}
                                    >
                                        Try adjusting your search or filters
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 'bold',
                                                color: '#FFF8E1',
                                                fontFamily: '"Cinzel", serif',
                                            }}
                                        >
                                            {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: '#F5F5F5',
                                                fontFamily: '"Lora", serif',
                                            }}
                                        >
                                            {products.length} product{products.length !== 1 ? 's' : ''} found
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={3}>
                                        {products.map((product) => (
                                            <Grid item xs={12} md={6} xl={4} key={product.id}>
                                                <ProductCard product={product} onClick={handleProductClick} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Footer />

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onCheckout={handleCheckout}
            />

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />
        </Box>
    );
}

