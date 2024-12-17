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
            valuesFrom: selected.valuesTo,
            isNameFrom: showOnlySpecNames1,
            categoryTo: selected.category2,
            nameTo: selected.specification2?.name,
            valuesTo: selected.valuesToCategory2,
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

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => {
        setStep((prev) => {
            if (prev === 4 && showOnlySpecNames1) return 2;
            if (prev === 6 && showOnlySpecNames2) return 4;
            return prev - 1;
        });
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
                                    onClick={() => setStep(4)}
                                >
                                    Change First Specification
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>First Specification Values:</strong> {selected.valuesFrom || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => setStep(4)}
                                >
                                    Change First Specification Values
                                </Button>
                            </Box>

                            {selected.specification1?.values && selected.specification1.values.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body1">
                                        <strong>First Specification Values:</strong> {selected.specification1.values.join(', ') || 'No values selected'}
                                    </Typography>
                                </Box>
                            )}

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>Second Category:</strong> {selected.category2?.value || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => setStep(3)}
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
                                    onClick={() => setStep(5)}
                                >
                                    Change Second Specification
                                </Button>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    <strong>First Specification Values:</strong> {selected.valuesTo || 'Not selected'}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() => setStep(4)}
                                >
                                    Change Second Specification Values
                                </Button>
                            </Box>

                            {selected.specification2?.values && selected.specification2.values.length > 0 && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body1">
                                        <strong>Second Specification Values:</strong> {selected.specification2.values.join(', ') || 'No values selected'}
                                    </Typography>
                                </Box>
                            )}

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
                                        onClick={() => setStep(6)}
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
                                value={selected.category1}
                                onChange={(e, value) => setSelected((prev) => ({ ...prev, category1: value }))}
                                inputValue={inputValue}
                                onInputChange={(e, value) => setInputValue(value)}
                                renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" />}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isUnitBasedRule}
                                        onChange={(e) => setIsUnitBasedRule(e.target.checked)}
                                    />
                                }
                                label="Is Unit Based Rule"
                                sx={{ mt: 2 }}
                            />
                            <br/>
                            {isUnitBasedRule && (
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        label="Unit"
                                        variant="outlined"
                                        fullWidth
                                        value={selected.unit}
                                        onChange={(e) => setSelected((prev) => ({ ...prev, unit: e.target.value }))}
                                    />
                                    <Autocomplete
                                        options={[]}
                                        getOptionLabel={(option) => option || ''}
                                        value={newAutocompleteValue}
                                        onChange={(e, value) => setNewAutocompleteValue(value)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Additional Input" variant="outlined" sx={{ mt: 2 }} />
                                        )}
                                    />
                                </Box>
                            )}
                            {selected.category1 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
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
                                    value={selected.specification1}
                                    onChange={(e, value) => setSelected((prev) => ({ ...prev, specification1: value }))}
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
                            <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {!showOnlySpecNames1 && selected.specification1 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                            {showOnlySpecNames1 && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    onClick={() => setStep(3)}
                                >
                                    Go to List of Names
                                </Button>
                            )}
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
                                    {(showOnlySpecNames1 ? specifications : selected.valuesFrom).map((item, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={selected.valuesTo.includes(item.name || item)}
                                            onClick={() =>
                                                setSelected((prev) => ({
                                                    ...prev,
                                                    valuesTo: prev.valuesTo.includes(item.name || item)
                                                        ? prev.valuesTo.filter((v) => v !== (item.name || item))
                                                        : [...prev.valuesTo, item.name || item],
                                                }))
                                            }
                                        >
                                            <ListItemText primary={item.name || item} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Box>
                            <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {selected.valuesTo.length > 0 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
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

                    {step === 6 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Select a Specification for Second Category
                            </Typography>
                            {!showOnlySpecNames2 ? (
                                <Autocomplete
                                    options={specifications}
                                    getOptionLabel={(option) => option.name || ''}
                                    value={selected.specification2}
                                    onChange={(e, value) => setSelected((prev) => ({ ...prev, specification2: value }))}
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
                            <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleBack}>
                                Back
                            </Button>
                            {!showOnlySpecNames2 && selected.specification2 && (
                                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleNext}>
                                    Next
                                </Button>
                            )}
                            {showOnlySpecNames2 && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    onClick={() => setStep(6)}
                                >
                                    Go to List of Names
                                </Button>
                            )}
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
                                    {(showOnlySpecNames2 ? specifications : selected.valuesFromCategory2).map((item, index) => (
                                        <ListItemButton
                                            key={index}
                                            selected={selected.valuesToCategory2.includes(item.name || item)}
                                            onClick={() =>
                                                setSelected((prev) => ({
                                                    ...prev,
                                                    valuesToCategory2: prev.valuesToCategory2.includes(item.name || item)
                                                        ? prev.valuesToCategory2.filter((v) => v !== (item.name || item))
                                                        : [...prev.valuesToCategory2, item.name || item],
                                                }))
                                            }
                                        >
                                            <ListItemText primary={item.name || item} />
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

                    {step === 8 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Review and Update Rule
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
                            {isUnitBasedRule && (
                                <Typography variant="body1">Unit: {selected.unit}</Typography>
                            )}
                            <Button
                                variant="contained"
                                sx={{ mt: 2, mr: 2 }}
                                onClick={handleBack}
                                disabled={isSubmitting}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size={24} /> : 'Update Rule'}
                            </Button>
                            {resultMessage && (
                                <Typography
                                    className="result-message"
                                    sx={{
                                        mt: 2,
                                        color: resultMessage.includes('successfully') ? 'green' : 'red'
                                    }}
                                >
                                    {resultMessage}
                                </Typography>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UpdateRulesPage;