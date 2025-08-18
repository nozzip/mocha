import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import type { CommonColors } from '@mui/material';

// Extend CommonColors to include custom colors
interface CustomCommonColors extends CommonColors {
    parchment: string;
    gold: string;
    leather: string;
    copper: string;
}

// Definir el tema personalizado
const theme = createTheme({
    palette: {
        primary: {
            main: '#d97706', // gold-400
            light: '#f59e0b', // gold-300
            dark: '#b45309', // gold-600
        },
        secondary: {
            main: '#78350f', // leather-900
            light: '#92400e', // leather-800
            dark: '#4a3728', // leather-950
        },
        background: {
            default: '#211F1F', // leather-900
            paper: '#3C2F2F', // leather-800
        },
        text: {
            primary: '#FFF8E1', // parchment-100
            secondary: '#F5F5F5', // parchment-200
        },
        common: {
            parchment: '#FFF8E1',
            gold: '#FFD700',
            leather: '#211F1F',
            copper: '#B87333',
        } as CustomCommonColors, // Use the custom type
    },
    typography: {
        fontFamily: '"Crimson Text", "Merriweather", serif',
        h1: {
            fontFamily: '"Cinzel", serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: '"Cinzel", serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Cinzel", serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Cinzel", serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Cinzel", serif',
            fontWeight: 500,
        },
        h6: {
            fontFamily: '"Cinzel", serif',
            fontWeight: 500,
        },
        body1: {
            fontFamily: '"Lora", serif',
        },
        body2: {
            fontFamily: '"Lora", serif',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.fantasy-button': {
                        background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #d97706 100%)',
                        border: '1px solid #b45309',
                        boxShadow: 'inset 0 1px 0 rgba(254, 243, 199, 0.2), 0 2px 8px rgba(139, 69, 19, 0.3)',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Lora", serif',
                        fontWeight: 'bold',
                        color: '#211F1F',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #b45309 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(254, 243, 199, 0.3), 0 4px 12px rgba(139, 69, 19, 0.4)',
                            transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                            opacity: 0.5,
                            cursor: 'not-allowed',
                        },
                    },
                },
            },
        },
    },
});

// Componente personalizado para el fondo con textura de pergamino
export const ParchmentTexture = styled(Box)({
    backgroundImage: `
    radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(180, 83, 9, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(202, 138, 4, 0.05) 0%, transparent 50%)
  `,
});

// Componente personalizado para la tarjeta con estilo fantástico
export const FantasyCard = styled(Box)({
    background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #78350f 100%)',
    border: '2px solid #d97706',
    boxShadow: 'inset 0 1px 0 rgba(245, 158, 11, 0.2), 0 4px 14px rgba(139, 69, 19, 0.4)',
    borderRadius: '8px',
    '&:hover': {
        boxShadow: 'inset 0 1px 0 rgba(245, 158, 11, 0.3), 0 6px 16px rgba(139, 69, 19, 0.5)',
        borderColor: '#f59e0b',
    },
});

// Componente personalizado para el borde decorativo
export const FantasyBorder = styled(Box)({
    background: 'linear-gradient(45deg, #d97706, #f59e0b, #d97706)',
    padding: '2px',
    borderRadius: '8px',
});

// Componente personalizado para el contenido interno del borde decorativo
export const FantasyBorderInner = styled(Box)({
    background: '#78350f',
    borderRadius: '6px',
    padding: '1rem',
});

// Componente personalizado para el divisor ornamental
export const OrnamentalDivider = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
        content: '"⚜"',
        margin: '0 1rem',
        color: '#d97706',
        fontSize: '1.5rem',
    },
});

// Componente personalizado para el fondo con animación de brillo
export const ScrollBackground = styled(Box)({
    background: 'linear-gradient(135deg, #fef9c3 0%, #fef3c7 25%, #fde68a 50%, #fef3c7 75%, #fef9c3 100%)',
    backgroundSize: '200% 200%',
    animation: 'scroll-shimmer 6s ease-in-out infinite',
    '@keyframes scroll-shimmer': {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
    },
});

// Exporta el tema para usarlo en ThemeProvider
export default theme;