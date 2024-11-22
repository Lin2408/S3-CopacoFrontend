import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Autocomplete,
    Card,
    CardContent,
} from '@mui/material';
import { fetchCategories } from '/src/Apis/get-categories.service.js';
import { fetchSpecifications } from '/src/Apis/get-specifications-service.js';
import './CategoriesPage.css';

const removeDuplicatesByValue = (categories) => {
    const seen = new Set();
    return categories.filter((category) => {
        if (seen.has(category.value)) {
            return false;
        }
        seen.add(category.value);
        return true;
    });
};

const CategoriesPage = () => {
    const [categories1, setCategories1] = useState([]);
    const [categories2, setCategories2] = useState([]);
    const [specifications1, setSpecifications1] = useState([]);
    const [specifications2, setSpecifications2] = useState([]);
    const [selectedCategory1, setSelectedCategory1] = useState(null);
    const [selectedCategory2, setSelectedCategory2] = useState(null);
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [selectedSpecification1, setSelectedSpecification1] = useState(null);
    const [selectedSpecification2, setSelectedSpecification2] = useState(null);

    const fetchCategoriesData = async (query, setCategories) => {
        const { data, error } = await fetchCategories();
        if (data) {
            const filteredCategories = data.categories.filter(
                (category) => category.value && category.value.toLowerCase().includes(query.toLowerCase())
            );
            setCategories(removeDuplicatesByValue(filteredCategories));
        } else {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchCategorySpecifications = async (categoryId, setSpecifications) => {
        if (categoryId) {
            const { data, error } = await fetchSpecifications(categoryId);
            if (data) {
                setSpecifications(data.specifications);
            } else {
                console.error('Error fetching specifications:', error);
            }
        }
    };

    useEffect(() => {
        if (inputValue1.length >= 3) {
            fetchCategoriesData(inputValue1, setCategories1);
        }
    }, [inputValue1]);

    useEffect(() => {
        if (inputValue2.length >= 3) {
            fetchCategoriesData(inputValue2, setCategories2);
        }
    }, [inputValue2]);

    useEffect(() => {
        if (selectedCategory1) {
            fetchCategorySpecifications(selectedCategory1.id, setSpecifications1);
        }
    }, [selectedCategory1]);

    useEffect(() => {
        if (selectedCategory2) {
            fetchCategorySpecifications(selectedCategory2.id, setSpecifications2);
        }
    }, [selectedCategory2]);

    return (
        <Box className="categories-container">
            <Card className="outer-card">
                <CardContent>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                            WebkitBackgroundClip: 'text',
                            color: 'black',
                        }}
                    >
                        Categories Page
                    </Typography>

                    <Box className="category-spec-container">
                        <Box className="category-box">
                            <Autocomplete
                                options={categories1.filter(
                                    (category) =>
                                        !selectedCategory2 || category.value !== selectedCategory2.value
                                )}
                                getOptionLabel={(option) => option.value || ''}
                                value={selectedCategory1}
                                onChange={(e, value) => setSelectedCategory1(value)}
                                inputValue={inputValue1}
                                onInputChange={(e, value) => setInputValue1(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Category 1" variant="outlined" />
                                )}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                            {selectedCategory1 && specifications1.length > 0 && (
                                <Autocomplete
                                    options={specifications1}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectedSpecification1}
                                    onChange={(e, value) => setSelectedSpecification1(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specification 1" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                />
                            )}
                        </Box>

                        <Box className="category-box">
                            <Autocomplete
                                options={categories2.filter(
                                    (category) =>
                                        !selectedCategory1 || category.value !== selectedCategory1.value
                                )}
                                getOptionLabel={(option) => option.value || ''}
                                value={selectedCategory2}
                                onChange={(e, value) => setSelectedCategory2(value)}
                                inputValue={inputValue2}
                                onInputChange={(e, value) => setInputValue2(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Category 2" variant="outlined" />
                                )}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                            {selectedCategory2 && specifications2.length > 0 && (
                                <Autocomplete
                                    options={specifications2}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectedSpecification2}
                                    onChange={(e, value) => setSelectedSpecification2(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specification 2" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                />
                            )}
                        </Box>
                    </Box>

                    <Button variant="contained" color="primary" className="check-button">
                        Submit Categories
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CategoriesPage;
