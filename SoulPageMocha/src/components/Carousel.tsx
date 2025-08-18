import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box, IconButton, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

interface CarouselProps {
    images: Array<{
        url: string;
        title: string;
        subtitle: string;
    }>;
}

export default function Carousel({ images }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => {
            clearInterval(interval);
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <Box sx={{ position: 'relative', maxWidth: '100%', mx: 'auto' }}>
            <Box ref={emblaRef} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                <Box sx={{ display: 'flex' }}>
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: '0 0 100%',
                                minWidth: 0,
                                position: 'relative',
                                height: { xs: 384, md: 500 },
                            }}
                        >
                            <Box
                                component="img"
                                src={image.url}
                                alt={image.title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to top, rgba(33, 33, 33, 0.9), transparent)',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 32,
                                    left: 32,
                                    color: '#FFF8E1',
                                }}
                            >
                                <Box
                                    component="h3"
                                    sx={{
                                        fontSize: { xs: '1.875rem', md: '2.25rem' },
                                        fontWeight: 'bold',
                                        mb: 1,
                                        color: '#FFD700',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                        fontFamily: '"Cinzel", serif',
                                    }}
                                >
                                    {image.title}
                                </Box>
                                <Box
                                    component="p"
                                    sx={{
                                        fontSize: { xs: '1.125rem', md: '1.25rem' },
                                        color: '#F5F5F5',
                                        fontFamily: '"Lora", serif',
                                    }}
                                >
                                    {image.subtitle}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <IconButton
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="Previous slide"
                sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(33, 33, 33, 0.7)',
                    color: '#FFD700',
                    border: '1px solid #B8860B',
                    '&:hover': {
                        backgroundColor: 'rgba(33, 33, 33, 0.9)',
                    },
                    '&:disabled': {
                        opacity: 0.5,
                    },
                }}
            >
                <ArrowBackIos />
            </IconButton>
            <IconButton
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="Next slide"
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(33, 33, 33, 0.7)',
                    color: '#FFD700',
                    border: '1px solid #B8860B',
                    '&:hover': {
                        backgroundColor: 'rgba(33, 33, 33, 0.9)',
                    },
                    '&:disabled': {
                        opacity: 0.5,
                    },
                }}
            >
                <ArrowForwardIos />
            </IconButton>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 1 }}>
                {images.map((_, index) => (
                    <Button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        sx={{
                            minWidth: 8,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            p: 0,
                            backgroundColor: index === selectedIndex ? '#FFD700' : '#4B3F3F',
                            border: index === selectedIndex ? '1px solid #DAA520' : '1px solid #3C2F2F',
                            '&:hover': {
                                backgroundColor: index === selectedIndex ? '#FFD700' : '#5C4A4A',
                            },
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </Box>
        </Box>
    );
}