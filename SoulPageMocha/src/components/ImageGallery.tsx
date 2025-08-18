import { useState } from 'react';
import { Box, Grid, IconButton, Backdrop } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, ZoomIn, Close } from '@mui/icons-material';

interface ProductImage {
    id: number;
    image_url: string;
    display_order: number;
    is_primary: boolean;
}

interface ImageGalleryProps {
    images: ProductImage[];
    productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);

    if (!images || images.length === 0) {
        return (
            <Box
                sx={{
                    aspectRatio: '1/1',
                    borderRadius: 2,
                    overflow: 'hidden',
                    background: 'linear-gradient(to bottom right, #211F1F, #3C2F2F)',
                    border: '1px solid #B8860B',
                }}
            >
                <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
                    alt={productName}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
        );
    }

    const sortedImages = [...images].sort((a, b) => a.display_order - b.display_order);
    const currentImage = sortedImages[selectedImageIndex];

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % sortedImages.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                    sx={{
                        position: 'relative',
                        '&:hover .hover-buttons': { opacity: 1 },
                    }}
                >
                    <Box
                        sx={{
                            aspectRatio: '1/1',
                            borderRadius: 2,
                            overflow: 'hidden',
                            background: 'linear-gradient(to bottom right, #211F1F, #3C2F2F)',
                            border: '1px solid #B8860B',
                        }}
                    >
                        <Box
                            component="img"
                            src={currentImage.image_url}
                            alt={`${productName} - Image ${selectedImageIndex + 1}`}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                cursor: 'zoom-in',
                                transition: 'transform 0.3s',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                            onClick={() => setIsZoomOpen(true)}
                        />
                    </Box>

                    <IconButton
                        onClick={() => setIsZoomOpen(true)}
                        className="hover-buttons"
                        aria-label="Zoom image"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            p: 1,
                            bgcolor: 'rgba(33, 33, 33, 0.7)',
                            color: '#FFD700',
                            borderRadius: '50%',
                            border: '1px solid #B8860B',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)' },
                        }}
                    >
                        <ZoomIn sx={{ fontSize: 20 }} />
                    </IconButton>

                    {sortedImages.length > 1 && (
                        <>
                            <IconButton
                                onClick={prevImage}
                                className="hover-buttons"
                                aria-label="Previous image"
                                sx={{
                                    position: 'absolute',
                                    left: 16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    p: 1,
                                    bgcolor: 'rgba(33, 33, 33, 0.7)',
                                    color: '#FFD700',
                                    borderRadius: '50%',
                                    border: '1px solid #B8860B',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)' },
                                }}
                            >
                                <ArrowBackIos sx={{ fontSize: 24 }} />
                            </IconButton>
                            <IconButton
                                onClick={nextImage}
                                className="hover-buttons"
                                aria-label="Next image"
                                sx={{
                                    position: 'absolute',
                                    right: 16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    p: 1,
                                    bgcolor: 'rgba(33, 33, 33, 0.7)',
                                    color: '#FFD700',
                                    borderRadius: '50%',
                                    border: '1px solid #B8860B',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)' },
                                }}
                            >
                                <ArrowForwardIos sx={{ fontSize: 24 }} />
                            </IconButton>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16,
                                    px: 2,
                                    py: 0.5,
                                    bgcolor: 'rgba(33, 33, 33, 0.7)',
                                    color: '#FFF8E1',
                                    borderRadius: '9999px',
                                    border: '1px solid #B8860B',
                                    fontSize: '0.875rem',
                                    fontFamily: '"Lora", serif',
                                }}
                            >
                                {selectedImageIndex + 1} / {sortedImages.length}
                            </Box>
                        </>
                    )}
                </Box>

                {sortedImages.length > 1 && (
                    <Grid container spacing={1}>
                        {sortedImages.map((image, index) => (
                            <Grid item xs={3} md={2} key={image.id}>
                                <IconButton
                                    onClick={() => setSelectedImageIndex(index)}
                                    sx={{
                                        aspectRatio: '1/1',
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        border: index === selectedImageIndex ? '2px solid #FFD700' : '2px solid #B8860B',
                                        boxShadow: index === selectedImageIndex ? '0 0 8px rgba(184, 134, 11, 0.3)' : 'none',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            borderColor: '#FFD700',
                                        },
                                        p: 0,
                                    }}
                                    aria-label={`Select thumbnail ${index + 1}`}
                                >
                                    <Box
                                        component="img"
                                        src={image.image_url}
                                        alt={`${productName} thumbnail ${index + 1}`}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            <Backdrop
                open={isZoomOpen}
                sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Box sx={{ position: 'relative', maxWidth: 1200, maxHeight: '100%' }}>
                    <IconButton
                        onClick={() => setIsZoomOpen(false)}
                        aria-label="Close zoom"
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            p: 1,
                            bgcolor: 'rgba(33, 33, 33, 0.7)',
                            color: '#FFD700',
                            borderRadius: '50%',
                            border: '1px solid #B8860B',
                            zIndex: 10,
                            '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)' },
                        }}
                    >
                        <Close sx={{ fontSize: 24 }} />
                    </IconButton>
                    <Box
                        component="img"
                        src={currentImage.image_url}
                        alt={`${productName} - Zoomed view`}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: 2,
                        }}
                    />
                    {sortedImages.length > 1 && (
                        <>
                            <IconButton
                                onClick={prevImage}
                                aria-label="Previous image in zoom"
                                sx={{
                                    position: 'absolute',
                                    left: 16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    p: 1.5,
                                    bgcolor: 'rgba(33, 33, 33, 0.7)',
                                    color: '#FFD700',
                                    borderRadius: '50%',
                                    border: '1px solid #B8860B',
                                    '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)' },
                                }}
                            >
                                <ArrowBackIos sx={{ fontSize: 32 }} />
                            </IconButton>
                            <IconButton
                                onClick={nextImage}
                                aria-label="Next image in zoom"
                                sx={{
                                    position: 'absolute',
                                    right: 16,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    p: 1.5,
                                    bgcolor: 'rgba(33, 33, 33, 0.7)',
                                    color: '#FFD700',
                                    borderRadius: '50%',
                                    border: '1px solid #B8860B',
                                    '&:hover': { bgcolor: 'rgba(33, 33, 33, 0.9)' },
                                }}
                            >
                                <ArrowForwardIos sx={{ fontSize: 32 }} />
                            </IconButton>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    px: 2,
                                    py: 1,
                                    bgcolor: 'rgba(33, 33, 33, 0.7)',
                                    color: '#FFF8E1',
                                    borderRadius: '9999px',
                                    border: '1px solid #B8860B',
                                    fontFamily: '"Lora", serif',
                                }}
                            >
                                {selectedImageIndex + 1} / {sortedImages.length}
                            </Box>
                        </>
                    )}
                </Box>
            </Backdrop>
        </>
    );
}