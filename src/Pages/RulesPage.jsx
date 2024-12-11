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
        valuesFromCategory2: [],
        valuesToCategory2: [],
    });
    const [inputValue, setInputValue] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [showOnlySpecNames1, setShowOnlySpecNames1] = useState(false);
    const [showOnlySpecNames2, setShowOnlySpecNames2] = useState(false);
    const [searchValue1, setSearchValue1] = useState('');
    const [searchValue2, setSearchValue2] = useState('');

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
            return specifications || [];
        } catch (error) {
            console.error(error);
        }
    };
  
    const handleSubmit = async () => {
        const ruleData = {
            categoryFrom: selected.category1,
            nameFrom: selected.specification1?.name,
            valuesFrom: selected.valuesFrom,
            isNameFrom: true,
            categoryTo: selected.category2,
            nameTo: selected.specification2?.name,
            valuesTo: selected.valuesToCategory2,
            isNameTo: true,
            unit: 'unit',
        };

        try {
            const result = await createRule(ruleData);
            setResultMessage(result ? 'Rule created successfully!' : 'Failed to create rule.');
        } catch (error) {
            console.error('Error creating rule:', error.response ? error.response.data : error.message);
            setResultMessage('Error creating rule.');
        }
    };

    useEffect(() => {
        if (inputValue.length >= 2) fetchCategoriesData(inputValue);
    }, [inputValue]);

    useEffect(() => {
        if (selected.category1?.id) {
            fetchSpecifications(selected.category1.id);
        }
    }, [selected.category1]);

    useEffect(() => {
        if (selected.specification1?.name && selected.category1?.id) {
            fetchSpecValues(selected.specification1.name, selected.category1.id).then((values) =>
                setSelected((prev) => ({ ...prev, valuesFrom: values }))
            );
        }
    }, [selected.specification1]);

    useEffect(() => {
        if (selected.category2?.id) {
            fetchSpecifications(selected.category2.id);
        }
    }, [selected.category2]);

    useEffect(() => {
        if (selected.specification2?.name && selected.category2?.id) {
            fetchSpecValues(selected.specification2.name, selected.category2.id).then((values) =>
                setSelected((prev) => ({ ...prev, valuesFromCategory2: values }))
            );
        }
    }, [selected.specification2]);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => {
        setStep((prev) => {
            if (prev === 4 && showOnlySpecNames1) return 2;
            if (prev === 6 && showOnlySpecNames2) return 4;
            return prev - 1;
        });
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
                                renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" />}
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
                                renderInput={(params) => <TextField {...params} label="Select Specification" variant="outlined" />}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <input
                                    type="checkbox"
                                    id="weirdNameCheckbox1"
                                    checked={showOnlySpecNames1}
                                    onChange={(e) => setShowOnlySpecNames1(e.target.checked)}
                                />
                                <label htmlFor="weirdNameCheckbox1" style={{ marginLeft: '8px' }}>
                                    Has weird name
                                </label>
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.specification1 && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    onClick={() => (showOnlySpecNames1 ? setStep(4) : handleNext())}
                                >
                                    {showOnlySpecNames1 ? 'Skip to Category 2' : 'Next'}
                                </Button>
                            )}
                        </Box>
                    )}


                    {step === 3 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 3: Select Values for the First Category
                            </Typography>
                            <Box className="list-box">
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Specification Values:
                                </Typography>
                                <List>
                                    {selected.valuesFrom.map((value, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={selected.valuesTo.includes(value)}
                                            onClick={() =>
                                                setSelected((prev) => ({
                                                    ...prev,
                                                    valuesTo: prev.valuesTo.includes(value)
                                                        ? prev.valuesTo.filter((v) => v !== value)
                                                        : [...prev.valuesTo, value],
                                                }))
                                            }
                                        >
                                            <ListItemText primary={value} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, mr: 2}} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.valuesTo.length > 0 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    )}

                    {step === 4 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 4: Select the Second Category
                            </Typography>
                            <Autocomplete
                                options={categories.filter((cat) => cat.id !== selected.category1?.id)}
                                getOptionLabel={(option) => option.value || ''}
                                value={selected.category2}
                                onChange={(e, value) => setSelected((prev) => ({ ...prev, category2: value }))}
                                inputValue={inputValue}
                                onInputChange={(e, value) => setInputValue(value)}
                                renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" />}
                            />
                            <Button variant="contained" sx={{ mt: 2, mr: 2}} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.category2 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    )}

                    {step === 5 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 5: Select a Specification for Second Category
                            </Typography>
                            <Autocomplete
                                options={specifications}
                                getOptionLabel={(option) => option.name || ''}
                                value={selected.specification2}
                                onChange={(e, value) => setSelected((prev) => ({ ...prev, specification2: value }))}
                                renderInput={(params) => <TextField {...params} label="Select Specification" variant="outlined" />}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <input
                                    type="checkbox"
                                    id="weirdNameCheckbox2"
                                    checked={showOnlySpecNames2}
                                    onChange={(e) => setShowOnlySpecNames2(e.target.checked)}
                                />
                                <label htmlFor="weirdNameCheckbox2" style={{ marginLeft: '8px' }}>
                                    Has weird name
                                </label>
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.specification2 && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    onClick={() => (showOnlySpecNames2 ? setStep(7) : handleNext())}
                                >
                                    {showOnlySpecNames2 ? 'Skip to Submit' : 'Next'}
                                </Button>
                            )}
                        </Box>
                    )}

                    {step === 6 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 6: Select Values for the Second Category
                            </Typography>
                            <Box className="list-box">
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Specification Values:
                                </Typography>
                                <List>
                                    {selected.valuesFromCategory2.map((value, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={selected.valuesToCategory2.includes(value)}
                                            onClick={() =>
                                                setSelected((prev) => ({
                                                    ...prev,
                                                    valuesToCategory2: prev.valuesToCategory2.includes(value)
                                                        ? prev.valuesToCategory2.filter((v) => v !== value)
                                                        : [...prev.valuesToCategory2, value],
                                                }))
                                            }
                                        >
                                            <ListItemText primary={value} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.valuesToCategory2.length > 0 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                        </Box>
                    )}

                    {step === 7 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Step 7: Review and Submit Rule
                            </Typography>
                            <Typography variant="body1">Selected Category 1: {selected.category1?.value}</Typography>
                            <Typography variant="body1">
                                Selected Specification 1: {selected.specification1?.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2}}>Selected Values for Category 1: {selected.valuesTo.join(', ')}</Typography>
                            <Typography variant="body1">Selected Category 2: {selected.category2?.value}</Typography>
                            <Typography variant="body1">
                                Selected Specification 2: {selected.specification2?.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2}}>Selected Values for Category 2: {selected.valuesToCategory2.join(', ')}</Typography>

                            <Button variant="contained" sx={{ mt: 2, mr: 2, }} onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                                Submit Rule
                            </Button>
                            {resultMessage && <Typography className="result-message" sx={{ mt: 2}}>{resultMessage}</Typography>}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default RulesPage;
