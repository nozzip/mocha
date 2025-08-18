import { useState, useEffect } from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FilterAlt, ExpandMore } from '@mui/icons-material';
import { Category } from '@/shared/types';

interface FiltersProps {
    selectedCategory: string;
    selectedMaterial: string;
    selectedScale: string;
    onCategoryChange: (category: string) => void;
    onMaterialChange: (material: string) => void;
    onScaleChange: (scale: string) => void;
}

export default function Filters({
    selectedCategory,
    selectedMaterial,
    selectedScale,
    onCategoryChange,
    onMaterialChange,
    onScaleChange,
}: FiltersProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const materials = ['Plastic', 'Resin', 'Metal', 'PVC', 'Polystone'];
    const scales = ['28mm', '32mm', '1/6 Scale', '1/7 Scale', '1/8 Scale', '1/4 Scale'];

    return (
        <Box
            sx={{
                bgcolor: '#211F1F',
                borderRadius: 2,
                p: 3,
                boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.5)',
                border: '1px solid #B8860B',
            }}
        >
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        color: '#FFF8E1',
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 'bold',
                        textTransform: 'none',
                    }}
                    aria-label={isOpen ? 'Close filters' : 'Open filters'}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FilterAlt sx={{ fontSize: 20, mr: 1, color: '#FFD700' }} />
                        ⚜ Filters ⚜
                    </Box>
                    <ExpandMore
                        sx={{
                            fontSize: 20,
                            color: '#FFD700',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s',
                        }}
                    />
                </Button>
            </Box>

            <Box
                sx={{
                    display: { xs: isOpen ? 'flex' : 'none', md: 'flex' },
                    flexDirection: 'column',
                    gap: 3,
                    mt: { xs: 2, md: 0 },
                }}
            >
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <FilterAlt sx={{ fontSize: 20, mr: 1, color: '#FFD700' }} />
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#FFF8E1',
                            fontFamily: '"Cinzel", serif',
                            fontWeight: 'bold',
                        }}
                    >
                        ⚜ Filters ⚜
                    </Typography>
                </Box>

                <FormControl fullWidth>
                    <InputLabel
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            '&.Mui-focused': { color: '#FFD700' },
                        }}
                    >
                        Category
                    </InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        sx={{
                            bgcolor: '#3C2F2F',
                            color: '#FFF8E1',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B8860B' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#DAA520' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                            '& .MuiSelect-icon': { color: '#FFD700' },
                            '& .MuiInputBase-input': { fontFamily: '"Lora", serif' },
                        }}
                        aria-label="Select category"
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.slug}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            '&.Mui-focused': { color: '#FFD700' },
                        }}
                    >
                        Material
                    </InputLabel>
                    <Select
                        value={selectedMaterial}
                        onChange={(e) => onMaterialChange(e.target.value)}
                        sx={{
                            bgcolor: '#3C2F2F',
                            color: '#FFF8E1',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B8860B' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#DAA520' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                            '& .MuiSelect-icon': { color: '#FFD700' },
                            '& .MuiInputBase-input': { fontFamily: '"Lora", serif' },
                        }}
                        aria-label="Select material"
                    >
                        <MenuItem value="">All Materials</MenuItem>
                        {materials.map((material) => (
                            <MenuItem key={material} value={material}>
                                {material}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel
                        sx={{
                            color: '#F5F5F5',
                            fontFamily: '"Lora", serif',
                            '&.Mui-focused': { color: '#FFD700' },
                        }}
                    >
                        Scale
                    </InputLabel>
                    <Select
                        value={selectedScale}
                        onChange={(e) => onScaleChange(e.target.value)}
                        sx={{
                            bgcolor: '#3C2F2F',
                            color: '#FFF8E1',
                            borderRadius: 1,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#B8860B' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#DAA520' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                            '& .MuiSelect-icon': { color: '#FFD700' },
                            '& .MuiInputBase-input': { fontFamily: '"Lora", serif' },
                        }}
                        aria-label="Select scale"
                    >
                        <MenuItem value="">All Scales</MenuItem>
                        {scales.map((scale) => (
                            <MenuItem key={scale} value={scale}>
                                {scale}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    onClick={() => {
                        onCategoryChange('');
                        onMaterialChange('');
                        onScaleChange('');
                    }}
                    sx={{
                        color: '#FFD700',
                        fontFamily: '"Lora", serif',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                            color: '#DAA520',
                        },
                    }}
                    aria-label="Clear all filters"
                >
                    Clear All Filters
                </Button>
            </Box>
        </Box>
    );
}