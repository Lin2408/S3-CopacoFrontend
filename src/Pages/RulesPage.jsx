import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Autocomplete,
    Card,
    CardContent,
    List,
    ListItemButton,
    ListItemText,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { fetchCategories } from '/src/Apis/get-categories.service.js';
import { getSpecificationsFromCategory, getSpecificationsValuesFromCategory } from '../Apis/get-specifications-from-categories.service.js';
import createRule from '../Apis/create-rule.service.js';
import './RulesPage.css';

const RulesPage = () => {
    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState([]);
    const [specifications, setSpecifications] = useState([]);
    const [selected, setSelected] = useState({
        category1: null,
        category2: null,
        specification1: null,
        specification2: null,
        valuesFrom: [],
        valuesTo: [],
    });
    const [inputValue, setInputValue] = useState('');
    const [isWeirdName, setIsWeirdName] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

    const fetchCategoriesData = async (query) => {
        const { data, error } = await fetchCategories();
        if (data) {
            setCategories(data.categories.filter((cat) => cat.value?.toLowerCase().includes(query.toLowerCase())));
        } else {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSpecifications = async (categoryId) => {
        if (!categoryId) return;
        try {
            const { specifications } = await getSpecificationsFromCategory(categoryId);
            setSpecifications(specifications || []);
        } catch (error) {
            console.error('Error fetching specifications:', error);
        }
    };

    const fetchSpecValues = async (specName, categoryId) => {
        if (!specName || !categoryId) return;
        try {
            const { specifications } = await getSpecificationsValuesFromCategory(specName, categoryId);
            setSelected((prev) => ({ ...prev, valuesFrom: specifications || [] }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        const ruleData = {
            categoryFrom: selected.category1,
            nameFrom: selected.specification1?.name,
            valuesFrom: selected.valuesFrom,
            categoryTo: selected.category2,
            nameTo: selected.specification2?.name,
            valuesTo: selected.valuesTo,
            unit: 'unit',
        };

        try {
            const result = await createRule(ruleData);
            setResultMessage(result ? 'Rule created successfully!' : 'Failed to create rule.');
        } catch (error) {
            setResultMessage('Error creating rule.');
        }
    };

    useEffect(() => {
        if (inputValue.length >= 2) fetchCategoriesData(inputValue);
    }, [inputValue]);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

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
                        Rule Creation Page
                    </Typography>

                    {step === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 1: Select the First Category
                            </Typography>
                            <Autocomplete
                                options={categories}
                                getOptionLabel={(option) => option.value || ''}
                                value={selected.category1}
                                onChange={(e, value) => setSelected((prev) => ({ ...prev, category1: value }))}
                                inputValue={inputValue}
                                onInputChange={(e, value) => setInputValue(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Category" variant="outlined" />
                                )}
                            />
                            {selected.category1 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    )}

                    {step === 2 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 2: Select a Specification
                            </Typography>
                            <Autocomplete
                                options={specifications}
                                getOptionLabel={(option) => option.name || ''}
                                value={selected.specification1}
                                onChange={(e, value) => setSelected((prev) => ({ ...prev, specification1: value }))}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Specification" variant="outlined" />
                                )}
                            />
                            <Button variant="contained" color="secondary" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.specification1 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    )}

                    {step === 3 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 3: Review and Submit
                            </Typography>
                            <Typography variant="body1">
                                Selected Category: {selected.category1?.value}
                            </Typography>
                            <Typography variant="body1">
                                Selected Specification: {selected.specification1?.name}
                            </Typography>
                            <Button variant="contained" color="secondary" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                                Submit Rule
                            </Button>
                            {resultMessage && <Typography className="result-message">{resultMessage}</Typography>}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default RulesPage;
