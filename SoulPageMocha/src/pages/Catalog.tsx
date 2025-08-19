import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import type { Product } from '../shared/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
import ProductDetail from '../components/ProductDetail';

type CatalogProps = {
    initialProducts?: Product[];
};

export default function Catalog({ initialProducts }: CatalogProps) {
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
        if (initialProducts && initialProducts.length > 0) {
            setProducts(initialProducts);
            setLoading(false);
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/catalog.json');
                if (response.ok) {
                    const rawData = await response.json();
                    const mapped = rawData.map((item: Product, index: number) => ({
                        id: index,
                        name: item.name || 'Untitled',
                        image_url: item.images?.[0]?.image_url || '',
                        description: '',
                        category_name: item.setName || '',
                        scale: item.scale || '',
                        material: item.material || '',
                        manufacturer: item.designer || '',
                        price: 0,
                        stock_quantity: 10,
                        is_in_stock: true,
                        designer: item.designer || '',
                        setName: item.setName || '',
                        subCategory: item.subCategory || '',
                        mimeType: item.mimeType || '',
                    }));
                    setProducts(mapped);
                }
            } catch (error) {
                console.error('Error loading catalog.json:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [initialProducts]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product.id);
    };

    const handleBackToCatalog = () => setSelectedProduct(null);

    const filterProducts = () => {
        return products.filter((product) => {
            const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory ? product.category_name === selectedCategory : true;
            const matchesMaterial = selectedMaterial ? product.material === selectedMaterial : true;
            const matchesScale = selectedScale ? product.scale === selectedScale : true;
            return matchesSearch && matchesCategory && matchesMaterial && matchesScale;
        });
    };

    if (selectedProduct !== null) {
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

    const filtered = filterProducts();

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
            <Container maxWidth="lg" sx={{ paddingX: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
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
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
                                <CircularProgress sx={{ color: '#7C3AED' }} size={32} />
                            </Box>
                        ) : filtered.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 12 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFF8E1', fontFamily: '"Cinzel", serif', mb: 1 }}>
                                    No products found
                                </Typography>
                                <Typography sx={{ color: '#F5F5F5', fontFamily: '"Lora", serif' }}>
                                    Try adjusting your search or filters
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFF8E1', fontFamily: '"Cinzel", serif' }}>
                                        {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
                                    </Typography>
                                    <Typography sx={{ color: '#F5F5F5', fontFamily: '"Lora", serif' }}>
                                        {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                                    </Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    {filtered.map((product) => (
                                        <Grid item xs={12} md={6} xl={4} key={product.id}>
                                            <ProductCard product={product} onClick={handleProductClick} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
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
