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
import {getSpecificationsFromCategory,getSpecificationsValuesFromCategory} from '../Apis/get-specifications-from-categories.service.js';
import createRule from '../Apis/create-rule.service.js';
import './RulesPage.css';

const removeDuplicatesById = (categories) => {
    const seen = new Set();
    return categories.filter((category) => {
        if (seen.has(category.id)) {
            return false;
        }
        seen.add(category.id);
        return true;
    });
};

const RulesPage = () => {
    const [categories1, setCategories1] = useState([]);
    const [categories2, setCategories2] = useState([]);
    const [specifications1, setSpecifications1] = useState([]);
    const [specifications2, setSpecifications2] = useState([]);
    const [selectedCategory1, setSelectedCategory1] = useState(null);
    const [selectedCategory2, setSelectedCategory2] = useState(null);
    const [selectedSpecification1, setSelectedSpecification1] = useState(null);
    const [selectedSpecification2, setSelectedSpecification2] = useState(null);
    const [SpecificationsFrom, setSpecificationsFrom] = useState([]);
    const [SpecificationsTo, setSpecificationsTo] = useState([]);
    const [selectedSpecificationsFrom, setSelectedSpecificationsFrom] = useState([]);
    const [selectedSpecificationsTo, setSelectedSpecificationsTo] = useState([]);
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [isWeirdName1, setIsWeirdName1] = useState(false);
    const [isWeirdName2, setIsWeirdName2] = useState(false);
    const [selectedItems1, setSelectedItems1] = useState([]);
    const [selectedItems2, setSelectedItems2] = useState([]);
    const [resultMessage, setResultMessage] = useState('');
    const [showOnlySpecNames1, setShowOnlySpecNames1] = useState(false);
    const [showOnlySpecNames2, setShowOnlySpecNames2] = useState(false);


    const fetchCategoriesData = async (query, setCategories) => {
        const { data, error } = await fetchCategories();
        if (data) {
            const filteredCategories = data.categories.filter(
                (category) => category.value && category.value.toLowerCase().includes(query.toLowerCase())
            );
            setCategories(removeDuplicatesById(filteredCategories));
        } else {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSpecifications = async (category, setSpecifications) => {
        if (!category || !category.id) {
            console.error('Invalid category:', category);
            return;
        }

        try {
            const { specifications } = await getSpecificationsFromCategory(category.id);
            console.log(`Specifications for category ${category.id}:`, specifications);
            setSpecifications(Array.isArray(specifications) ? specifications : []);
        } catch (error) {
            console.error('Error fetching specifications:', error);
        }
    };
    const fetchSpecValues = async (specName, categoryId,setSpec) => {
        if (!specName || !categoryId){
            return;
        }
        try {
            const { specifications} = await getSpecificationsValuesFromCategory(specName,categoryId);
            console.log(`test ${specifications}`)
            setSpec(Array.isArray(specifications) ? specifications : []);
        }catch (error){
            console.error(error)
        }
    }

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
        if (selectedCategory1 && selectedCategory1.id) {
            fetchSpecifications(selectedCategory1, setSpecifications1);
        }
    }, [selectedCategory1]);

    useEffect(() => {
        if (selectedCategory2 && selectedCategory2.id) {
            fetchSpecifications(selectedCategory2, setSpecifications2);
        }
    }, [selectedCategory2]);

    useEffect(() => {
        if (selectedSpecification1) {
            fetchSpecValues(selectedSpecification1.name, selectedCategory1.id, setSpecificationsFrom);
        }
    }, [selectedSpecification1]);

    useEffect(() => {
        if (selectedSpecification2) {
            fetchSpecValues(selectedSpecification2.name, selectedCategory2.id, setSpecificationsTo);
        }
    }, [selectedSpecification2]);

    useEffect(() => {
        if (showOnlySpecNames1 && selectedCategory1) {
            setSpecificationsFrom(specifications1.map(spec => spec.name));
        }
    }, [showOnlySpecNames1, specifications1]);

    useEffect(() => {
        if (showOnlySpecNames2 && selectedCategory2) {
            setSpecificationsTo(specifications2.map(spec => spec.name));
        }
    }, [showOnlySpecNames2, specifications2]);

    const handleSelectItem1 = (item) => {
        setSelectedSpecificationsFrom((prevSelectedItems) =>
            prevSelectedItems.includes(item)
                ? prevSelectedItems.filter((i) => i !== item)
                : [...prevSelectedItems, item]
        );
    };

    const handleSelectItem2 = (item) => {
        setSelectedSpecificationsTo((prevSelectedItems) =>
            prevSelectedItems.includes(item)
                ? prevSelectedItems.filter((i) => i !== item)
                : [...prevSelectedItems, item]
        );
    };

    const handleSubmit = async () => {
        const ruleData = {
            categoryFrom: selectedCategory1,
            nameFrom: selectedSpecification1?.name,
            valuesFrom: selectedSpecificationsFrom,
            categoryTo: selectedCategory2,
            nameTo: selectedSpecification2?.name,
            valuesTo: selectedSpecificationsTo,
            unit: 'unit' // Replace with the actual unit if needed
        };

        try {
            const result = await createRule(ruleData);
            setResultMessage(result ? 'Rule created successfully!' : 'Failed to create rule.');
        } catch (error) {
            setResultMessage('Error creating rule.');
        }
    };

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
                                        !selectedCategory2 || category.id !== selectedCategory2.id
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showOnlySpecNames1}
                                        onChange={(e) => setShowOnlySpecNames1(e.target.checked)}
                                    />
                                }
                                label="Show only Specification Names"
                            />
                            {selectedCategory1 && !showOnlySpecNames1 && (
                                <Autocomplete
                                    options={specifications1}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectedSpecification1}
                                    onChange={(e, value) => setSelectedSpecification1(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specification 1" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.name === value.name}
                                />
                            )}
                            {selectedCategory1 && (
                                <Box className="list-box">
                                    <List>
                                        {SpecificationsFrom.map((spec, index) => (
                                            <ListItemButton
                                                key={index}
                                                selected={selectedSpecificationsFrom.includes(spec)}
                                                onClick={() => handleSelectItem1(spec)}
                                            >
                                                <ListItemText primary={spec || 'No value'} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </Box>

                        <Box className="category-box">
                            <Autocomplete
                                options={categories2.filter(
                                    (category) =>
                                        !selectedCategory1 || category.id !== selectedCategory1.id
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showOnlySpecNames2}
                                        onChange={(e) => setShowOnlySpecNames2(e.target.checked)}
                                    />
                                }
                                label="Show only Specification Names"
                            />
                            {selectedCategory2 && !showOnlySpecNames2 && (
                                <Autocomplete
                                    options={specifications2}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selectedSpecification2}
                                    onChange={(e, value) => setSelectedSpecification2(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Select Specification 2" variant="outlined" />
                                    )}
                                    isOptionEqualToValue={(option, value) => option.name === value.name}
                                />
                            )}
                            {selectedCategory2 && (
                                <Box className="list-box">
                                    <List>
                                        {SpecificationsTo.map((spec, index) => (
                                            <ListItemButton
                                                key={index}
                                                selected={selectedSpecificationsTo.includes(spec)}
                                                onClick={() => handleSelectItem2(spec)}
                                            >
                                                <ListItemText primary={spec || 'No value'} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <Button variant="contained" color="primary" className="check-button" onClick={handleSubmit}>
                        Submit Rule
                    </Button>
                    {resultMessage && <Typography className="result-message">{resultMessage}</Typography>}
                </CardContent>
            </Card>
        </Box>
    );
};

export default RulesPage;