import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Link, TextField } from '@mui/material';
import { ShoppingCart, Search, Menu, Close } from '@mui/icons-material';
import { useCart } from '../hooks/cartContextType';

interface NavbarProps {
    onCartToggle: () => void;
    onSearchChange: (query: string) => void;
    searchQuery: string;
}

export default function Navbar({ onCartToggle, onSearchChange, searchQuery }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useCart();

    const textFieldStyles = {
        '& .MuiInputBase-root': {
            bgcolor: 'rgba(33, 33, 33, 0.8)',
            color: '#FFF8E1',
            borderRadius: 1,
            fontFamily: '"Lora", serif',
            backdropFilter: 'blur(4px)',
        },
        '& .MuiInputBase-input': { py: 1, pl: 3 },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B8860B' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#DAA520' },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
        '& .MuiInputLabel-root': { color: '#FFD700' },
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'linear-gradient(to right, #211F1F, #3C2F2F, #211F1F)',
                boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                borderBottom: '1px solid rgba(184, 134, 11, 0.3)',
                zIndex: 1200,
            }}
            role="navigation"
        >
            <Toolbar sx={{ maxWidth: 'xl', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, width: '100%' }}>
                <Box sx={{ flexShrink: 0 }}>
                    <Link
                        href="/"
                        sx={{
                            color: '#FFD700',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            fontFamily: '"Cinzel", serif',
                            textDecoration: 'none',
                            transition: 'opacity 0.2s',
                            '&:hover': { opacity: 0.8 },
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                        aria-label="Navigate to MiniVault home"
                    >
                        ⚔ MiniVault ⚔
                    </Link>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4, ml: 4 }}>
                    <Link
                        href="/"
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            '&:hover': { color: '#FFD700' },
                        }}
                        aria-label="Navigate to home page"
                    >
                        Home
                    </Link>
                    <Link
                        href="/catalog"
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            '&:hover': { color: '#FFD700' },
                        }}
                        aria-label="Navigate to catalog page"
                    >
                        Catalog
                    </Link>
                </Box>

                <Box sx={{ flex: 1, maxWidth: 'md', mx: { md: 4 }, display: { xs: 'none', md: 'block' } }}>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder="Search miniatures..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <Search sx={{ fontSize: 20, color: '#FFD700', mr: 1 }} />
                            ),
                        }}
                        sx={textFieldStyles}
                        aria-label="Search miniatures"
                    />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <IconButton
                        onClick={onCartToggle}
                        sx={{
                            position: 'relative',
                            px: 2,
                            py: 1,
                            bgcolor: '#FFD700',
                            color: '#211F1F',
                            borderRadius: 1,
                            '&:hover': { bgcolor: '#DAA520' },
                        }}
                        aria-label={`Open cart with ${cart.count} items`}
                    >
                        <ShoppingCart sx={{ fontSize: 20, mr: 1 }} />
                        <Typography sx={{ fontFamily: '"Lora", serif', fontWeight: 'bold' }}>
                            Cart
                        </Typography>
                        {cart.count > 0 && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    bgcolor: '#B87333',
                                    color: '#FFF8E1',
                                    borderRadius: '50%',
                                    border: '1px solid #B8860B',
                                    px: 1,
                                    py: 0.5,
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    fontFamily: '"Lora", serif',
                                    transform: 'translate(50%, -50%)',
                                }}
                            >
                                {cart.count}
                            </Box>
                        )}
                    </IconButton>
                </Box>

                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <IconButton
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        sx={{
                            p: 1,
                            color: '#FFD700',
                            borderRadius: 1,
                            '&:hover': { bgcolor: '#3C2F2F', color: '#FFF8E1' },
                        }}
                        aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                    >
                        {isMobileMenuOpen ? <Close sx={{ fontSize: 24 }} /> : <Menu sx={{ fontSize: 24 }} />}
                    </IconButton>
                </Box>
            </Toolbar>

            {isMobileMenuOpen && (
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', px: 2, pb: 3, gap: 1 }}>
                    <Link
                        href="/"
                        sx={{
                            px: 2,
                            py: 1,
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            borderRadius: 1,
                            '&:hover': { color: '#FFD700', bgcolor: '#3C2F2F' },
                        }}
                        aria-label="Navigate to home page"
                    >
                        Home
                    </Link>
                    <Link
                        href="/catalog"
                        sx={{
                            px: 2,
                            py: 1,
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            borderRadius: 1,
                            '&:hover': { color: '#FFD700', bgcolor: '#3C2F2F' },
                        }}
                        aria-label="Navigate to catalog page"
                    >
                        Catalog
                    </Link>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            type="text"
                            placeholder="Search miniatures..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <Search sx={{ fontSize: 20, color: '#FFD700', mr: 1 }} />
                                ),
                            }}
                            sx={textFieldStyles}
                            aria-label="Search miniatures"
                        />
                    </Box>
                    <IconButton
                        onClick={onCartToggle}
                        sx={{
                            width: '100%',
                            px: 2,
                            py: 1,
                            bgcolor: '#FFD700',
                            color: '#211F1F',
                            borderRadius: 1,
                            '&:hover': { bgcolor: '#DAA520' },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        aria-label={`Open cart with ${cart.count} items`}
                    >
                        <ShoppingCart sx={{ fontSize: 18, mr: 1 }} />
                        <Typography sx={{ fontFamily: '"Lora", serif', fontWeight: 'bold' }}>
                            Cart ({cart.count})
                        </Typography>
                    </IconButton>
                </Box>
            )}
        </AppBar>
    );
}