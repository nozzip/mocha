import { Box, Grid, Typography, Link } from '@mui/material';

interface GameSegment {
    title: string;
    description: string;
    image: string;
    color: string;
}

const gameSegments: GameSegment[] = [
    {
        title: 'Dungeons & Dragons',
        description:
            'Epic fantasy adventures await with our extensive D&D miniature collection. From brave heroes to fearsome dragons, bring your campaigns to life.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
        color: 'linear-gradient(to right, #DC2626, #F97316)',
    },
    {
        title: 'Pathfinder',
        description:
            'Explore the rich world of Golarion with detailed Pathfinder miniatures. Perfect for both classic and modern adventures.',
        image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600',
        color: 'linear-gradient(to right, #16A34A, #059669)',
    },
    {
        title: 'Warhammer 40K',
        description:
            'In the grim darkness of the far future, there is only war. Command your armies with authentic Warhammer 40,000 miniatures.',
        image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600',
        color: 'linear-gradient(to right, #2563EB, #4F46E5)',
    },
    {
        title: 'Movie & Anime Collectibles',
        description:
            'Bring your favorite characters to life with premium statues and figures from beloved movies, series, and anime.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
        color: 'linear-gradient(to right, #9333EA, #EC4899)',
    },
];

export default function GameSegments() {
    return (
        <Box sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: { xs: '1.875rem', md: '2.25rem' },
                        fontWeight: 'bold',
                        color: '#FFF8E1',
                        fontFamily: '"Cinzel", serif',
                        mb: 2,
                    }}
                >
                    Explore Our{' '}
                    <Box component="span" sx={{ color: '#FFD700' }}>
                        Realms
                    </Box>
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1.25rem',
                        color: '#F5F5F5',
                        maxWidth: 800,
                        mx: 'auto',
                        fontFamily: '"Lora", serif',
                    }}
                >
                    Discover miniatures and collectibles from legendary gaming worlds and mystical entertainment realms
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {gameSegments.map((segment, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Box
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 2,
                                border: '1px solid #B8860B',
                                boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                                transition: 'all 0.3s',
                                '&:hover': {
                                    borderColor: '#FFD700',
                                    boxShadow: '-4px 0 16px rgba(184, 134, 11, 0.5)',
                                },
                            }}
                        >
                            <Box sx={{ display: { xs: 'flex', md: 'flex' }, flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
                                <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative', overflow: 'hidden' }}>
                                    <Box
                                        component="img"
                                        src={segment.image}
                                        alt={segment.title}
                                        sx={{
                                            width: '100%',
                                            height: { xs: 192, md: '100%' },
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
                                            background: 'linear-gradient(to right, rgba(33, 33, 33, 0.8), transparent)',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        width: { xs: '100%', md: '50%' },
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem',
                                            fontWeight: 'medium',
                                            color: '#FFF8E1',
                                            background: segment.color,
                                            border: '1px solid #B8860B',
                                            mb: 2,
                                            alignSelf: 'start',
                                            fontFamily: '"Lora", serif',
                                        }}
                                    >
                                        Featured Collection
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: '#FFF8E1',
                                            mb: 1.5,
                                            fontFamily: '"Cinzel", serif',
                                            transition: 'color 0.3s',
                                            '&:hover': {
                                                color: '#FFD700',
                                            },
                                        }}
                                    >
                                        {segment.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#F5F5F5',
                                            mb: 3,
                                            lineHeight: 1.6,
                                            fontFamily: '"Lora", serif',
                                        }}
                                    >
                                        {segment.description}
                                    </Typography>
                                    <Link
                                        href="/catalog"
                                        sx={{
                                            display: 'inline-block',
                                            px: 3,
                                            py: 1,
                                            borderRadius: 1,
                                            fontWeight: 'bold',
                                            color: '#FFF8E1',
                                            background: segment.color,
                                            border: '1px solid #B8860B',
                                            textDecoration: 'none',
                                            fontFamily: '"Lora", serif',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                            },
                                        }}
                                        aria-label={`Browse ${segment.title} collection`}
                                    >
                                        Browse Collection
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}