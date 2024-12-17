import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Autocomplete,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    List,
    ListItemButton,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import { fetchCategories } from '/src/Apis/get-categories.service.js';
import { getSpecificationsFromCategory, getSpecificationsValuesFromCategory } from '../Apis/get-specifications-from-categories.service.js';
import { updateRule } from '../Apis/update-rule.service.js';
import { getRule } from '../Apis/get-rule.service.js';
import './UpdateRulesPage.css';

const UpdateRulesPage = ({ onUpdateComplete }) => {
    const { ruleId } = useParams();
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
        unit: '',
    });
    const [inputValue, setInputValue] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [showOnlySpecNames1, setShowOnlySpecNames1] = useState(false);
    const [showOnlySpecNames2, setShowOnlySpecNames2] = useState(false);
    const [isUnitBasedRule, setIsUnitBasedRule] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tempSelected, setTempSelected] = useState(selected);

    useEffect(() => {
        const loadRuleDetails = async () => {
            try {
                const ruleData = await getRule(ruleId);

                setSelected({
                    category1: { id: ruleData.rule.categoryFrom?.id, value: ruleData.rule.categoryFrom?.value },
                    category2: { id: ruleData.rule.categoryTo?.id, value: ruleData.rule.categoryTo?.value },
                    specification1: { name: ruleData.rule.nameFrom },
                    specification2: { name: ruleData.rule.nameTo },
                    valuesFrom: ruleData.rule.valuesFrom || [],
                    valuesTo: ruleData.rule.valuesTo || [],
                    valuesFromCategory2: ruleData.rule.valuesFromCategory2 || [],
                    valuesToCategory2: ruleData.rule.valuesToCategory2 || [],
                    unit: ruleData.rule.unit || '',
                });

                setIsUnitBasedRule(!!ruleData.rule.unit);

                setShowOnlySpecNames1(ruleData.rule.isNameFrom);
                setShowOnlySpecNames2(ruleData.rule.isNameTo);

                console.log(ruleData);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching rule details:', error);
                setResultMessage('Error loading rule details');
                setIsLoading(false);
            }
        };

        if (ruleId) {
            loadRuleDetails();
        }
    }, [ruleId]);

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

    const handleCheckboxChange1 = (e) => {
        setShowOnlySpecNames1(e.target.checked);
        if (e.target.checked) {
            setSelected((prev) => ({ ...prev, specification1: null }));
        }
    };

    const handleCheckboxChange2 = (e) => {
        setShowOnlySpecNames2(e.target.checked);
        if (e.target.checked) {
            setSelected((prev) => ({ ...prev, specification2: null }));
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const ruleData = {
            categoryFrom: selected.category1,
            nameFrom: selected.specification1?.name,
            valuesFrom: selected.valuesFrom,
            isNameFrom: showOnlySpecNames1,
            categoryTo: selected.category2,
            nameTo: selected.specification2?.name,
            valuesTo: selected.valuesTo,
            isNameTo: showOnlySpecNames2,
            unit: isUnitBasedRule ? selected.unit : null,
        };

        try {
            await updateRule(ruleId, ruleData);
            setResultMessage('Rule updated successfully!');
            onUpdateComplete && onUpdateComplete();
        } catch (error) {
            console.error('Error updating rule:', error.response ? error.response.data : error.message);
            setResultMessage('Error updating rule.');
        } finally {
            setIsSubmitting(false);
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
                setSelected((prev) => ({ ...prev, valuesTo: values }))
            );
        }
    }, [selected.specification2]);

    useEffect(() => {
        if (selected.specification1?.name && selected.category1?.id) {
            fetchSpecValues(selected.specification1.name, selected.category1.id).then((values) =>
                setSelected((prev) => ({
                    ...prev,
                    valuesFrom: values || []
                }))
            );
        }
    }, [selected.specification1, selected.category1]);

    useEffect(() => {
        if (selected.specification2?.name && selected.category2?.id) {
            fetchSpecValues(selected.specification2.name, selected.category2.id).then((values) =>
                setSelected((prev) => ({
                    ...prev,
                    valuesTo: values || []
                }))
            );
        }
    }, [selected.specification2, selected.category2]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="update-categories-container">
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
                        Update Rule
                    </Typography>

                    {step === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Rule Details
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>First Category:</strong> {selected.category1?.value || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => setStep(2)}
                                >
                                    Change First Category
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>First Specification:</strong> {selected.specification1?.name || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => {
                                        setTempSelected((prev) => ({
                                            ...prev,
                                            valuesFrom: [],
                                        }));
                                        setStep(3);
                                    }}
                                >
                                    Change First Specification
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>First Specification Values: </strong>
                                    {showOnlySpecNames1
                                        ? selected.specification1?.name || 'Not selected'
                                        : (Array.isArray(selected.valuesFrom) ? selected.valuesFrom.join(', ') : selected.valuesFrom) || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() =>
                                        setStep(4)
                                    }
                                >
                                    Change First Specification Values
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>Second Category:</strong> {selected.category2?.value || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => setStep(5)}
                                >
                                    Change Second Category
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>Second Specification:</strong> {selected.specification2?.name || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => {
                                        setTempSelected((prev) => ({
                                            ...prev,
                                            valuesTo: [],
                                        }));
                                        setStep(6);
                                    }}
                                >
                                    Change Second Specification
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>Second Specification Values: </strong>
                                    {Array.isArray(selected.valuesTo)
                                        ? selected.valuesTo.join(', ')
                                        : selected.valuesTo || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() =>
                                        setStep(7)
                                    }
                                >
                                    Change Second Specification Values
                                </Button>
                            </Box>

                            {isUnitBasedRule && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body1">
                                        <strong>Unit:</strong> {selected.unit || 'Not specified'}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ mt: 1 }}
                                        onClick={() => setStep(8)}
                                    >
                                        Change Unit
                                    </Button>
                                </Box>
                            )}

                            <Box>
                                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                                    Submit Changes
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {step === 2 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Select the First Category
                            </Typography>
                            <Autocomplete
                                options={categories}
                                getOptionLabel={(option) => option.value || ''}
                                value={tempSelected.category1}
                                onChange={(e, value) =>
                                    setTempSelected((prev) => ({ ...prev, category1: value }))
                                }
                                inputValue={inputValue}
                                onInputChange={(e, value) => setInputValue(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Category" variant="outlined" />
                                )}
                            />
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2 }}
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Back
                                </Button>
                                {selected.category1 && (
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mr: 2 }}
                                        onClick={() => {
                                            setSelected(tempSelected);
                                            setStep(3);
                                        }}
                                    >
                                        Update First Category
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}

                    {step === 3 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Select a Specification
                            </Typography>
                            {!showOnlySpecNames1 ? (
                                <Autocomplete
                                    options={specifications}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={tempSelected.specification1}
                                    onChange={(e, value) => {
                                        setTempSelected((prev) => ({ ...prev, specification1: value }));
                                        setSelected((prev) => ({
                                            ...prev,
                                            specification1: value,
                                            valuesFrom: [],
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Select Specification" variant="outlined" />}
                                />
                            ) : (
                                <Typography sx={{ mb: 2 }}>You have chosen to view all specification names in the next step.</Typography>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <input
                                    type="checkbox"
                                    id="weirdNameCheckbox1"
                                    checked={showOnlySpecNames1}
                                    onChange={handleCheckboxChange1}
                                />
                                <label htmlFor="weirdNameCheckbox1" style={{ marginLeft: '8px' }}>
                                    Has weird name
                                </label>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2 }}
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Back
                                </Button>
                                {selected.category1 && (
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mr: 2 }}
                                        onClick={() => {
                                            setSelected((prev) => ({
                                                ...prev,
                                                specification1: tempSelected.specification1,
                                                category1: { ...prev.category1, value: selected.category1.value }
                                            }));
                                            setStep(4);
                                        }}
                                    >
                                        Update First Specification
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}


                    {step === 4 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {showOnlySpecNames1 ? 'Select Specifications' : 'Select Values for the First Category'}
                            </Typography>
                            <Box className="list-box">
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {showOnlySpecNames1 ? 'Specification Names:' : 'Specification Values:'}
                                </Typography>
                                <List>
                                    {(showOnlySpecNames1 ? specifications : selected.valuesFrom || []).map((item, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={tempSelected.valuesFrom.includes(item.name || item)}
                                            onClick={() => {
                                                const value = item.name || item;
                                                const updatedValuesFrom = tempSelected.valuesFrom.includes(value)
                                                    ? tempSelected.valuesFrom.filter((v) => v !== value)
                                                    : [...tempSelected.valuesFrom, value];
                                                setTempSelected((prev) => ({
                                                    ...prev,
                                                    valuesFrom: updatedValuesFrom,
                                                }));
                                            }}
                                        >
                                            <ListItemText primary={item.name || item} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2 }}
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Back
                                </Button>
                                {selected.category1 && tempSelected.valuesFrom.length > 0 && (
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mr: 2 }}
                                        onClick={() => {
                                            setSelected((prev) => ({
                                                ...prev,
                                                valuesFrom: tempSelected.valuesFrom,
                                            }));
                                            setStep(1);
                                        }}
                                    >
                                        Update First Specification Values
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}

                    {step === 5 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Select the Second Category
                            </Typography>
                            <Autocomplete
                                options={categories.filter((cat) => cat.id !== selected.category1?.id)}
                                getOptionLabel={(option) => option.value || ''}
                                value={tempSelected.category2}
                                onChange={(e, value) =>
                                    setTempSelected((prev) => ({ ...prev, category2: value }))
                                }
                                inputValue={inputValue}
                                onInputChange={(e, value) => setInputValue(value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Select Category" variant="outlined" />
                                )}
                            />
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2 }}
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Back
                                </Button>
                                {selected.category2 && (
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mr: 2 }}
                                        onClick={() => {
                                            setSelected(tempSelected);
                                            setStep(6);
                                        }}
                                    >
                                        Update Second Category
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}

                    {step === 6 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Select a Specification for Second Category
                            </Typography>
                            {!showOnlySpecNames2 ? (
                                <Autocomplete
                                    options={specifications}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={tempSelected.specification2}
                                    onChange={(e, value) => {
                                        setTempSelected((prev) => ({ ...prev, specification2: value }));
                                        setSelected((prev) => ({
                                            ...prev,
                                            specification2: value,
                                            valuesTo: [],
                                        }));
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Select Specification" variant="outlined" />}
                                />
                            ) : (
                                <Typography sx={{ mb: 2 }}>You have chosen to view all specification names in the next step.</Typography>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <input
                                    type="checkbox"
                                    id="weirdNameCheckbox2"
                                    checked={showOnlySpecNames2}
                                    onChange={handleCheckboxChange2}
                                />
                                <label htmlFor="weirdNameCheckbox2" style={{ marginLeft: '8px' }}>
                                    Has weird name
                                </label>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2 }}
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Back
                                </Button>
                                {selected.category2 && (
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mr: 2 }}
                                        onClick={() => {
                                            setSelected((prev) => ({
                                                ...prev,
                                                specification2: tempSelected.specification2,
                                                valuesTo: [],
                                                category2: { ...prev.category2, value: selected.category2.value }
                                            }));
                                            setStep(7);
                                        }}
                                    >
                                        Update Second Specification
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}

                    {step === 7 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                {showOnlySpecNames2 ? 'Select Specifications' : 'Select Values for the Second Category'}
                            </Typography>
                            <Box className="list-box">
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {showOnlySpecNames2 ? 'Specification Names:' : 'Specification Values:'}
                                </Typography>
                                <List>
                                    {(showOnlySpecNames2 ? specifications : selected.valuesTo || []).map((item, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={tempSelected.valuesTo.includes(item.name || item)}
                                            onClick={() => {
                                                const value = item.name || item;
                                                const updatedValuesTo = tempSelected.valuesTo.includes(value)
                                                    ? tempSelected.valuesTo.filter((v) => v !== value)
                                                    : [...tempSelected.valuesTo, value];
                                                setTempSelected((prev) => ({
                                                    ...prev,
                                                    valuesTo: updatedValuesTo,
                                                }));
                                            }}
                                        >
                                            <ListItemText primary={item.name || item} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{ mt: 2, mr: 2 }}
                                    onClick={() => {
                                        setStep(1);
                                    }}
                                >
                                    Back
                                </Button>
                                {selected.category2 && tempSelected.valuesTo.length > 0 && (
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, mr: 2 }}
                                        onClick={() => {
                                            setSelected((prev) => ({
                                                ...prev,
                                                valuesTo: tempSelected.valuesTo,
                                            }));
                                            setStep(1);
                                        }}
                                    >
                                        Update Second Specification Values
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateRulesPage;