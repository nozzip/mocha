import { useState } from 'react';
import { Backdrop, Box, IconButton, Typography, Button, TextField, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Close, CreditCard, Lock, CheckCircle } from '@mui/icons-material';
import { useCart } from '../hooks/cartContextType';
import { ParchmentTexture } from '../theme';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const { cart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const textFieldStyles = {
        '& .MuiInputBase-root': { bgcolor: '#3C2F2F', color: '#FFF8E1' },
        '& .MuiInputLabel-root': { color: '#FFD700' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B8860B' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#DAA520' },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
        '& .MuiInputBase-input': { fontFamily: '"Lora", serif' },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsComplete(true);
            setTimeout(() => {
                setIsComplete(false);
                onClose();
            }, 3000);
        } catch (error) {
            console.error('Error processing order:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    if (isComplete) {
        return (
            <Backdrop
                open={isOpen}
                sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <ParchmentTexture
                    sx={{
                        bgcolor: '#211F1F',
                        borderRadius: 2,
                        p: 4,
                        maxWidth: 400,
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                        border: '1px solid #B8860B',
                    }}
                >
                    <CheckCircle sx={{ fontSize: 64, color: '#355E3B', mb: 2 }} />
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 'bold',
                            mb: 1,
                        }}
                    >
                        Order Complete!
                    </Typography>
                    <Typography
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            mb: 2,
                        }}
                    >
                        Thank you for your purchase. You'll receive a confirmation email shortly.
                    </Typography>
                    <Typography
                        sx={{
                            color: '#D3D3D3',
                            fontSize: '0.875rem',
                            fontFamily: '"Lora", serif',
                        }}
                    >
                        This window will close automatically...
                    </Typography>
                </ParchmentTexture>
            </Backdrop>
        );
    }

    return (
        <Backdrop
            open={isOpen}
            sx={{
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
            }}
        >
            <ParchmentTexture
                sx={{
                    bgcolor: '#211F1F',
                    borderRadius: 2,
                    maxWidth: 800,
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #B8860B',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        borderBottom: '1px solid rgba(184, 134, 11, 0.3)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 'bold',
                        }}
                    >
                        ⚜ Checkout ⚜
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        aria-label="Close checkout modal"
                        sx={{
                            color: '#FFD700',
                            '&:hover': {
                                color: '#FFF8E1',
                                bgcolor: '#3C2F2F',
                            },
                        }}
                    >
                        <Close />
                    </IconButton>
                </Box>

                <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box
                        sx={{
                            bgcolor: 'rgba(33, 33, 33, 0.5)',
                            borderRadius: 2,
                            p: 2,
                            border: '1px solid rgba(184, 134, 11, 0.3)',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFF8E1',
                                fontFamily: '"Cinzel", serif',
                                fontWeight: 'bold',
                                mb: 1.5,
                            }}
                        >
                            Order Summary
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {cart.items.map((item) => (
                                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                                    <Typography sx={{ color: '#F5F5F5', fontFamily: '"Lora", serif' }}>
                                        {item.name} × {item.quantity}
                                    </Typography>
                                    <Typography sx={{ color: '#FFD700', fontFamily: '"Lora", serif' }}>
                                        ${item.total_price.toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}
                            <Box
                                sx={{
                                    borderTop: '1px solid rgba(184, 134, 11, 0.3)',
                                    pt: 1,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                }}
                            >
                                <Typography sx={{ color: '#FFF8E1', fontFamily: '"Lora", serif' }}>
                                    Total:
                                </Typography>
                                <Typography sx={{ color: '#FFD700', fontFamily: '"Cinzel", serif' }}>
                                    ${cart.total.toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#FFF8E1',
                                fontFamily: '"Cinzel", serif',
                                fontWeight: 'bold',
                                mb: 1.5,
                            }}
                        >
                            Contact Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} />
                            <TextField
                                fullWidth
                                type="email"
                                name="email"
                                label="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                sx={textFieldStyles}
                                aria-label="Email address"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} />
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="firstName"
                                label="First name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                sx={textFieldStyles}
                                aria-label="First name"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <TextField
                                fullWidth
                                type="text"
                                name="lastName"
                                label="Last name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                sx={textFieldStyles}
                                aria-label="Last name"
                            />
                        </Grid>
                    </Box>
                </Box>

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 'bold',
                            mb: 1.5,
                        }}
                    >
                        Shipping Address
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            type="text"
                            name="address"
                            label="Street address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            sx={textFieldStyles}
                            aria-label="Street address"
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="city"
                                    label="City"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                    sx={textFieldStyles}
                                    aria-label="City"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="zipCode"
                                    label="ZIP code"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    required
                                    sx={textFieldStyles}
                                    aria-label="ZIP code"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 'bold',
                            mb: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <CreditCard sx={{ fontSize: 20, mr: 1, color: '#FFD700' }} />
                        Payment Information
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            fullWidth
                            type="text"
                            name="cardNumber"
                            label="Card number"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            sx={textFieldStyles}
                            aria-label="Card number"
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="expiryDate"
                                    label="MM/YY"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    required
                                    sx={textFieldStyles}
                                    aria-label="Expiry date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="cvv"
                                    label="CVV"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    required
                                    sx={textFieldStyles}
                                    aria-label="CVV"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', color: '#F5F5F5', fontSize: '0.875rem', fontFamily: '"Lora", serif' }}>
                    <Lock sx={{ fontSize: 16, mr: 1, color: '#355E3B' }} />
                    Your payment information is encrypted and secure
                </Box>

                <Button
                    type="submit"
                    disabled={isProcessing || cart.items.length === 0}
                    className="fantasy-button"
                    sx={{
                        py: 1.5,
                        borderRadius: 1,
                    }}
                    aria-label={`Complete order for $${cart.total.toFixed(2)}`}
                >
                    {isProcessing ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress size={20} sx={{ color: '#FFF8E1', mr: 1 }} />
                            Processing...
                        </Box>
                    ) : (
                        `Complete Order • $${cart.total.toFixed(2)}`
                    )}
                </Button>
            </ParchmentTexture>
        </Backdrop>

    );
}