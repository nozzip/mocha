import { useState } from 'react';
import { Box, Container } from '@mui/material';
import type { Product } from '../shared/types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CheckoutModal from '../components/CheckoutModal';
import Carousel from '../components/Carousel';
import GameSegments from '../components/GameSegments';
import LatestAdded from '../components/LatestAdded';
import ProductDetail from '../components/ProductDetail';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

    const carouselImages = [
        {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200',
            title: 'Epic Fantasy Collection',
            subtitle: 'Discover legendary miniatures from your favorite worlds',
        },
        {
            url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200',
            title: 'Warhammer 40K Universe',
            subtitle: 'Command your armies in the grim darkness of the far future',
        },
        {
            url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200',
            title: 'D&D Adventures',
            subtitle: 'Bring your tabletop campaigns to life',
        },
        {
            url: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=1200',
            title: 'Premium Collectibles',
            subtitle: 'Movie and anime statues for serious collectors',
        },
    ];

    const handleCheckout = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product.id);
    };

    const handleBackToHome = () => {
        setSelectedProduct(null);
    };

    if (selectedProduct) {
        return (
            <>
                <ProductDetail
                    productId={selectedProduct}
                    onBack={handleBackToHome}
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
                background: 'linear-gradient(to bottom right, #211F1F, #3C2F2F, #211F1F)',
            }}
            aria-label="Home page"
        >
            <Navbar
                onCartToggle={() => setIsCartOpen(!isCartOpen)}
                onSearchChange={setSearchQuery}
                searchQuery={searchQuery}
            />

            <Container sx={{ maxWidth: 'xl', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
                <Carousel images={carouselImages} />
            </Container>

            <Container sx={{ maxWidth: 'xl', px: { xs: 2, sm: 3, lg: 4 } }}>
                <GameSegments />
            </Container>

            <Container sx={{ maxWidth: 'xl', px: { xs: 2, sm: 3, lg: 4 } }}>
                <LatestAdded onProductClick={handleProductClick} />
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