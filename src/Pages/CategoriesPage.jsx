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
import { fetchItemsByCategory } from '/src/Apis/get-items-from-category.service.js';
import { fetchSpecifications } from "../Apis/get-specifications-service.js";
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

const removeDuplicateSpecifications = (specifications) => {
    const seen = new Set();
    return specifications.filter((spec) => {
        if (seen.has(spec.name)) {
            return false;
        }
        seen.add(spec.name);
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
    const [selectedSpecification1, setSelectedSpecification1] = useState(null);
    const [selectedSpecification2, setSelectedSpecification2] = useState(null);
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');

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

    const fetchItemsAndSpecifications = async (category, setSpecifications) => {
        if (!category || !category.value) {
            console.error('Invalid category:', category);
            return;
        }

        const itemsData = await fetchItemsByCategory(category.value);
        const categoryItems = itemsData.data?.items;

        const itemIds = categoryItems.map((item) => item.id);

        const allSpecifications = [];

        for (const itemId of itemIds) {
            const { data: specsData, error: specsError } = await fetchSpecifications(itemId);

            if (specsError) {
                console.error(`Error fetching specifications for item ${itemId}:`, specsError);
                continue;
            }

            if (specsData?.specifications) {
                allSpecifications.push(...specsData.specifications);
            }
        }

        const uniqueSpecifications = removeDuplicateSpecifications(allSpecifications);
        setSpecifications(uniqueSpecifications);
    };

    useEffect(() => {
        if (inputValue1.length >= 2) {
            fetchCategoriesData(inputValue1, setCategories1);
        }
    }, [inputValue1]);

    useEffect(() => {
        if (inputValue2.length >= 2) {
            fetchCategoriesData(inputValue2, setCategories2);
        }
    }, [inputValue2]);

    useEffect(() => {
        if (selectedCategory1 && selectedCategory1.value) {
            fetchItemsAndSpecifications(selectedCategory1, setSpecifications1);
        }
    }, [selectedCategory1]);

    useEffect(() => {
        if (selectedCategory2 && selectedCategory2.value) {
            fetchItemsAndSpecifications(selectedCategory2, setSpecifications2);
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
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                            />
                            {selectedCategory1 && (
                                <Autocomplete
                                    options={specifications1.filter(
                                        (spec) =>
                                            !selectedSpecification2 ||
                                            spec.name !== selectedSpecification2.name
                                    )}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectedSpecification1}
                                    onChange={(e, value) => setSelectedSpecification1(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specification 1" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.name === value.name}
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
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                            />
                            {selectedCategory2 && (
                                <Autocomplete
                                    options={specifications2.filter(
                                        (spec) =>
                                            !selectedSpecification1 ||
                                            spec.name !== selectedSpecification1.name
                                    )}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectedSpecification2}
                                    onChange={(e, value) => setSelectedSpecification2(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specification 2" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.name === value.name}
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
