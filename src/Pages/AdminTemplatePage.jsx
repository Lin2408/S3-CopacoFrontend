import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Divider, Chip, Autocomplete } from '@mui/material';
import { fetchCategories } from '/src/Apis/get-item-categories.service.js';
import { createTemplate } from '/src/Apis/create-template.service.js';
import './AdminTemplatePage.css';

const AdminTemplatePage = () => {
    const [name, setTemplateName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await fetchCategories();
                console.log(data)
                setCategoryOptions(data.data.categories);
                console.log(categoryOptions)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchItems();
    }, []);

    const handleCategoryChange = (event, newValue) => {
        if (newValue && !selectedCategories.some(category => category.id === newValue.id)) {
            setSelectedCategories((prev) => [...prev, newValue]);
            setInputValue('');
        }
    };

    const handleDelete = (categoryToDelete) => {
        setSelectedCategories((prev) => prev.filter(category => category !== categoryToDelete));
    };

    const handleSubmit = async () => {
        const newTemplate = {
            name,
            categories: selectedCategories.map(category => category.id)
        };
        try {
            await createTemplate(newTemplate);
            setStatusMessage("Template saved successfully!");
        } catch (error) {
            setStatusMessage("Failed to save the template. Please try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '40px auto', p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Create New Template</Typography>

            <TextField
                label="Template Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setTemplateName(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>Select Categories</Typography>
            <Autocomplete
                options={categoryOptions.filter(option =>
                    !selectedCategories.some(selected => selected.id === option.id)
                )}
                getOptionLabel={(option) => option.value}
                onChange={handleCategoryChange}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                value={null}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Search Categories" placeholder="Search Categories" />
                )}
                sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedCategories.map((category) => (
                    <Chip
                        key={category.id}
                        label={category.value}
                        color="primary"
                        onDelete={() => handleDelete(category)}
                    />
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleSubmit}
            >
                Create Template
            </Button>

            {statusMessage && (
                <Typography variant="body2" sx={{ mt: 2, color: statusMessage.includes('successfully') ? 'green' : 'red' }}>
                    {statusMessage}
                </Typography>
            )}
        </Box>
    );
};

export default AdminTemplatePage;
