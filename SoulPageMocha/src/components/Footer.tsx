import { Box, Grid, Typography, Link } from '@mui/material';
import { Security, LocalShipping, CreditCard, Handshake } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'linear-gradient(to right, #211F1F, #3C2F2F, #211F1F)',
                borderTop: '1px solid rgba(184, 134, 11, 0.3)',
                py: 6,
            }}
        >
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <LocalShipping sx={{ fontSize: 32, color: '#FFD700' }} />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#FFF8E1', fontFamily: '"Lora", serif', fontWeight: 'bold' }}
                                >
                                    Free Shipping
                                </Typography>
                                <Typography
                                    sx={{ color: '#F5F5F5', fontSize: '0.875rem', fontFamily: '"Lora", serif' }}
                                >
                                    Orders over $75
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Security sx={{ fontSize: 32, color: '#FFD700' }} />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#FFF8E1', fontFamily: '"Lora", serif', fontWeight: 'bold' }}
                                >
                                    Secure Payment
                                </Typography>
                                <Typography
                                    sx={{ color: '#F5F5F5', fontSize: '0.875rem', fontFamily: '"Lora", serif' }}
                                >
                                    256-bit SSL encryption
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CreditCard sx={{ fontSize: 32, color: '#FFD700' }} />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#FFF8E1', fontFamily: '"Lora", serif', fontWeight: 'bold' }}
                                >
                                    Easy Returns
                                </Typography>
                                <Typography
                                    sx={{ color: '#F5F5F5', fontSize: '0.875rem', fontFamily: '"Lora", serif' }}
                                >
                                    30-day return policy
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Handshake sx={{ fontSize: 32, color: '#FFD700' }} />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#FFF8E1', fontFamily: '"Lora", serif', fontWeight: 'bold' }}
                                >
                                    Expert Support
                                </Typography>
                                <Typography
                                    sx={{ color: '#F5F5F5', fontSize: '0.875rem', fontFamily: '"Lora", serif' }}
                                >
                                    Hobby specialists
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFF8E1',
                                fontFamily: '"Lora", serif',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Categories
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Warhammer 40K category"
                            >
                                Warhammer 40K
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="D&D Characters category"
                            >
                                D&D Characters
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Movie Statues category"
                            >
                                Movie Statues
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Anime Figures category"
                            >
                                Anime Figures
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFF8E1',
                                fontFamily: '"Lora", serif',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Support
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Contact Us"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="FAQ"
                            >
                                FAQ
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Shipping Info"
                            >
                                Shipping Info
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Returns"
                            >
                                Returns
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFF8E1',
                                fontFamily: '"Lora", serif',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Company
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="About Us"
                            >
                                About Us
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Careers"
                            >
                                Careers
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Privacy Policy"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Terms of Service"
                            >
                                Terms of Service
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFF8E1',
                                fontFamily: '"Lora", serif',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Connect
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Newsletter"
                            >
                                Newsletter
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Discord"
                            >
                                Discord
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Reddit"
                            >
                                Reddit
                            </Link>
                            <Link
                                href="#"
                                sx={{
                                    color: '#F5F5F5',
                                    fontFamily: '"Lora", serif',
                                    textDecoration: 'none',
                                    '&:hover': { color: '#FFD700' },
                                }}
                                aria-label="Instagram"
                            >
                                Instagram
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid rgba(184, 134, 11, 0.3)', pt: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#FFD700',
                                    fontFamily: '"Cinzel", serif',
                                    fontWeight: 'bold',
                                }}
                            >
                                ⚔ MiniVault ⚔
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#F5F5F5',
                                    fontSize: '0.875rem',
                                    fontFamily: '"Lora", serif',
                                    mt: 0.5,
                                }}
                            >
                                Premium fantasy miniatures and collectibles
                            </Typography>
                        </Box>
                        <Typography
                            sx={{
                                color: '#F5F5F5',
                                fontSize: '0.875rem',
                                fontFamily: '"Lora", serif',
                                textAlign: { xs: 'center', md: 'right' },
                            }}
                        >
                            © 2024 MiniVault. All rights reserved.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}